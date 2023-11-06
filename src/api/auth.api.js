import { account } from "./appwrite.api";

export const createAccount = (email, password) => {
  return account.create(email, password);
};

export const login = (email, password) => {
  return account.createEmailSession(email, password);
};
