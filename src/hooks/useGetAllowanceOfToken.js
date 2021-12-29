import { useCallback, useState } from 'react';
import { useTokenContract } from './useContract';
import useActiveWeb3React from './useActiveWeb3React';
import useAddress from './useAddress';

const useGetAllowanceOfToken = (address) => {
  const { account } = useActiveWeb3React();
  const [crvAllowance, setAllowance] = useState(false);
  const { getCrvAddress } = useAddress();
  const crvAddress = getCrvAddress();
  const crvContract = useTokenContract(crvAddress);

  const handleAllowance = useCallback(() => {
    const get = async () => {
      const res = await crvContract.allowance(account, address);
      setAllowance(res.gt(0));
    };

    if (address && crvContract) {
      get();
    }
  }, [crvContract, address, account]);

  return { crvAllowance, handleAllowance };
};

export default useGetAllowanceOfToken;
