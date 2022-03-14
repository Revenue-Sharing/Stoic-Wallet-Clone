import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import canisterIds from "../../../../.dfx/local/canister_ids.json"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoading, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rest.location]);

  if (isLoading) {
    return <>Authenticating...</>;
  }
  if (isAuthenticated) {
    return (
      <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
    );
  }
  return <Redirect to={`/login?canisterId=${canisterIds.video_wallet_assets.local}`} />;
};

export default ProtectedRoute;
