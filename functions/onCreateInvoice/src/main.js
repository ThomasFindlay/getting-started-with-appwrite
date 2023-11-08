import {
  Client,
  Storage,
  InputFile,
  ID,
  Permission,
  Role,
} from 'node-appwrite';
import { createInvoice } from './helpers/createInvoicePdf.js';
import { Buffer } from 'node:buffer';

const BUCKET_ID = '654a047fa34df2c72f66';
const APPWRITE_SERVER_STORAGE_KEY =
  '7fd52e25abb4cc96548c697367c54244b61b06ea741a1fc8393362606770a9de81d4aba6f110790093a565bb41c2ebe3ac4da8f4a1112c9f0fe17726138702244e41ca6c164f4b631cdba7b21cae3f49f6b3d446882a65810861bfa2413615157f0b128ecc101fa2af5932fb3843e7dc498f03064c42c4f3dccc34c6c8835126';

const onCreateInvoice = async ({ req, res, log, error, storage }) => {
  const { $id } = req.body;
  const { pdfBytes } = await createInvoice(req.body);
  const buffer = Buffer.from(pdfBytes);
  const userId = req.headers['x-appwrite-user-id'];
  const fileId = `INVOICE_${$id}`;
  const filename = `${fileId}.pdf`;
  const ownerRole = Role.user(userId);
  await storage.createFile(
    BUCKET_ID,
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
const onUpdateInvoice = async ({ req, res, log, error, storage }) => {
  const { $id } = req.body;
  const { pdfBytes } = await createInvoice(req.body);
  const buffer = Buffer.from(pdfBytes);
  const fileId = `INVOICE_${$id}`;
  const filename = `${fileId}.pdf`;
  const userId = req.headers['x-appwrite-user-id'];
  const ownerRole = Role.user(userId);

  try {
    await storage.deleteFile(BUCKET_ID, fileId);
  } catch (err) {
    error(err);
    error(`Could not delete invoice file with ID ${fileId} `);
  }
  await storage.createFile(
    BUCKET_ID,
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

const onDeleteInvoice = async ({ req, res, log, error, storage }) => {
  const { $id } = req.body;
  const fileId = `INVOICE_${$id}`;

  try {
    await storage.deleteFile(BUCKET_ID, fileId);
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

// This is your Appwrite function
// It's executed each time we get a request
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
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6548caed43d0fdcae3ee')
    .setKey(APPWRITE_SERVER_STORAGE_KEY);
  const storage = new Storage(client);

  log(req.bodyRaw); // Raw request body, contains request data
  log(JSON.stringify(req.body)); // Object from parsed JSON request body, otherwise string
  log(JSON.stringify(req.headers)); // String key-value pairs of

  return handler({ req, res, log, error, client, storage });
};
