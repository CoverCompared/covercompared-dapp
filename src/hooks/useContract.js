import { useMemo } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import {
    getContract,
    getMSOContract,
    getP4LContract
} from '../utils/contractHelpers';
import erc20Abi from '../config/abi/erc20.json';

export const useMSOContract = () => {
    const { library } = useActiveWeb3React();
    return useMemo(() => getMSOContract(library.getSigner()), [library]);
}

export const useP4LContract = () => {
    const { library } = useActiveWeb3React();
    return useMemo(() => getP4LContract(library.getSigner()), [library]);
}

export const useTokenContract = (address) => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getContract(erc20Abi, address, library.getSigner()), [library]);
}

// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
    const { library, account } = useActiveWeb3React();

    return useMemo(() => {
      // if (!address || !ABI || !library) return null;
      try {
        return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
      } catch (error) {
        console.error('Failed to get contract', error);
        return null;
      }
    }, [address, ABI, library, withSignerIfPossible, account]);
}
  
// export function useTokenContract(tokenAddress, withSignerIfPossible = true) {
//     return useContract(tokenAddress, erc20Abi, withSignerIfPossible);
// }
