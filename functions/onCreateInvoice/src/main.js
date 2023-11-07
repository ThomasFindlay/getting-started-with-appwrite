import { Client, Storage, InputFile, ID } from 'node-appwrite';
import { createInvoice } from './helpers/createInvoicePdf.js';
import { Buffer } from 'node:buffer';

const BUCKET_ID = '654a047fa34df2c72f66';
const APPWRITE_SERVER_STORAGE_KEY =
  '7fd52e25abb4cc96548c697367c54244b61b06ea741a1fc8393362606770a9de81d4aba6f110790093a565bb41c2ebe3ac4da8f4a1112c9f0fe17726138702244e41ca6c164f4b631cdba7b21cae3f49f6b3d446882a65810861bfa2413615157f0b128ecc101fa2af5932fb3843e7dc498f03064c42c4f3dccc34c6c8835126';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6548caed43d0fdcae3ee')
    .setKey(APPWRITE_SERVER_STORAGE_KEY);
  const storage = new Storage(client);
  const $id = req.body.$id;
  if (req.method !== 'POST') {
    return res.status(403).send('Method not allowed');
  }

  if (!req.body.invoiceId) {
    return res.status(403).send('Missing invoice ID');
  }

  log(req.bodyRaw); // Raw request body, contains request data
  log(JSON.stringify(req.body)); // Object from parsed JSON request body, otherwise string
  log(JSON.stringify(req.headers)); // String key-value pairs of all request headers, keys are lowercase
  log(req.scheme); // Value of the x-forwarded-proto header, usually http or https
  log(req.method); // Request method, such as GET, POST, PUT, DELETE, PATCH, etc.
  log(req.url); // Full URL, for example: http://awesome.appwrite.io:8000/v1/hooks?limit=12&offset=50
  log(req.host); // Hostname from the host header, such as awesome.appwrite.io
  log(req.port); // Port from the host header, for example 8000
  log(req.path); // Path part of URL, for example /v1/hooks
  log(req.queryString); // Raw query params string. For example "limit=12&offset=50"
  log(JSON.stringify(req.query)); // Parsed query params. For example, req.query.limit

  const { pdfBytes } = await createInvoice(req.body);
  const buffer = Buffer.from(pdfBytes);

  // Why not try the Appwrite SDK?
  //
  // const client = new Client()
  //   .setEndpoint('https://cloud.appwrite.io/v1')
  //   .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  //   .setKey(process.env.APPWRITE_API_KEY);

  // You can log messages to the console
  // log('Hello, Logs!');
  // log('body', JSON.stringify(req.body, null, 2));
  // log(req.variables['APPWRITE_FUNCTION_EVENT_DATA'])
  // log(req.variables)
  // If something goes wrong, log an error

  error('Hello, Errors!');
  const fileId = `INVOICE_${$id}`;
  await storage.createFile(
    BUCKET_ID,
    fileId,
    InputFile.fromBuffer(buffer, fileId)
  );

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    message: 'Invoice created',
  });
};
