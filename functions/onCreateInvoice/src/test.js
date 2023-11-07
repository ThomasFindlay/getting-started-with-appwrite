import handler from './main.js';

const data = {
  $id: '12312321312',
  invoiceId: '0001',
  date: '2023-11-12T00:00:00.000+00:00',
  dueDate: '2023-12-10T00:00:00.000+00:00',
  amount: '£2400',
  description: 'Web Development Services',
  senderName: 'Thomas Findlay',
  senderAddress: '18 Shirley Street',
  senderPostcode: 'LE1 6JD',
  senderCity: 'Leicester',
  senderCountry: 'United Kingdom',
  senderEmail: 'thomasfindlay94@gmail.com',
  senderPhone: '07685768565',
  clientName: 'Client Company',
  clientAddress: '3 Broadclyst Street',
  clientPostcode: 'BE5 D95',
  clientCity: 'Bristol',
  clientCountry: 'United Kingdom',
  clientEmail: 'company@gmail.com',
  clientPhone: '5435435435',
  accountName: 'My Account Name',
  accountSortCode: '44-44-44',
  accountNumber: '321312321',
  accountAddress: '23 My Address',
  accountPostCode: 'LE3 0BD',
  accountCity: 'Norwich',
  accountCountry: 'United Kingdom',
  accountIban: '42342342343243',
  paymentReceived: true,
  paymentDate: '2023-11-12T00:00:00.000+00:00',
};

await handler({
  log: console.log,
  error: console.error,
  req: {
    body: data,
    method: 'POST',
  },
  res: {
    status(status) {
      return {
        send(message) {
          console.log(message);
        },
      };
    },
    json(message) {
      console.log(message);
    },
  },
});
