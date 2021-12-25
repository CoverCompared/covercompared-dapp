import React from 'react';
import { useWeb3React } from '@web3-react/core';

import TelegramIcon from '../assets/icons/telegram_logo.png';

const TelegramWidget = () => {
  const { account } = useWeb3React();
  const url = 'https://t.me/+QN0Mu98nn2hhNGZl';

  if (!account) return null;

  return (
    <div
      className="z-10 fixed bottom-5 right-5 cursor-pointer flex flex-col items-center"
      onClick={() => window.open(url, '_blank')}
    >
      <p className="pb-1 text-sm w-32 text-center text-gray-800 dark:text-white">
        Join TG channel for reporting bugs
      </p>
      <img src={TelegramIcon} alt="telegram" className="w-16 h-16" />
    </div>
  );
};

export default TelegramWidget;
