import { useCallback } from 'react';
import { ethers } from 'ethers';
import { useTokenContract } from './useContract';
import useActiveWeb3React from './useActiveWeb3React';
import useAddress from './useAddress';

const useTokenApprove = (address) => {
  const { account, library } = useActiveWeb3React();
  const { getCrvAddress } = useAddress();
  const crvAddress = getCrvAddress();
  const crvContract = useTokenContract(crvAddress);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await crvContract.approve(address, ethers.constants.MaxUint256);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [address, library, account]);

  return { onApprove: handleApprove };
};

export default useTokenApprove;
