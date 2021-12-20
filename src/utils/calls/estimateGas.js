import { ethers, Contract } from 'ethers';

/**
 * Estimate the gas needed to call a function, and add a 10% margin
 * @param contract Used to perform the call
 * @param methodName The name of the methode called
 * @param gasMarginPer10000 The gasMargin per 10000 (i.e. 10% -> 1000)
 * @param args An array of arguments to pass to the method
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export const estimateGas = async (contract, methodName, methodArgs, gasMarginPer10000) => {
  if (!contract[methodName]) {
    throw new Error(`Method ${methodName} doesn't exist on ${contract.address}`);
  }
  const rawGasEstimation = await contract.estimateGas[methodName](...methodArgs);
  // By convention, ethers.BigNumber values are multiplied by 1000 to avoid dealing with real numbers
  const gasEstimation = rawGasEstimation
    .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(gasMarginPer10000)))
    .div(ethers.BigNumber.from(5000));
  return gasEstimation;
};

export const estimateGasPayable = async (
  contract,
  methodName,
  ethAmount,
  methodArgs,
  gasMarginPer10000,
) => {
  if (!contract[methodName]) {
    throw new Error(`Method ${methodName} doesn't exist on ${contract.address}`);
  }
  const rawGasEstimation = await contract.estimateGas[methodName](...methodArgs, {
    value: ethAmount,
  });
  // By convention, ethers.BigNumber values are multiplied by 1000 to avoid dealing with real numbers
  const gasEstimation = rawGasEstimation
    .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(gasMarginPer10000)))
    .div(ethers.BigNumber.from(5000));
  return gasEstimation;
};

/**
 * Perform a contract call with a gas value returned from estimateGas
 * @param contract Used to perform the call
 * @param methodName The name of the methode called
 * @param args An array of arguments to pass to the method
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export const callWithEstimateGas = async (
  contract,
  methodName,
  methodArgs = [],
  gasMarginPer10000 = 1000,
) => {
  const gasEstimation = estimateGas(contract, methodName, methodArgs, gasMarginPer10000);
  const tx = await contract[methodName](...methodArgs, {
    gasLimit: gasEstimation,
  });
  return tx;
};

export const callWithEstimateGasPayable = async (
  contract,
  methodName,
  ethAmt,
  methodArgs = [],
  gasMarginPer10000 = 1000,
) => {
  const gasEstimation = estimateGasPayable(
    contract,
    methodName,
    ethAmt,
    methodArgs,
    gasMarginPer10000,
  );
  const tx = await contract[methodName](...methodArgs, {
    value: ethAmt,
    gasLimit: gasEstimation,
  });
  return tx;
};
