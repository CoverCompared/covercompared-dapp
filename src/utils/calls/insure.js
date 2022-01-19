import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import insureAceAbi from '../../config/abi/insureAceAbi.json';
import { callWithEstimateGas, callWithEstimateGasPayable } from './estimateGas';
import { PRODUCT_CHAIN } from '../../config';

const buyETHCoverByETH = async (contract, param) => {
  const { data, premium } = param;
  const funParam = [
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
  ];
  const tx = await callWithEstimateGasPayable(contract, 'buyETHCoverByETH', premium, funParam);
  return tx;
};

const buyETHCoverByToken = async (contractA, contractB, account, signer, param) => {
  const { data, premium, token } = param;
  const contractInterface = new ethers.utils.Interface(insureAceAbi);
  const funParam = [
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
  ];
  let tx;
  try {
    tx = await metaCall(contractB, contractInterface, account, signer, PRODUCT_CHAIN.insurace, {
      name: 'buyETHCoverByToken',
      params: funParam,
    });
  } catch (error) {
    if (error.code === 151 || error.code === 150) {
      tx = await callWithEstimateGas(contractA, 'buyETHCoverByToken', funParam);
    }
  }
  return tx;
};

const buyTokenCoverByToken = async (contractA, contractB, account, signer, param) => {
  const { data, premium, token } = param;
  const contractInterface = new ethers.utils.Interface(insureAceAbi);
  const funParam = [
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
  ];
  let tx;
  try {
    tx = await metaCall(contractB, contractInterface, account, signer, PRODUCT_CHAIN.insurace, {
      name: 'buyTokenCoverByToken',
      params: funParam,
    });
  } catch (error) {
    if (error.code === 151 || error.code === 150) {
      tx = await callWithEstimateGas(contractA, 'buyTokenCoverByToken', funParam);
    }
  }
  return tx;
};

export default {
  buyETHCoverByETH,
  buyETHCoverByToken,
  buyTokenCoverByToken,
};
