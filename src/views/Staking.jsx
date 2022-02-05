import React from 'react';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import FerrumNetworkFullLogo from '../assets/img/FerrumNetwork-logo.png';
import StakingImg from '../assets/img/staking-icon.png';
import Tap from '../assets/img/tap.png';
import Surface from '../assets/img/surface1.png';
import Transparency from '../assets/img/transparency.png';
import Gift from '../assets/img/gift.png';
import FastSupport from '../assets/img/fast-support.png';
import Referral from '../assets/img/referral.png';

const WhyChooseUs = [
  {
    icon: Tap,
    title: 'Simple & Easy to Use',
    description: 'for beginners and professionals, very simple to use.',
  },
  {
    icon: Surface,
    title: 'Security',
    description: 'your assets are stored securely on the blockchain.',
  },
  {
    icon: FastSupport,
    title: 'Fast Support',
    description: 'always ready to help you with any questions 24/7',
  },
  {
    icon: Transparency,
    title: 'Transparency',
    description: 'we share information on staking addresses.',
  },
  {
    icon: Gift,
    title: 'Top Reward',
    description: 'among the best rewards in the industry.',
  },
  {
    icon: Referral,
    title: 'Referral Reward',
    description: 'refer staking to earn more (coming soon).',
  },
];

const claimTokens = [
  {
    title: 'GOLD',
    APY: '25%',
    period: '90 days',
    cvr: '500,000',
    ctaLink:
      'https://stake.unifyre.io/polkacover/info/0xb2ddf8476360fb4a634319c15367ab3775a9afaa/ETHEREUM',
  },
  {
    title: 'PLATINUM',
    APY: '45%',
    period: '180 days',
    cvr: '750,000',
    ctaLink:
      'https://stake.unifyre.io/polkacover/info/0xf63070bb4dd07e02403b0844d530495e79d05a6f/ETHEREUM',
  },
  {
    title: 'VIP',
    APY: '85%',
    period: '365 days',
    cvr: '500,000',
    ctaLink:
      'https://stake.unifyre.io/polkacover/info/0x50ed1d6380d5b7c3bdd210a8d7da3856c2966922/ETHEREUM',
  },
];

const Staking = () => {
  return (
    <>
      <div className="text-h1 text-dark-blue font-Montserrat font-bold text-center dark:text-white mt-4">
        {/* Start Winning today with <span>Cover</span>
        <span className="text-coverComapredrLightBlue">Compared</span> <span>Staking</span> */}
        Claim your $CVR Staking Rewards
      </div>

      <div className="text-h4 text-dark-blue font-Montserrat font-semibold text-center dark:text-white mt-4">
        CoverCompared Staking is a flexible staking contract for ERC-20 tokens <br /> keep a look
        out for our next staking programme!
      </div>

      <div className="text-h4 text-light-green font-Montserrat font-semibold text-center mt-6 mb-2">
        In Partnership With
      </div>

      <div className="flex justify-center">
        <img
          loading="lazy"
          src={FerrumNetworkFullLogo}
          alt="Ferrum Network"
          className="lg:h-24 h-16"
        />
      </div>

      <div className="flex justify-center xl:px-14 md:px-6 w-full md:mt-20 mt-16">
        <div className="grid md:grid-cols-2 grid-cols-1 w-full xl:gap-x-28 gap-x-6">
          <div>
            <div className="text-h5 text-dark-blue font-Montserrat font-semibold dark:text-white mt-1">
              REWARDS
            </div>
            <div className="text-h1 text-dark-blue font-Montserrat font-bold dark:text-white">
              WHAT IS STAKING?
            </div>

            <div className="font-Inter text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text md:mt-10 mt-8">
              Staking is the process of holding tokens in a cryptocurrency wallet to support the
              operations of a network. Participants are rewarded for depositing and holding coins,
              with constant guaranteed time-based returns. Rewards are calculated based on staking
              time:
            </div>

            <div className="text-h4 text-dark-blue font-Montserrat font-semibold dark:text-white mt-8">
              The longer you stake, the more you earn.
            </div>
          </div>

          <div className="mt-6 md:mt-0 flex justify-center">
            <img loading="lazy" src={StakingImg} alt="" className="lg:h-72 md:64 h-44" />
          </div>
        </div>
      </div>

      <div className="text-h1 text-dark-blue font-Montserrat font-bold dark:text-white md:mt-20 mt-16 xl:px-14 md:px-6">
        Claim your staked tokens
      </div>
      <div className="text-h5 text-dark-blue font-Montserrat font-semibold dark:text-white mt-1 xl:px-14 md:px-6">
        Claim your staked $CVR from our January 2021 staking programme!
      </div>

      <div className="md:mt-10 mt-8 xl:px-14 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-y-6 gap-x-5 xl:gap-x-8">
        {claimTokens.map((obj, index) => (
          <div
            key={uniqid()}
            className="w-full md:p-5 p-4 shadow-md md:rounded-3xl rounded-xl flex flex-col bg-staking-plan-box-green dark:bg-featureCard-dark-bg col-span-2 sm:col-span-1 relative"
          >
            {/* <Link to="/" className="md:p-5 p-4"> */}
            <h5 className="font-Montserrat font-semiBold text-staking-plan-title font-semibold md:text-h4 text-h6 dark:text-white">
              <span className="font-bold text-h2">{obj.title}</span> STAKING
            </h5>
            <div className="font-Montserrat font-semiBold text-dark-blue font-medium text-h6 dark:text-white my-3">
              <span className="text-staking-plan-title font-bold text-h3">{obj.APY}</span> APY
            </div>
            <div className="font-Montserrat font-semiBold text-dark-blue font-medium text-h6 dark:text-white">
              <span className="text-staking-plan-title font-bold text-h3">{obj.period}</span>{' '}
              maturity period
            </div>
            <div className="font-Montserrat font-semiBold text-white font-semibold text-h4 my-3">
              Pool Size
            </div>
            <div className="font-Montserrat font-semiBold text-dark-blue font-medium text-h6 dark:text-white mb-5">
              <span className="text-staking-plan-title font-bold text-h3">{obj.cvr}</span> CVR
            </div>
            <Link to={obj.ctaLink} target="_blank" rel="noopener">
              <button
                type="button"
                className="outline-none md:h-12 h-11 py-0.75 px-5 md:px-12 bg-white disabled:bg-gray-200 text-primary-gd-1 font-Montserrat font-semibold md:rounded-lg rounded-xl text-body-md"
              >
                Claim
              </button>
            </Link>
            {index === 1 ? (
              <>
                <div className="h-10 w-10 md:h-14 md:w-14 shadow-lg bg-white rounded-full absolute right-16 bottom-16 md:hidden xl:block" />
                <div className="h-6 w-6 md:h-6 md:w-6 shadow-lg bg-staking-plan-title rounded-full absolute md:right-8 md:bottom-32 bottom-28 right-6 md:hidden xl:block" />
              </>
            ) : (
              <>
                <div className="h-10 w-10 md:h-14 md:w-14 shadow-lg bg-white rounded-full absolute right-4 bottom-16 md:hidden xl:block" />
                <div className="h-6 w-6 md:h-6 md:w-6 shadow-lg bg-staking-plan-title rounded-full absolute md:right-20 right-16 md:bottom-32 bottom-28 md:hidden xl:block" />
              </>
            )}
            {/* </Link> */}
          </div>
        ))}
      </div>

      <div className="text-h5 text-dark-blue font-Montserrat font-semibold text-center dark:text-white md:mt-20 mt-16">
        CoverCompared STAKING
      </div>
      <div className="text-h2 text-dark-blue font-Montserrat font-bold text-center dark:text-white mt-2">
        Why Choose Us?
      </div>

      <div className="md:mt-10 mt-8 xl:px-14 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-y-6 gap-x-5 xl:gap-x-8">
        {WhyChooseUs.map((obj, index) => (
          <div
            key={uniqid()}
            className="w-full shadow-md md:rounded-3xl rounded-xl flex flex-col items-center bg-white md:p-6 px-4 py-6 dark:bg-featureCard-dark-bg col-span-2 sm:col-span-1"
          >
            <div className="md:h-20 md:w-20 w-14 h-14">
              <img loading="lazy" src={obj.icon} alt="" className="md:h-20 h-14" />
            </div>
            <h5 className="mt-6 font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-h6 dark:text-white">
              {obj.title}
            </h5>
            <p className="mt-2 font-Inter text-post-body-text text-body-md leading-6 dark:text-subtitle-dark-text text-center">
              {obj.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Staking;
