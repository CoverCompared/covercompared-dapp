import { ethers } from 'ethers';
import abi from 'ethereumjs-abi';
import { toBuffer } from 'ethereumjs-util';

export const getSignatureParameters = (signature) => {
  if (!ethers.utils.isHexString(signature)) {
    throw new Error('Given value "'.concat(signature, '" is not a valid hex string.'));
  }
  const r = signature.slice(0, 66);
  const s = '0x'.concat(signature.slice(66, 130));
  let v = '0x'.concat(signature.slice(130, 132));
  v = ethers.BigNumber.from(v).toNumber();
  if (![27, 28].includes(v)) v += 27;
  return { r, s, v };
};

export const constructMetaTransactionMessage = (
  nonce,
  salt,
  functionSignature,
  contractAddress,
) => {
  return abi.soliditySHA3(
    ['uint256', 'address', 'uint256', 'bytes'],
    [nonce, contractAddress, salt, toBuffer(functionSignature)],
  );
};

export const metaCall = async (contract, contractInterface, account, signer, salt, call) => {
  const nonce = await contract.getNonce(account);
  const functionSignature = contractInterface.encodeFunctionData(call.name, call.params);
  console.log(call.name, call.params);
  const messageToSign = constructMetaTransactionMessage(
    nonce.toNumber(),
    salt,
    functionSignature,
    await contract.address,
  );
  const signature = await signer.signMessage(messageToSign);
  const { r, s, v } = getSignatureParameters(signature);
  const tx = await contract.executeMetaTransaction(account, functionSignature, r, s, v);
  return tx;
};
