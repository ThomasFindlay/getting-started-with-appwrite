import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createAccount, getCurrentAuthSession, login } from "../api/auth.api";
import { UserActionsContext, UserContext } from "./user.context";

const UserContextProvider = props => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initUserSession = async () => {
    /**
     * Initialize user's auth session.
     * If there is no session, redirect to the login page.
     */
    try {
      const currentSession = await getCurrentAuthSession();
      if (currentSession) {
        setUser(currentSession);
        if (location.pathname.includes("auth")) {
          navigate("/");
        }
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
      navigate("/auth/login");
    }
    setIsInitialized(true);
  };

  useEffect(() => {
    /**
     * Initialize user's session if the app was just loaded
     * or if a user was already initialised, determine if a user should be redirected to the login page.
     */
    if (isInitialized) {
      if (!user && !location.pathname.includes("auth")) {
        navigate("/auth/login");
      }
    } else {
      initUserSession();
    }
  }, [location.pathname]);

  const value = useMemo(() => {
    return {
      user,
    };
  }, [user]);

  const actions = useMemo(() => {
    return {
      login,
      createAccount,
      setUser,
      setIsInitialized,
    };
  }, []);

  return (
    <UserContext.Provider value={value}>
      <UserActionsContext.Provider value={actions}>
        {isInitialized ? (
          props.children
        ) : (
          <div className="flex items-center justify-center min-h-screen font-semibold text-indigo-600">
            Loading...
          </div>
        )}
      </UserActionsContext.Provider>
    </UserContext.Provider>
  );
};

export default UserContextProvider;
