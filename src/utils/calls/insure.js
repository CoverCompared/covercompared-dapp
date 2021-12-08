import { DEFAULT_GAS_LIMIT, MSO_PLAN_TYPE } from '../../config';
import { getCrvAddress } from '../addressHelpers';

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
};

const buyCoverByETH = async (contract, param) => {
  const { data, premium } = param;
  const tx = await contract.buyCoverByETH(
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    data[5],
    data[6],
    data[7],
    data[8],
    data[9],
    data[10],
    data[11],
    { value: premium },
  );
  const receipt = await tx.wait();
  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

const buyCoverByToken = async (contract, param) => {
  const { data } = param;
  const tx = await contract.buyCoverByToken(
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    data[5],
    data[6],
    data[7],
    data[8],
    data[9],
    data[10],
    data[11],
  );
  const receipt = await tx.wait();
  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

export default {
  buyCoverByETH,
  buyCoverByToken,
};
