import React, { useEffect, useState } from "react";

import app from '../util/firebaseUtils';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadding, setIsLoadding] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsLoadding(false)
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {isLoadding ? null : children}
    </AuthContext.Provider>
  );
};