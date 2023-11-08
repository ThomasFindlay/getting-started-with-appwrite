import { useState } from "react";
import { getInvoiceFileUrl } from "../../../api/invoice.api";

export const useDownloadInvoice = ({ invoiceId }) => {
  const [downloadInvoiceStatus, setDownloadInvoiceStatus] = useState("IDLE");

  const onDownloadInvoice = async () => {
    try {
      if (downloadInvoiceStatus === "PENDING") {
        return;
      }
      setDownloadInvoiceStatus("PENDING");
      const result = await getInvoiceFileUrl(`INVOICE_${invoiceId}`);
      window.open(result.href);
      setDownloadInvoiceStatus("SUCCESS");
    } catch (error) {
      console.error(error);
      setDownloadInvoiceStatus("ERROR");
    }
  };

  return {
    downloadInvoiceStatus,
    setDownloadInvoiceStatus,
    onDownloadInvoice,
  };
};
