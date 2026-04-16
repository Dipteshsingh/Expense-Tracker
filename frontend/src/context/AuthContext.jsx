import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [token]);

  const login = (userData, userToken) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);