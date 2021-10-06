import { useCallback, useState } from 'react';
import usePrevious from './usePrevious';

const useLastUpdated = () => {
  const [lastUpdated, setStateLastUpdated] = useState(Date.now());
  const previousLastUpdated = usePrevious(lastUpdated);

  const setLastUpdated = useCallback(() => {
    setStateLastUpdated(Date.now());
  }, [setStateLastUpdated]);

  return { lastUpdated, previousLastUpdated, setLastUpdated };
};

export default useLastUpdated;
