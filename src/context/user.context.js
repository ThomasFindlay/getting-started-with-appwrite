import { createContext, useContext } from "react";

export const UserContext = createContext({});
export const UserActionsContext = createContext({});

export const useUserContext = () => useContext(UserContext);
export const useUserActionsContext = () => useContext(UserActionsContext);
