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

export const createUser = (user, password) => {
  const createUserFunction = app.functions().httpsCallable('createUser');
  return createUserFunction({ user, password });
}

export const addAdminRole = (email) => {
  const addAdminRole = app.functions().httpsCallable('addAdminRole');
  return addAdminRole({email});
}

export const verifyAdminRole = () => {
  app.auth().onAuthStateChanged((user) => {
    user.getIdTokenResult().then(idTokenResult => {
      const isAdmin = idTokenResult.claims.admin
      console.log(isAdmin);
      return isAdmin ? true : false;
    })
  })
}
