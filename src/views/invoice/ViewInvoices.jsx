import { useEffect, useState } from "react";
import { listInvoices } from "../../api/invoice.api";
import { Link } from "react-router-dom";
import { formatDate } from "../../helpers/formatDate";

const ViewInvoices = props => {
  const [invoices, setInvoices] = useState([]);

  const initFetchInvoices = async () => {
    try {
      // const result = [
      //   {
      //     $id: 1,
      //     invoiceId: "0001",
      //     date: "2023-11-12",
      //     dueDate: "2023-12-10",
      //     amount: "£2400",
      //     description: "Web Development Services",
      //     senderName: "Thomas",
      //     senderAddress: "Findlay",
      //     senderPostcode: "",
      //     senderCity: "",
      //     senderCountry: "",
      //     senderEmail: "",
      //     senderPhone: "",
      //     clientName: "Client Company",
      //     clientAddress: "",
      //     clientPostcode: "",
      //     clientCity: "",
      //     clientCountry: "",
      //     clientEmail: "",
      //     clientPhone: "",
      //     accountName: "My Account Name",
      //     accountSortCode: "44-44-44",
      //     accountNumber: "321312321",
      //     accountAddress: "23 My Address",
      //     accountIban: "",
      //   },
      //   {
      //     $id: 2,
      //     invoiceId: "0002",
      //     date: "2023-11-12",
      //     dueDate: "2023-12-10",
      //     amount: "£2400",
      //     description: "Web Development Services",
      //     senderName: "Thomas",
      //     senderAddress: "Findlay",
      //     senderPostcode: "",
      //     senderCity: "",
      //     senderCountry: "",
      //     senderEmail: "",
      //     senderPhone: "",
      //     clientName: "Client Company",
      //     clientAddress: "",
      //     clientPostcode: "",
      //     clientCity: "",
      //     clientCountry: "",
      //     clientEmail: "",
      //     clientPhone: "",
      //     accountName: "My Account Name",
      //     accountSortCode: "44-44-44",
      //     accountNumber: "321312321",
      //     accountAddress: "23 My Address",
      //     accountIban: "",
      //   },
      //   {
      //     $id: 3,
      //     invoiceId: "0003",
      //     date: "2023-11-12",
      //     dueDate: "2023-12-10",
      //     amount: "£2400",
      //     description: "Web Development Services",
      //     senderName: "Thomas",
      //     senderAddress: "Findlay",
      //     senderPostcode: "",
      //     senderCity: "",
      //     senderCountry: "",
      //     senderEmail: "",
      //     senderPhone: "",
      //     clientName: "Client Company",
      //     clientAddress: "",
      //     clientPostcode: "",
      //     clientCity: "",
      //     clientCountry: "",
      //     clientEmail: "",
      //     clientPhone: "",
      //     accountName: "My Account Name",
      //     accountSortCode: "44-44-44",
      //     accountNumber: "321312321",
      //     accountAddress: "23 My Address",
      //     accountIban: "",
      //   },
      // ];
      const result = await listInvoices();
      console.log(result);
      const formattedInvoices = result.documents.map(invoice => {
        const { date, dueDate, ...invoiceData } = invoice;
        return {
          ...invoiceData,
          date: formatDate(new Date(date)),
          dueDate: formatDate(new Date(dueDate)),
        };
      });
      setInvoices(formattedInvoices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initFetchInvoices();
  }, []);

  return (
    <div className="flex items-center justify-center w-full min-h-screen text-indigo-900 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="p-4 bg-white rounded-lg lg:p-8">
        <div className="flex items-center justify-between gap-4 mb-8 ">
          <h1 className="text-2xl font-semibold">Invoices</h1>

          <Link
            to="/invoice/create"
            className="px-4 py-2 transition-colors duration-150 bg-indigo-50 hover:bg-indigo-600 hover:text-indigo-100"
          >
            Create Invoice
          </Link>
        </div>

        {invoices.length ? (
          <div>
            <div className="items-start hidden lg:flex gap-x-8 lg:gap-x-16">
              <span className="w-16 font-semibold text-indigo-600">ID</span>
              <span className="w-32 font-semibold text-indigo-600">Client</span>
              <span className="w-16 font-semibold text-indigo-600">Amount</span>
              <span className="w-24 font-semibold text-indigo-600">Date</span>
              <span className="w-24 font-semibold text-indigo-600">
                Due Date
              </span>
              <span className="font-semibold text-indigo-600 w-36">
                Payment Received
              </span>
            </div>
            <ul className="mt-2">
              {invoices.map(invoice => {
                const {
                  $id,
                  invoiceId,
                  amount,
                  clientName,
                  date,
                  dueDate,
                  paymentReceived,
                } = invoice;
                return (
                  <li
                    key={$id}
                    className="px-4 py-2 lg:p-0 max-lg:my-4 max-lg:bg-indigo-50/50"
                  >
                    <Link
                      to={`/invoice/${$id}`}
                      className="p-2 -mx-2 rounded-md grid grid-cols-2 gap-y-4 lg:gap-y-0  lg:flex lg:flex-nowrap gap-x-8 lg:gap-x-16 lg:hover:bg-indigo-50 min-w-[15rem] sm:min-w-[20rem]"
                    >
                      <div className="flex flex-col lg:w-16">
                        <span className="text-sm text-indigo-600 lg:hidden">
                          ID
                        </span>
                        <span>{invoiceId}</span>
                      </div>
                      <div className="flex flex-col lg:w-32">
                        <span className="text-sm text-indigo-600 lg:hidden">
                          Client
                        </span>
                        <span>{clientName}</span>
                      </div>
                      <div className="flex flex-col lg:w-16">
                        <span className="text-sm text-indigo-600 lg:hidden">
                          Amount
                        </span>
                        <span>{amount}</span>
                      </div>
                      <div className="flex flex-col lg:w-24">
                        <span className="text-sm text-indigo-600 lg:hidden">
                          Date
                        </span>
                        <span>{date}</span>
                      </div>
                      <div className="flex flex-col lg:w-24">
                        <span className="text-sm text-indigo-600 lg:hidden">
                          Due Date
                        </span>
                        <span>{dueDate}</span>
                      </div>
                      <div className="flex flex-col lg:w-36">
                        <span className="text-sm text-indigo-600 lg:hidden">
                          Payment Received
                        </span>
                        <span>{paymentReceived ? "Yes" : "No"}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <Link to="/invoice/create" className="font-semibold text-indigo-600">
            You have no invoices. Let's create one!
          </Link>
        )}
      </div>
    </div>
  );
};

export default ViewInvoices;
