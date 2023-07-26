// AuthContext.tsx
import React, { createContext, useState } from "react";

const initialContext = {
  isAuthenticated: false,
  token: undefined,
  setIsAuthenticated: () => {},
}

const AuthContext = createContext(initialContext);

export const AuthProvider= ({ children}) => {
  return (
    <AuthContext.Provider value={initialContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
