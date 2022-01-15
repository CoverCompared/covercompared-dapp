import { useCallback, useState } from 'react';
import { useTokenContract } from './useContract';
import useActiveWeb3React from './useActiveWeb3React';
import useAddress from './useAddress';

const useGetAllowanceOfToken = (address, tokenSymbol = 'cvr') => {
  const { account } = useActiveWeb3React();
  const [cvrAllowance, setAllowance] = useState(false);
  const { getCvrAddress, getTokenAddress } = useAddress();
  // const cvrAddress = getCvrAddress();
  // const cvrContract = useTokenContract(cvrAddress);
  const tokenAddress = getTokenAddress(tokenSymbol);
  const tokenContract = useTokenContract(tokenAddress);
  const handleAllowance = useCallback(() => {
    const get = async () => {
      const res = await tokenContract.allowance(account, address);
      setAllowance(res.gt(0));
    };

    if (address && tokenContract) {
      get();
    }
  }, [tokenContract, address, tokenSymbol, account]);

  return { cvrAllowance, handleAllowance };
};

export default useGetAllowanceOfToken;
