import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "./TokenContext";
import { AuthContext } from "./AuthContext";
import {
  getBalanceForIdentity,
  getTokensForCreator,
} from "../services/token_services";

const TokenContextState = (props) => {
  const { identity } = useContext(AuthContext);

  const [videoTokensForCreator, setVideoTokensForCreator] = useState([]);
  const [nativeTokenBalance, setNativeTokenBalance] = useState(0);
  const [balanceTrigger, setBalanceTrigger] = useState(true);
  const [tokenTrigger, setTokenTrigger] = useState(true);

  useEffect(() => {
    async function queryBalance() {
      try {
        const balanceForIdentity = await getBalanceForIdentity(identity);
        setNativeTokenBalance(balanceForIdentity);
        setBalanceTrigger(false);
      } catch (error) {
        console.error(
          "Error retrieving identity for authenticated user",
          error
        );
      }
    }
    if (identity && balanceTrigger) {
      queryBalance();
    }
  }, [identity, balanceTrigger]);

  useEffect(() => {
    async function queryOffersAndTokens() {
      try {
        const videoTokensForCreatorResult = await getTokensForCreator(identity);
        setVideoTokensForCreator(videoTokensForCreatorResult);
      } catch (error) {
        console.error("error fetching video tokens", error);
      } finally {
        if (tokenTrigger) setTokenTrigger(false);
      }
    }

    if (identity && tokenTrigger) {
      queryOffersAndTokens();
    }
  }, [identity, tokenTrigger]);

  return (
    <TokenContext.Provider
      value={{
        setBalanceTrigger,
        setTokenTrigger,
        videoTokensForCreator,
        setVideoTokensForCreator,
        nativeTokenBalance,
        setNativeTokenBalance,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export { TokenContextState };
