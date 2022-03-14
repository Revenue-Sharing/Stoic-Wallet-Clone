import React from "react";
import { Redirect, Router, Switch, Route } from "react-router-dom";
import Auth from "./views/Auth";
import History from "./components/History";
import { AuthContextState } from "./contexts/AuthContextState";
import { TokenContextState } from "./contexts/TokenContextState";
import ProtectedRoute from "./components/ProtectedRoute";
import Wallet from "./containers/Wallet";
import canisterIds from "../../../.dfx/local/canister_ids.json"

export default function App() {
  return (
    <>
      <AuthContextState>
        <TokenContextState>
          <Router history={History}>
            <Switch>
              <ProtectedRoute path="/home" component={Wallet} />
              <Route path="/login" component={Auth} />
              <Redirect from="/" to={`/home?canisterId=${canisterIds.video_wallet_assets.local}`} />
            </Switch>
          </Router>
        </TokenContextState>
      </AuthContextState>
    </>
  );
}
