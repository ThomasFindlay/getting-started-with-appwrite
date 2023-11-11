import { ID } from "appwrite";
import { account } from "./appwrite.api";

export const createAccount = (email, password) => {
  return account.create(ID.unique(), email, password);
};

export const login = (email, password) => {
  return account.createEmailSession(email, password);
};

export const getCurrentAuthSession = () => {
  return account.get();
};
