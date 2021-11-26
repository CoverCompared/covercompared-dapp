import { useCallback, useState } from 'react';
import { getCrvAddress, getP4LAddress } from '../utils/addressHelpers';
import { useTokenContract } from './useContract';
import useActiveWeb3React from './useActiveWeb3React';

const useGetAllowanceOfToken = () => {
  const { account } = useActiveWeb3React();
  const [crvAllowance, setAllowance] = useState(false);
  const crvAddress = getCrvAddress();
  const p4lAddress = getP4LAddress();
  const crvContract = useTokenContract(crvAddress);

  const handleAllowance = useCallback(() => {
    const get = async () => {
      const res = await crvContract.allowance(account, p4lAddress);
      setAllowance(res.gt(0));
    };

    if (p4lAddress && crvContract) {
      get();
    }
  }, [crvContract, p4lAddress, account]);

  return { crvAllowance, handleAllowance };
};

export default useGetAllowanceOfToken;
