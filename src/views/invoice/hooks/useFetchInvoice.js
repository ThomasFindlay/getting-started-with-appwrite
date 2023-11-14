import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getInvoice } from "../../../api/invoice.api";
import { formatDate } from "../../../helpers/formatDate";

export const useFetchInvoice = ({ id, onSetInvoice }) => {
  /**
   * If there is no ID we just set the status to success, as there is no ID,
   * so the fetch request won't be executed.
   */
  const [fetchInvoiceStatus, setFetchInvoiceStatus] = useState(
    id ? "IDLE" : "SUCCESS"
  );

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
          if (["date", "dueDate", "paymentDate"].includes(key) && value) {
            if (!value) {
              newForm[key] = "";
            } else {
              const [month, day, year] = formatDate(new Date(value)).split("/");
              newForm[key] = `${year}-${month}-${day}`;
            }
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
    /**
     * Bail out if there is no invoice ID
     */
    if (!id) {
      return;
    }
    /**
     * We are on the edit invoice page.
     * Therefore, we need to fetch invoide details
     */
    initFetchInvoice(id);
  }, [id]);

  return {
    fetchInvoiceStatus,
    initFetchInvoice,
  };
};
