import { Secp256k1KeyIdentity } from '@dfinity/identity';

const publicKeyGabriela = new Uint8Array([
  4, 185, 140, 165, 88, 205, 199, 126, 24, 59, 83, 142, 225, 69, 141, 180, 185, 194, 22, 215, 168,
  199, 34, 64, 81, 149, 93, 209, 39, 140, 202, 202, 215, 225, 4, 124, 68, 136, 180, 216, 98, 243,
  210, 227, 162, 215, 101, 195, 139, 81, 57, 149, 78, 153, 204, 196, 126, 62, 105, 199, 204, 164,
  252, 125, 220,
]);

const privateKeyGabriela = new Uint8Array([
  255, 239, 26, 247, 211, 139, 8, 141, 2, 21, 10, 135, 175, 171, 224, 245, 91, 106, 16, 208, 22,
  161, 147, 87, 113, 33, 37, 163, 173, 230, 245, 120,
]);

export const identityGabriela = Secp256k1KeyIdentity.fromKeyPair(
  publicKeyGabriela,
  privateKeyGabriela
);

const publicKeyBronte = new Uint8Array([
  4, 203, 50, 75, 248, 81, 38, 47, 222, 95, 76, 233, 244, 167, 49, 150, 47, 108, 21, 163, 140, 119,
  34, 122, 129, 17, 7, 21, 143, 2, 137, 66, 252, 121, 77, 1, 91, 192, 119, 73, 175, 40, 88, 12, 158,
  249, 54, 145, 125, 141, 150, 205, 173, 194, 221, 64, 71, 166, 233, 46, 158, 191, 129, 29, 74,
]);

const privateKeyBronte = new Uint8Array([
  2, 218, 230, 45, 233, 221, 74, 40, 130, 118, 233, 148, 121, 127, 56, 167, 90, 29, 17, 212, 238,
  192, 64, 247, 66, 73, 88, 52, 101, 223, 229, 84,
]);

export const identityBronte = Secp256k1KeyIdentity.fromKeyPair(publicKeyBronte, privateKeyBronte);
