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
      const fileId = `INVOICE_${invoiceId}`;
      const result = await getInvoiceFileUrl(fileId);
      const anchor = document.createElement("a");
      anchor.href = result.href;
      anchor.download = `${fileId}.pdf`;
      anchor.click();
      anchor.remove();
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
