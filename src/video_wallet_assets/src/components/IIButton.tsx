import { Button, Grid } from "@material-ui/core";
import React from "react";
import InternetIdentityLogo from "../../assets/internet_identity_logo.svg";

interface InternetIdentityButtonProps {
  name: string;
  callback: Function;
}

const InternetIdentityButton = (props: InternetIdentityButtonProps) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      style={{
        width: "200px",
        padding: 0,
        backgroundColor: "white",
        color: "black",
        fontWeight: 400,
      }}
      onClick={() => props.callback()}
    >
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <img
            src={InternetIdentityLogo}
            alt="ii-logo"
            height="40px"
            style={{ paddingTop: 8 }}
          />
        </Grid>
        <Grid item>{props.name}</Grid>
      </Grid>
    </Button>
  );
};

export default InternetIdentityButton;
