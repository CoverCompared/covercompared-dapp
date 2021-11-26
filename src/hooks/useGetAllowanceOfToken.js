import { useCallback, useState } from 'react';
import { getCrvAddress } from '../utils/addressHelpers';
import { useTokenContract } from './useContract';
import useActiveWeb3React from './useActiveWeb3React';

const useGetAllowanceOfToken = (address) => {
  const { account } = useActiveWeb3React();
  const [crvAllowance, setAllowance] = useState(false);
  const crvAddress = getCrvAddress();
  // const p4lAddress = getP4LAddress();
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
