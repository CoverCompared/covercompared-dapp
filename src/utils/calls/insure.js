import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import insureAceAbi from '../../config/abi/insureAceAbi.json';

const buyETHCoverByETH = async (contract, param) => {
  const { data, premium } = param;
  const tx = await contract.buyETHCoverByETH(
    data[0],
    data[1],
    data[2],
    data[3],
    data[5],
    premium, // premium amount in eth
    data[7],
    data[8],
    data[9],
    data[10],
    data[11],
    { value: premium },
  );
  return tx;
};

const buyETHCoverByToken = async (contract, account, signer, param) => {
  const { data, premium, token } = param;
  const contractInterface = new ethers.utils.Interface(insureAceAbi);
  const tx = await metaCall(contract, contractInterface, account, signer, 4, {
    name: 'buyETHCoverByToken',
    params: [
      data[0],
      data[1],
      data[2],
      data[3],
      token,
      data[5],
      premium, // premium amount in eth
      data[7],
      data[8],
      data[9],
      data[10],
      data[11],
    ],
  });
  return tx;
};

const buyTokenCoverByToken = async (contract, account, signer, param) => {
  const { data, premium, token } = param;
  const contractInterface = new ethers.utils.Interface(insureAceAbi);
  const tx = await metaCall(contract, contractInterface, account, signer, 4, {
    name: 'buyTokenCoverByToken',
    params: [
      data[0],
      data[1],
      data[2],
      data[3],
      token,
      data[5],
      premium, // premium amount in token
      data[7],
      data[8],
      data[9],
      data[10],
      data[11],
    ],
  });
  return tx;
};

export default {
  buyETHCoverByETH,
  buyETHCoverByToken,
  buyTokenCoverByToken,
};
