import React, { useContext, useReducer } from "react";
import AuthReducer, { initialAuthState } from "./auth-reducer";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const authValues = useReducer(AuthReducer, initialAuthState);
  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
