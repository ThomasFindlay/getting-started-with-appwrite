import { useNavigate, useParams } from "react-router-dom";
import { deleteInvoice } from "../../../api/invoice.api";
import toast from "react-hot-toast";
import { useState } from "react";

export const useDeleteInvoice = ({ invoiceId }) => {
  const navigate = useNavigate();
  const [deleteInvoiceStatus, setDeleteInvoiceStatus] = useState("IDLE");

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
      await deleteInvoice(invoiceId);
      setDeleteInvoiceStatus("SUCCESS");
      toast.success("Invoice deleted");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete the invoice");
      setDeleteInvoiceStatus("ERROR");
    }
  };

  return {
    deleteInvoiceStatus,
    initDeletePrompt,
  };
};
