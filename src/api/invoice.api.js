import { ID, Permission, Role } from "appwrite";
import { databases, databaseId } from "./appwrite.api";
const invoiceCollectionId = import.meta.env
  .VITE_APPWRITE_COLLECTION_ID_INVOICES;

export const listInvoices = () => {
  return databases.listDocuments(databaseId, invoiceCollectionId);
};

export const getInvoice = documentId => {
  return databases.getDocument(databaseId, invoiceCollectionId, documentId);
};

export const createInvoice = (userId, payload) => {
  const ownerRole = Role.user(userId);
  return databases.createDocument(
    databaseId,
    invoiceCollectionId,
    ID.unique(),
    payload,
    [
      Permission.read(ownerRole),
      Permission.update(ownerRole),
      Permission.delete(ownerRole),
    ]
  );
};

export const updateInvoice = (documentId, payload) => {
  return databases.updateDocument(
    databaseId,
    invoiceCollectionId,
    documentId,
    payload
  );
};

export const deleteInvoice = documentId => {
  return databases.deleteDocument(databaseId, invoiceCollectionId, documentId);
};
