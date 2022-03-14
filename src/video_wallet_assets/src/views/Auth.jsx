import { Button, CircularProgress, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { authWithInternetIdentity } from "../services/auth_services";

const Auth = () => {
  const { isLoading, isAuthenticated, setIsLoading, setIsAuthenticated } =
    useContext(AuthContext);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const authenticate = async () => {
    setIsLoading(true);
    try {
      const authenticatedNow = await authWithInternetIdentity();
      setIsAuthenticated(authenticatedNow);
    } catch (error) {
      console.error("Error authenticating with Internet Identity", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Grid container justify="center" item style={{ marginTop: 20 }}>
        <span>You are not logged in!</span>
      </Grid>
      <Grid container justify="center" item>
        <span>Please authenticate via Internet Identity:</span>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "200px", padding: 0 }}
          disabled={isLoading}
          onClick={authenticate}
        >
          {isLoading ? <CircularProgress /> : "Internet Identity"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Auth;
