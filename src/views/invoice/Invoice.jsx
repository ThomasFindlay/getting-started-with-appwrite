import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import { useEffect, useRef, useState } from "react";
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoiceFileUrl,
  listInvoices,
  updateInvoice,
} from "../../api/invoice.api";
import { useUserContext } from "../../context/user.context";
import BankDetails from "./components/BankDetails";
import ClientDetails from "./components/ClientDetails";
import SenderDetails from "./components/SenderDetails";
import InvoiceDetails from "./components/InvoiceDetails";
import toast from "react-hot-toast";
import { formatDate } from "../../helpers/formatDate";

const config = {
  create: {
    submitButtonText: "Create",
  },
  update: {
    submitButtonText: "Update",
  },
};

const Invoice = props => {
  const { user } = useUserContext();
  const [form, setForm] = useState({
    // invoiceId: "0001",
    // date: "2023-11-12",
    // dueDate: "2023-12-10",
    // amount: "£2400",
    // description: "Web Development Services",
    // senderName: "Thomas",
    // senderAddress: "",
    // senderPostcode: "",
    // senderCity: "",
    // senderCountry: "",
    // senderEmail: "",
    // senderPhone: "",
    // clientName: "Client Company",
    // clientAddress: "",
    // clientPostcode: "",
    // clientCity: "",
    // clientCountry: "",
    // clientEmail: "",
    // clientPhone: "",
    // accountName: "My Account Name",
    // accountSortCode: "44-44-44",
    // accountNumber: "321312321",
    // accountAddress: "23 My Address",
    // accountIban: "",
    // paymentReceived: false,
    // paymentDate: "",
    invoiceId: "0001",
    date: "2023-11-12",
    dueDate: "2023-12-10",
    amount: "£2400",
    description: "Web Development Services",
    senderName: "Thomas Findlay",
    senderAddress: "18 Shirley Street",
    senderPostcode: "LE1 6JD",
    senderCity: "Leicester",
    senderCountry: "United Kingdom",
    senderEmail: "thomasfindlay94@gmail.com",
    senderPhone: "07685768565",
    clientName: "Client Company",
    clientAddress: "3 Broadclyst Street",
    clientPostcode: "BE5 D95",
    clientCity: "Bristol",
    clientCountry: "United Kingdom",
    clientEmail: "company@gmail.com",
    clientPhone: "5435435435",
    accountName: "My Account Name",
    accountNumber: "321312321",
    accountSortCode: "44-44-44",
    accountAddress: "23 My Address",
    accountPostCode: "LE3 0BD",
    accountCity: "Norwich",
    accountCountry: "United Kingdom",
    accountIban: "42342342343243",
    paymentReceived: false,
    paymentDate: "",
  });
  const [fetchInvoiceStatus, setFetchInvoiceStatus] = useState("IDLE");
  const [submitInvoiceStatus, setSubmitInvoiceStatus] = useState("IDLE");
  const [deleteInvoiceStatus, setDeleteInvoiceStatus] = useState("IDLE");

  const params = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(params.id);

  const { submitButtonText } = isEditMode ? config.update : config.create;

  const onFormChange = key => value => {
    setForm(state => ({
      ...state,
      [key]: value,
    }));
  };

  const onSubmitInvoice = async event => {
    event.preventDefault();
    try {
      if (submitInvoiceStatus === "PENDING") {
        return;
      }
      setSubmitInvoiceStatus("PENDING");
      const payload = {};

      for (const [key, value] of Object.entries(form)) {
        if (value !== "") {
          payload[key] = value;
        }
      }

      if (isEditMode) {
        await updateInvoice(form.$id, payload);
        toast.success("Invoice updated");
      } else {
        await createInvoice(user.$id, payload);
        toast.success("Invoice created");
      }
      setSubmitInvoiceStatus("SUCCESS");
      navigate("/");
    } catch (error) {
      console.error(error);
      setSubmitInvoiceStatus("ERROR");
    }
  };

  const initFetchInvoice = async invoiceUid => {
    try {
      if (fetchInvoiceStatus === "PENDING") {
        return;
      }

      setFetchInvoiceStatus("PENDING");

      const invoice = await getInvoice(invoiceUid);

      setForm(currentForm => {
        const newForm = {
          $id: invoice.$id,
        };
        for (const key of Object.keys(currentForm)) {
          const value = invoice[key];

          /**
           * Format the dates
           */
          if (["date", "dueDate", "paymentReceived"].includes(key) && value) {
            newForm[key] = value
              ? formatDate(new Date(value)).split("/").toReversed().join("-")
              : "";
          } else {
            newForm[key] = value === null ? "" : value;
          }
        }

        return newForm;
      });
      setFetchInvoiceStatus("SUCCESS");
    } catch (error) {
      console.error(error);
      toast.error("There was a problem while fetching the invoice.");
      setFetchInvoiceStatus("ERROR");
    }
  };

  const initDeletePrompt = async () => {
    if (deleteInvoiceStatus === "PENDING") {
      return;
    }
    const result = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!result) {
      return;
    }

    try {
      setDeleteInvoiceStatus("PENDING");
      await deleteInvoice(form.$id);
      setDeleteInvoiceStatus("SUCCESS");
      toast.success("Invoice deleted");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete the invoice");
      setDeleteInvoiceStatus("ERROR");
    }
  };

  const onDownloadInvoice = async () => {
    const result = await getInvoiceFileUrl(`INVOICE_${form.$id}`);
    console.log("result", result);
    window.open(result.href);
  };

  console.log("form", form);
  useEffect(() => {
    if (!params.id) {
      setFetchInvoiceStatus("SUCCESS");
      return;
    }
    /**
     * We are on the edit invoice page.
     * Therefore, we need to fetch invoide details
     */
    initFetchInvoice(params.id);
  }, [params.id]);

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
                    Download Invoice
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
