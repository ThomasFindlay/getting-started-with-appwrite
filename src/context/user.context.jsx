import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { createAccount, getCurrentAuthSession, login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const userContext = createContext({});
const userActionsContext = createContext({});

export const useUserContext = () => useContext(userContext);
export const useUserActionsContext = () => useContext(userActionsContext);

export const UserContextProvider = props => {
  const [user, setUser] = useState(null);
  const [isInitialised, setIsInitialised] = useState(false);
  const navigate = useNavigate();

  const initUserSession = async () => {
    try {
      const currentSession = await getCurrentAuthSession();
      if (currentSession) {
        setUser(currentSession);
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
      navigate("/auth/login");
    }
    setIsInitialised(true);
  };

  useEffect(() => {
    initUserSession();
  }, []);

  const value = useMemo(() => {
    return {
      user,
    };
  }, [user]);

  const actions = useMemo(() => {
    return {
      login,
      createAccount,
    };
  }, []);

  return (
    <userContext.Provider value={value}>
      <userActionsContext.Provider value={actions}>
        {isInitialised ? (
          props.children
        ) : (
          <div className="flex items-center justify-center min-h-screen font-semibold text-indigo-600">
            Loading...
          </div>
        )}
      </userActionsContext.Provider>
    </userContext.Provider>
  );
};
