import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../../../api/invoice.api";
import { formatDate } from "../../../helpers/formatDate";

export const useFetchInvoice = ({ onSetInvoice }) => {
  const [fetchInvoiceStatus, setFetchInvoiceStatus] = useState("IDLE");
  const params = useParams();

  const initFetchInvoice = async invoiceUid => {
    try {
      if (fetchInvoiceStatus === "PENDING") {
        return;
      }

      setFetchInvoiceStatus("PENDING");

      const invoice = await getInvoice(invoiceUid);

      onSetInvoice(currentForm => {
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

  return {
    fetchInvoiceStatus,
    initFetchInvoice,
  };
};
