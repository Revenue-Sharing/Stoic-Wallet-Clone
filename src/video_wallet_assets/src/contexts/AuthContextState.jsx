import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  checkForExistingAuthentication,
  getAuthenticatedIdentity,
} from "../services/auth_services";

const AuthContextState = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true);
      try {
        const isAuthenticatedNow = await checkForExistingAuthentication();
        if (isAuthenticatedNow !== isAuthenticated) {
          setIsAuthenticated(isAuthenticatedNow);
        }
      } catch (error) {
        console.error("Error checking for authentication", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    async function getIdentity() {
      try {
        const authenticatedIdentity = await getAuthenticatedIdentity();
        console.debug(
          "Setting identity to ",
          authenticatedIdentity.getPrincipal().toString()
        );
        setIdentity(authenticatedIdentity);
      } catch (error) {
        console.error(
          "Error retrieving identity for authenticated user",
          error
        );
      }
    }

    if (isAuthenticated && !identity) getIdentity();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
        identity,
        setIdentity,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextState };
