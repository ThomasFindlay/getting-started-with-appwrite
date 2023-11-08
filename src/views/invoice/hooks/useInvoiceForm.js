import { useState } from "react";
import { useParams } from "react-router-dom";

export const useInvoiceForm = () => {
  const params = useParams();
  const isEditMode = Boolean(params.id);
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
