import { useCallback } from 'react';
import { ethers } from 'ethers';
import { getCrvAddress, getP4LAddress } from '../utils/addressHelpers';
import { useTokenContract } from './useContract';
import useActiveWeb3React from './useActiveWeb3React';

const useTokenApprove = () => {
  const { account, library } = useActiveWeb3React();
  const crvAddress = getCrvAddress();
  const p4lAddress = getP4LAddress();
  const crvContract = useTokenContract(crvAddress);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await crvContract.approve(p4lAddress, ethers.constants.MaxUint256);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [p4lAddress, library, account]);

  return { onApprove: handleApprove };
};

export default useTokenApprove;
