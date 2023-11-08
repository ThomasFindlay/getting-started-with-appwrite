import { useEffect, useState } from "react";
import { listInvoices } from "../../../api/invoice.api";
import { formatDate } from "../../../helpers/formatDate";

export const useFetchInvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [fetchInvoicesStatus, setFetchInvoiceStatus] = useState("IDLE");

  const initFetchInvoices = async () => {
    try {
      setFetchInvoiceStatus("PENDING");

      const result = await listInvoices();
      const formattedInvoices = result.documents.map(invoice => {
        const { date, dueDate, ...invoiceData } = invoice;
        return {
          ...invoiceData,
          date: formatDate(new Date(date)),
          dueDate: formatDate(new Date(dueDate)),
        };
      });

      setInvoices(formattedInvoices);
      setFetchInvoiceStatus("SUCCESS");
    } catch (error) {
      console.error(error);
      setFetchInvoiceStatus("ERROR");
    }
  };

  useEffect(() => {
    initFetchInvoices();
  }, []);

  return {
    invoices,
    fetchInvoicesStatus,
  };
};
