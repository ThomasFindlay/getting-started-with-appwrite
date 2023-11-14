/* global process */
import { Client, Storage, InputFile, Permission, Role } from 'node-appwrite';
import { createInvoicePdf } from './helpers/createInvoicePdf.js';
import { Buffer } from 'node:buffer';

const APPWRITE_BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
const APPWRITE_SERVER_API_KEY = process.env.APPWRITE_SERVER_API_KEY;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_SERVER_ENDPOINT = process.env.APPWRITE_SERVER_ENDPOINT;

const onCreateInvoice = async ({ req, res, storage }) => {
  const { $id } = req.body;
  const { pdfBytes } = await createInvoicePdf(req.body);
  const buffer = Buffer.from(pdfBytes);
  const userId = req.headers['x-appwrite-user-id'];
  const fileId = `INVOICE_${$id}`;
  const filename = `${fileId}.pdf`;
  const ownerRole = Role.user(userId);
  await storage.createFile(
    APPWRITE_BUCKET_ID,
    fileId,
    InputFile.fromBuffer(buffer, filename),
    [
      Permission.read(ownerRole),
      Permission.update(ownerRole),
      Permission.delete(ownerRole),
    ]
  );

  return res.json({
    message: 'Invoice created',
  });
};

const onUpdateInvoice = async ({ log, req, res, storage }) => {
  const { $id } = req.body;
  const { pdfBytes } = await createInvoicePdf(req.body);
  const buffer = Buffer.from(pdfBytes);
  const fileId = `INVOICE_${$id}`;
  const filename = `${fileId}.pdf`;
  const userId = req.headers['x-appwrite-user-id'];
  const ownerRole = Role.user(userId);

  try {
    await storage.deleteFile(APPWRITE_BUCKET_ID, fileId);
  } catch (err) {
    log(err);
    log(`Could not delete invoice file with ID ${fileId} `);
  }

  await storage.createFile(
    APPWRITE_BUCKET_ID,
    fileId,
    InputFile.fromBuffer(buffer, filename),
    [
      Permission.read(ownerRole),
      Permission.update(ownerRole),
      Permission.delete(ownerRole),
    ]
  );
  return res.json({
    message: 'Invoice updated',
  });
};

const onDeleteInvoice = async ({ req, res, error, storage }) => {
  const { $id } = req.body;
  const fileId = `INVOICE_${$id}`;

  try {
    await storage.deleteFile(APPWRITE_BUCKET_ID, fileId);
  } catch (err) {
    error(error);
  }
  return res.json({
    message: 'Deleted',
  });
};

const eventHandlers = {
  create: onCreateInvoice,
  update: onUpdateInvoice,
  delete: onDeleteInvoice,
};

export default async ({ req, res, log, error }) => {
  if (req.method !== 'POST') {
    return res.send('Method not allowed', 403);
  }

  if (!req.body.invoiceId) {
    return res.send('Missing invoice ID', 403);
  }

  if (req.headers['x-appwrite-trigger'] !== 'event') {
    return res.send('Execution method not allowed.', 403);
  }

  const eventType = req.headers['x-appwrite-event'].split('.').at(-1);

  if (!Object.hasOwn(eventHandlers, eventType)) {
    return res.send('Event not supported', 403);
  }

  const handler = eventHandlers[eventType];

  const client = new Client()
    .setEndpoint(APPWRITE_SERVER_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_SERVER_API_KEY);
  const storage = new Storage(client);

  return handler({ req, res, log, error, client, storage });
};
