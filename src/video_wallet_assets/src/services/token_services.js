import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory as nativeTokenIdl } from "../../../../../Prototype/.dfx/local/canisters/native_token/index";
import { idlFactory as tokenManagementIdl } from "../../../../../Prototype/.dfx/local/canisters/token_management/index";
import canisterIds from "../../../../../Prototype/.dfx/local/canister_ids.json";

// Return token transactions if possible
export const getTokenTransactions = () => {
  return [
    {
      from: "h4mpt-jy4ef-qqhte-awhxj-gds53-2fzqy-tplpj-b44lp-4sp76-vdmiy-cae",
      to: "h4mpt-jy4ef-qqhte-awhxj-gds53-2fzqy-tplpj-b44lp-4sp76-vdmiy-cae",
      timestamp: 1638224022,
      amount: 20,
      fee: 0.0025,
      out: false,
    },
  ];
};

export const getNFTs = () => {
  return [
    {
      id: "h4mpt-jy4ef-qqhte-awhxj-gds53-2fzqy-tplpj-b44lp-4sp76-vdmiy-cae",
      title: "Messi scores a goal",
      src: "video.mp4",
    },
  ];
};

export const getBalanceForIdentity = async (identity) => {
  const actor = await getNativeTokenActor(identity);
  const principal = identity.getPrincipal();

  const result = await actor.balance({
    token: "",
    user: { principal },
  });
  if ("ok" in result) return addDecimalPlace(Number(result.ok));
  throw new Error(JSON.stringify(result));
};

export const getTokensForCreator = async (identity) => {
  const tokenBackend = await getTokenManagementActor(identity);
  const principal = identity.getPrincipal().toText();
  const result = await tokenBackend.getOwnedTokens(principal);
  return parseTokenResult(result);
}

let _identity = null;
let _httpAgent = null;
let _nativeTokenActor = null;
let _tokenManagementActor = null;

export const getHttpAgent = async (identity) => {
  if (!_httpAgent || identity !== _identity) {
    // should be: new HttpAgent({ identity });
    _identity = identity;
    _httpAgent = new HttpAgent({ identity });
    await _httpAgent.fetchRootKey();
  }
  return _httpAgent;
};

export const getNativeTokenActor = async (identity) => {
  if (!_nativeTokenActor || identity !== _identity) {
    const httpAgent = await getHttpAgent(identity);
    _nativeTokenActor = Actor.createActor(nativeTokenIdl, {
      agent: httpAgent,
      canisterId: Principal.fromText(canisterIds.native_token.local),
    });
  }
  return _nativeTokenActor;
};

export const getTokenManagementActor = async (identity) => {
  if (!_tokenManagementActor || identity !== _identity) {
    const httpAgent = await getHttpAgent(identity);
    _tokenManagementActor = Actor.createActor(tokenManagementIdl, {
      agent: httpAgent,
      canisterId: Principal.fromText(canisterIds.token_management.local),
    });
  }
  return _tokenManagementActor;
};

const nativeTokenDecimals = 4;

function parseTokenResult(result) {
  const parsedResult = [];
  for (let entry of result) {
    const metadata = JSON.parse(entry.metadata);
    parsedResult.push({
      name: entry.name,
      canisterId: entry.canisterId,
      ownedAmount: entry.ownedAmount,
      supply: entry.supply,
      ...metadata,
    });
  }
  return parsedResult;
}

export function addDecimalPlace(amount) {
  return amount / Math.pow(10, nativeTokenDecimals);
}
