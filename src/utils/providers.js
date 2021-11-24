import { ethers } from 'ethers';
import getRpcUrl from './getRpcUrl';
// const ethSimpleProvider = ethers.getDefaultProvider('rinkeby');

const RPC_URL = getRpcUrl();

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

export default ethers.getDefaultProvider('rinkeby');
