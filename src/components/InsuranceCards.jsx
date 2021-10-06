import React from 'react';
import uniqid from 'uniqid';
import InsuranceCard from './InsuranceCard';
import ContractIcon from '../assets/icons/contract1.svg';
import CryptoCurrencyIcon from '../assets/icons/cryptocurrency1.svg';
import DeviceIcon from '../assets/icons/device1.svg';
import MSOIcon from '../assets/icons/mso-icon.svg';

const InsuranceCards = (props) => {
  const cards = [
    {
      title: 'SMART CONTRACT',
      subtitle: 'COVER',
      icon: ContractIcon,
      gradientClass: 'bg-gradient-to-tl',
      bgImg: 'bg-homeCardBg1',
      redirectTo: '/search/smart-contract',
    },
    {
      title: 'CRYPTO EXCHANGE',
      subtitle: 'COVER',
      icon: CryptoCurrencyIcon,
      gradientClass: 'bg-gradient-to-bl',
      bgImg: 'bg-homeCardBg2',
      redirectTo: '/search/crypto-exchange',
    },
    {
      title: 'DEVICE INSURANCE',
      subtitle: 'COVER',
      icon: DeviceIcon,
      gradientClass: 'bg-gradient-to-tl',
      bgImg: 'bg-homeCardBg3',
      redirectTo: '/device-product',
    },
    {
      title: 'MEDICAL SECOND OPINION',
      subtitle: 'COVER',
      icon: MSOIcon,
      gradientClass: 'bg-gradient-to-bl',
      bgImg: 'bg-homeCardBg4',
      redirectTo: 'mso-plans',
    },
  ];

  return (
    <>
      {cards.map((m) => (
        <InsuranceCard {...props} key={uniqid()} {...m} />
      ))}
    </>
  );
};

export default InsuranceCards;
