import { useState } from "react";
import { createInvoice, updateInvoice } from "../../../api/invoice.api";
import toast from "react-hot-toast";
import { useUserContext } from "../../../context/user.context";
import { useNavigate } from "react-router-dom";

export const useSubmitInvoice = ({ form, isEditMode }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [submitInvoiceStatus, setSubmitInvoiceStatus] = useState("IDLE");

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

  return {
    submitInvoiceStatus,
    onSubmitInvoice,
  };
};
