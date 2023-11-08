import { useState } from "react";
import { useParams } from "react-router-dom";

export const useInvoiceForm = () => {
  const params = useParams();
  const isEditMode = Boolean(params.id);
  const [form, setForm] = useState({
    invoiceId: "",
    date: "",
    dueDate: "",
    amount: "",
    description: "",
    senderName: "",
    senderAddress: "",
    senderPostcode: "",
    senderCity: "",
    senderCountry: "",
    senderEmail: "",
    senderPhone: "",
    clientName: "",
    clientAddress: "",
    clientPostcode: "",
    clientCity: "",
    clientCountry: "",
    clientEmail: "",
    clientPhone: "",
    accountName: "",
    accountSortCode: "",
    accountNumber: "",
    accountAddress: "",
    accountIban: "",
    paymentReceived: false,
    paymentDate: "",
  
  });

  const onFormChange = key => value => {
    setForm(state => ({
      ...state,
      [key]: value,
    }));
  };

  return {
    form,
    setForm,
    onFormChange,
    isEditMode,
  };
};
