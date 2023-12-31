import { Link } from "react-router-dom";
import { useFetchInvoicesList } from "./hooks/useFetchInvoicesList";

const ViewInvoices = () => {
  const { invoices, fetchInvoicesStatus } = useFetchInvoicesList();

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

        {fetchInvoicesStatus === "SUCCESS" ? (
          invoices.length ? (
            <div>
              <div className="items-start hidden lg:flex gap-x-8 lg:gap-x-16">
                <span className="w-16 font-semibold text-indigo-600">ID</span>
                <span className="w-32 font-semibold text-indigo-600">
                  Client
                </span>
                <span className="w-16 font-semibold text-indigo-600">
                  Amount
                </span>
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
            <Link
              to="/invoice/create"
              className="font-semibold text-indigo-600"
            >
              You have no invoices. Let&apos;s create one!
            </Link>
          )
        ) : (
          <p>Loading invoices...</p>
        )}
      </div>
    </div>
  );
};

export default ViewInvoices;
