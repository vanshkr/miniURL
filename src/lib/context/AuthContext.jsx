import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const checkUser = async (token) => {
    setIsLoading(true);
    const userData = jwtDecode(token);
    try {
      const currentAccount = userData;
      if (currentAccount) {
        setUser({
          id: currentAccount.id,
          name: currentAccount.name,
          email: currentAccount.email,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      const errorMeesage = err?.response?.data?.message;
      toast.error("Something went wrong", {
        description: errorMeesage,
        duration: 3000,
        cancel: {
          label: "x",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  const checkTokenExpiration = (token) => {
    if (!token) {
      setIsTokenExpired(true);
    }

    const decodedToken = jwtDecode(token);

    if (!decodedToken || !decodedToken.exp) {
      setIsTokenExpired(true);
      return;
    }
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    const flag = expirationTime < currentTime;
    setIsTokenExpired(flag);
    if (!flag) {
      checkUser(token);
    } else {
      logout();
    }
    return;
  };
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setIsLoading(false);
    setUser(undefined);
    setIsTokenExpired(false);
    navigate("/");
  };
  const check = () => {
    const token = localStorage.getItem("cloakCode");
    if (token === "" || token === null || token === undefined) {
      logout();
    } else {
      checkTokenExpiration(token);
    }
  };

  useEffect(() => check(), [isTokenExpired]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isTokenExpired,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        check,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
