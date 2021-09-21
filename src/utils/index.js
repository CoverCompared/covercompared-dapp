import { getAddress } from '@ethersproject/address';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}
export function shortenTxHash(tx, chars = 4) {
  const len = tx.length;
  return `${tx.substring(0, chars + 2)}...${tx.substring(len - chars)}`;
}
