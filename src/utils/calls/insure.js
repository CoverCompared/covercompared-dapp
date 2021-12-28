import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import insureAceAbi from '../../config/abi/insureAceAbi.json';

const buyCoverByETH = async (contract, param, setTxState) => {
  const { data, premium } = param;
  const tx = await contract.buyCoverByETH(
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
  setTxState({ state: 'pending', hash: tx.hash });
  const receipt = await tx.wait();
  setTxState({ state: 'confirmed', hash: tx.hash });

  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

const buyCoverByToken = async (contract, account, signer, param, setTxState) => {
  const { data, premium, token } = param;
  const contractInterface = new ethers.utils.Interface(insureAceAbi);
  const { receipt, tx } = await metaCall(contract, contractInterface, account, signer, 4, {
    name: 'buyCoverByToken',
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
  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

export default {
  buyCoverByETH,
  buyCoverByToken,
};
