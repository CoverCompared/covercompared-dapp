import { useCallback, useState } from 'react';
import { useTokenContract } from './useContract';
import useActiveWeb3React from './useActiveWeb3React';
import useAddress from './useAddress';

const useGetAllowanceOfToken = (address) => {
  const { account } = useActiveWeb3React();
  const [cvrAllowance, setAllowance] = useState(false);
  const { getCvrAddress } = useAddress();
  const cvrAddress = getCvrAddress();
  const cvrContract = useTokenContract(cvrAddress);

  const handleAllowance = useCallback(() => {
    const get = async () => {
      const res = await cvrContract.allowance(account, address);
      setAllowance(res.gt(0));
    };

    if (address && cvrContract) {
      get();
    }
  }, [cvrContract, address, account]);

  return { cvrAllowance, handleAllowance };
};

export default useGetAllowanceOfToken;
