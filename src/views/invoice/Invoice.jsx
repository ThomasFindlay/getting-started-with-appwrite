import { Link, useParams } from "react-router-dom";
import BankDetails from "./components/BankDetails";
import ClientDetails from "./components/ClientDetails";
import InvoiceDetails from "./components/InvoiceDetails";
import SenderDetails from "./components/SenderDetails";
import { useDeleteInvoice } from "./hooks/useDeleteInvoice";
import { useDownloadInvoice } from "./hooks/useDownloadInvoice";
import { useFetchInvoice } from "./hooks/useFetchInvoice";
import { useInvoiceForm } from "./hooks/useInvoiceForm";
import { useSubmitInvoice } from "./hooks/useSubmitInvoice";

const config = {
  create: {
    submitButtonText: "Create",
  },
  update: {
    submitButtonText: "Update",
  },
};

const Invoice = () => {
  const params = useParams();
  const { isEditMode, form, setForm, onFormChange } = useInvoiceForm();
  const { fetchInvoiceStatus, initFetchInvoice } = useFetchInvoice({
    onSetInvoice: setForm,
  });
  const { submitInvoiceStatus, onSubmitInvoice } = useSubmitInvoice({
    form,
    isEditMode,
  });
  const { deleteInvoiceStatus, initDeletePrompt } = useDeleteInvoice({
    invoiceId: form.$id,
  });

  const { downloadInvoiceStatus, onDownloadInvoice } = useDownloadInvoice({
    invoiceId: form.$id,
  });

  const { submitButtonText } = isEditMode ? config.update : config.create;

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="min-h-screen px-8 pb-16 bg-white md:w-3/4 md:ml-auto md:pr-0 md:pl-16 md:pb-24">
        <div className="flex items-center justify-between mr-8">
          <h1 className="my-8 text-2xl font-semibold text-indigo-900">
            Invoice
          </h1>
          <Link
            className="text-sm transition-all duration-150 text-indigo-900/50 hover:text-indigo-900"
            to="/"
          >
            Back To Invoices
          </Link>
        </div>
        {fetchInvoiceStatus === "PENDING" ? (
          <div>Fetching invoice data...</div>
        ) : null}
        {fetchInvoiceStatus === "ERROR" ? (
          <div>
            <button
              className="px-4 py-2 bg-indigo-600 rounded-md text-indigo-50"
              onClick={() => initFetchInvoice(params.id)}
            >
              Try Again
            </button>
          </div>
        ) : null}
        {fetchInvoiceStatus === "SUCCESS" ? (
          <form
            className="flex flex-col max-w-5xl gap-8"
            onSubmit={onSubmitInvoice}
          >
            <div className="flex flex-col gap-8 md:gap-12">
              <InvoiceDetails form={form} onFormChange={onFormChange} />
              <SenderDetails form={form} onFormChange={onFormChange} />
              <ClientDetails form={form} onFormChange={onFormChange} />
              <BankDetails form={form} onFormChange={onFormChange} />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="min-w-[6rem] px-4 py-3 mr-4 font-semibold text-indigo-800 transition-colors duration-150 bg-indigo-200/25 rounded-md hover:bg-rose-800 hover:text-rose-100"
                onClick={initDeletePrompt}
              >
                {deleteInvoiceStatus === "PENDING" ? "Deleting..." : "Delete"}
              </button>
              <div>
                {form.$id ? (
                  <button
                    type="button"
                    className="min-w-[6rem] px-4 py-3 mr-4 font-semibold text-indigo-900 transition-colors duration-150 bg-indigo-200/50 rounded-md hover:bg-indigo-800 hover:text-indigo-100"
                    onClick={onDownloadInvoice}
                  >
                    {downloadInvoiceStatus === "PENDING"
                      ? "Downloading..."
                      : "Download Invoice"}
                  </button>
                ) : null}
                <button
                  type="submit"
                  className="min-w-[6rem] px-4 py-3 mr-8 font-semibold text-indigo-100 transition-colors duration-150 bg-indigo-600 rounded-md hover:bg-indigo-800"
                >
                  {submitInvoiceStatus === "PENDING"
                    ? "Submitting..."
                    : submitButtonText}
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default Invoice;
