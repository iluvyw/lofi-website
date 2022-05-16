import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const values = {
    user,
    setUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default function useAuthentication() {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("Use inside provider");
  }
  return context;
}
