import React, { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../config/firebase';

import HealthInsurance from '../assets/img/health-insurance.svg';
import InsurancePolicy from '../assets/img/insurance-policy-icon.svg';
import GlobalIcon from '../assets/img/global-icon.svg';
import RewardIcon from '../assets/img/reward-icon.svg';
import StakingIcon from '../assets/img/staking-icon.svg';
import DecentrilizedIcon from '../assets/img/decentrlized-box-icon.svg';
import TokenIllustration from '../assets/img/token-page-illustration.svg';
import MobilePageTitle from '../components/common/MobilePageTitle';

const marketPlaces = ['Etherscan', 'Uniswap', 'Coinmarketcap', 'Dextools'];

const AboutToken = () => {
  useEffect(() => {
    logEvent(analytics, 'View - About Token');
  }, []);

  return (
    <>
      <MobilePageTitle title="About the Cover Compared Token" />
      <div className="xl:px-24 md:mb-8 mb-4 sm:px-8">
        <div className="bg-gradient-to-r from-global-banner-gd-1 to-global-banner-gd-2 rounded-2xl">
          <div className="md:px-24 md:py-16 py-6 px-8 flex justify-center items-center md:bg-aboutTokenTopBanner bg-no-repeat bg-100%">
            <div className="font-Montserrat text-white md:text-body-lg text-body-md max-w-lg text-center">
              The Cover Compared Token will be used throughout the platform for various activities.
              To get a full view of the activities, Take a look at our whitepaper here.
            </div>
          </div>
        </div>
      </div>
      <div className="font-Montserrat text-dark-blue md:text-body-md text-body-xs text-center md:px-24 font-medium dark:text-white">
        One Coin. 2 marketplaces. 11 use cases
      </div>
      <div className="text-center md:px-24 flex justify-center w-full mt-10 xl:mb-28 md:mb-16 mb-14">
        <div className="grid grid-cols-10 gap-x-6 gap-y-4 w-full sm:px-20">
          <div
            onClick={() =>
              window.open(
                'https://etherscan.io/token/0x3c03b4ec9477809072ff9cc9292c9b25d4a8e6c6',
                '_blank',
              )
            }
            className="col-span-6 md:col-span-2 bg-login-button-bg w-full py-3.5 px-2 rounded-xl text-login-button-text md:text-body-md text-body-xs font-semibold cursor-pointer"
          >
            Etherscan
          </div>
          <div
            onClick={() =>
              window.open(
                'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x3c03b4ec9477809072ff9cc9292c9b25d4a8e6c6',
                '_blank',
              )
            }
            className="col-span-6 md:col-span-2 bg-login-button-bg w-full py-3.5 px-2 rounded-xl text-login-button-text md:text-body-md text-body-xs font-semibold cursor-pointer"
          >
            Uniswap
          </div>
          <div
            onClick={() =>
              window.open('https://coinmarketcap.com/currencies/covercompared/', '_blank')
            }
            className="col-span-6 md:col-span-2 bg-login-button-bg w-full py-3.5 px-2 rounded-xl text-login-button-text md:text-body-md text-body-xs font-semibold cursor-pointer"
          >
            Coinmarketcap
          </div>
          <div
            onClick={() =>
              window.open(
                'https://www.dextools.io/app/ether/pair-explorer/0xbf7045f6ea651abb04e96cba61adabe6d7bf0ee8',
                '_blank',
              )
            }
            className="col-span-6 md:col-span-2 bg-login-button-bg w-full py-3.5 px-2 rounded-xl text-login-button-text md:text-body-md text-body-xs font-semibold cursor-pointer"
          >
            Dextools
          </div>
          <div
            onClick={() => window.open('https://trade.orionprotocol.io/pools/CVR-USDT', '_blank')}
            className="col-span-6 md:col-span-2 bg-login-button-bg w-full py-3.5 px-2 rounded-xl text-login-button-text md:text-body-md text-body-xs font-semibold cursor-pointer"
          >
            Orion Protocol
          </div>
        </div>
      </div>
      <div className="xl:px-24 md:px-4">
        <div className="mt-10 grid grid-cols-1 gap-y-6 xl:gap-y-8 gap-x-6 xl:gap-x-4 sm:grid-cols-12 lg:grid-cols-12 w-full">
          <div className="md:col-span-5 col-span-12 md:col-end-5 md:pb-14 order-2 md:order-1 md:bg-transparent md:shadow-none bg-white dark:bg-featureCard-dark-bg md:dark:bg-transparent rounded-xl shadow-xl p-4 md:p-0">
            <div className="flex justify-center md:justify-start">
              <div className="h-12 w-12 bg-login-button-bg rounded-xl flex justify-center items-center p-2">
                <img loading="lazy" src={HealthInsurance} alt="" className="w-10" />
              </div>
            </div>
            <div className="text-dark-blue-1 font-semibold font-Montserrat md:my-4 my-2 md:text-h6 text-body-md dark:text-white text-center md:text-left">
              Cross Border Policy Issuance
            </div>
            <div className="text-post-body-text font-Inter md:w-64 md:text-body-md text-body-sm md:leading-6 leading-5 dark:text-subtitle-dark-text text-center md:text-left">
              Users have access to global insurance policy coverage. The Cover Compared token will
              be easily accessible for purchase on the platform and through leading exchanges
              globally.
            </div>
          </div>
          <div className="md:col-span-7 col-span-12 md:col-start-6 md:col-end-12 md:pb-14 pb-10 flex justify-center order-1 md:order-2">
            <img loading="lazy" src={TokenIllustration} alt="" className="max-h-96" />
          </div>
          <div className="md:col-span-5 col-span-12 md:col-end-5 md:pb-14 order-3 md:order-3 md:bg-transparent md:shadow-none bg-white dark:bg-featureCard-dark-bg md:dark:bg-transparent md:dark-bg-transparent rounded-xl shadow-xl p-4 md:p-0">
            <div className="flex justify-center md:justify-start">
              <div className="h-12 w-12 bg-login-button-bg rounded-xl flex justify-center items-center p-3">
                <img loading="lazy" src={InsurancePolicy} alt="" className="w-10" />
              </div>
            </div>
            <div className="text-dark-blue-1 font-semibold font-Montserrat md:my-4 my-2 md:text-h6 text-body-md dark:text-white text-center md:text-left">
              Insurance Policy <br />
              Purchase & Discounts
            </div>
            <div className="text-post-body-text font-Inter max-w-62 md:text-body-md text-body-sm md:leading-6 leading-5 dark:text-subtitle-dark-text text-center md:text-left">
              Users can buy policies using the Cover Compared token. All transactions with the Cover
              Compared token receive a significant discount on their policy.
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 md:col-end-12 md:pb-14 order-4 md:order-4 md:bg-transparent md:shadow-none bg-white dark:bg-featureCard-dark-bg md:dark:bg-transparent md:dark-bg-transparent rounded-xl shadow-xl p-4 sm:p-8 md:p-0">
            <div className="flex justify-center md:justify-start">
              <div className="h-12 w-12 bg-login-button-bg rounded-xl flex justify-center items-center p-2">
                <img loading="lazy" src={DecentrilizedIcon} alt="" className="w-10" />
              </div>
            </div>
            <div className="text-dark-blue-1 font-semibold font-Montserrat md:my-4 my-2 md:text-h6 text-body-md dark:text-white text-center md:text-left">
              Traditional & Decentralized <br /> Insurance Products
            </div>
            <div className="text-post-body-text font-Inter md:text-body-md text-body-sm md:leading-6 leading-5 md:max-w-lg dark:text-subtitle-dark-text text-center md:text-left">
              Users will solely need to use the Cover Compared token to be able to purchase any
              traditional insurer-backed or DAO governed crypto insurance products. It would be a
              one stop shop to get access to all crypto based insurance products globally.
            </div>
          </div>
          <div className="md:pb-14 md:col-span-5 col-span-12 order-6 md:bg-transparent md:shadow-none bg-white dark:bg-featureCard-dark-bg md:dark:bg-transparent md:dark-bg-transparent rounded-xl shadow-xl p-4 md:p-0">
            <div className="flex justify-center md:justify-start">
              <div className="h-12 w-12 bg-login-button-bg rounded-xl flex justify-center items-center p-2">
                <img loading="lazy" src={GlobalIcon} alt="" className="w-10" />
              </div>
            </div>
            <div className="text-dark-blue-1 font-semibold font-Montserrat md:my-4 my-2 md:text-h6 text-body-md dark:text-white text-center md:text-left">
              Global Claims <br />
              Payout
            </div>
            <div className="text-post-body-text font-Inter md:text-body-md text-body-sm md:leading-6 leading-5 dark:text-subtitle-dark-text text-center md:text-left">
              Redeem your claim through the CVR token for your favorite cryptocurrencies.
            </div>
          </div>
          <div className="md:col-span-7 col-span-12 md:col-start-6 md:col-end-12 md:pb-14 order-7 md:bg-transparent md:shadow-none bg-white dark:bg-featureCard-dark-bg md:dark:bg-transparent md:dark-bg-transparent rounded-xl shadow-xl p-4 md:p-0">
            <div className="flex justify-center md:justify-start">
              <div className="h-12 w-12 bg-login-button-bg rounded-xl flex justify-center items-center p-2">
                <img loading="lazy" src={RewardIcon} alt="" className="w-10" />
              </div>
            </div>
            <div className="text-dark-blue-1 font-semibold font-Montserrat md:my-4 my-2 md:text-h6 text-body-md md:max-w-xs dark:text-white text-center md:text-left">
              P2P Risk Assessment & <br />
              Governance Rewards
            </div>
            <div className="text-post-body-text font-Inter md:text-body-md text-body-sm md:leading-6 leading-5 md:max-w-md dark:text-subtitle-dark-text text-center md:text-left">
              Additional member tokens are allocated as an incentive for participating in risk
              assessment & Governance
            </div>
          </div>
        </div>
        <div className="md:pb-14 md:bg-transparent md:shadow-none bg-white dark:bg-featureCard-dark-bg md:dark:bg-transparent md:dark-bg-transparent rounded-xl shadow-xl p-4 md:p-0 mt-6">
          <div className="flex justify-center md:justify-start">
            <div className="h-12 w-12 bg-login-button-bg rounded-xl flex justify-center items-center p-2 ">
              <img loading="lazy" src={StakingIcon} alt="" className="w-10" />
            </div>
          </div>
          <div className="text-dark-blue-1 font-semibold font-Montserrat md:my-4 my-2 md:text-h6 text-body-md dark:text-white text-center md:text-left">
            Staking = Cheaper Policies
          </div>
          <div className="text-post-body-text font-Inter max-w-2xl md:text-body-md text-body-sm md:leading-6 leading-5 dark:text-subtitle-dark-text text-center md:text-left">
            On site staking services & loyalty bonuses will be rewarded with reduced insurance
            costs. Stake a high enough number of CVR tokens and your interest might just pay off
            your insurance premium, thus getting you insured for free!
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutToken;
