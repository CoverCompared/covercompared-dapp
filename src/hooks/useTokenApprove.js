import { useCallback } from 'react';
import { ethers } from 'ethers';
import { useTokenContract } from './useContract';
import useActiveWeb3React from './useActiveWeb3React';
import useAddress from './useAddress';

const useTokenApprove = (address, tokenSymbol = 'cvr') => {
  const { account, library } = useActiveWeb3React();
  const { getCvrAddress, getTokenAddress } = useAddress();
  // const cvrAddress = getCvrAddress();
  // const cvrContract = useTokenContract(cvrAddress);
  const tokenAddress = getTokenAddress(tokenSymbol);
  const tokenContract = useTokenContract(tokenAddress);
  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.approve(address, ethers.constants.MaxUint256);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [address, tokenSymbol, library, account]);

  return { onApprove: handleApprove };
};

export default useTokenApprove;
