import { AuthClient } from "@dfinity/auth-client";
import canisterIds from "../../../../../internet-identity/.dfx/local/canister_ids.json";

let _authClient = null;

const getAuthClient = async () => {
  if (!_authClient) {
    _authClient = await AuthClient.create();
  }
  return _authClient;
};

// returns true for existing authentication
export const checkForExistingAuthentication = async () => {
  const authClient = await getAuthClient();
  return await authClient.isAuthenticated();
};

// returns true if login / register via Internet Identity was successful
export const authWithInternetIdentity = async () => {
  const authClient = await getAuthClient();
  return new Promise(async (resolve, reject) => {
    await authClient.login({
      onError: async (error) => {
        reject("Internet Identity login unsuccessful: " + error);
      },
      onSuccess: async () => {
        resolve(true);
      },
      identityProvider: canisterIds?.internet_identity?.local
        ? `http://localhost:8000?canisterId=${canisterIds.internet_identity.local}`
        : "http://localhost:8000?canisterId=renrk-eyaaa-aaaaa-aaada-cai",
    });
  });
};

// returns identity of authenticated user
export const getAuthenticatedIdentity = async () => {
  const authClient = await getAuthClient();
  return authClient.getIdentity();
};
