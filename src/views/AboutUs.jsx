import React, { useState } from 'react';
import { transform } from 'lodash';
import PointIcon from '../assets/img/blue-point.svg';
import Allianz from '../assets/img/allianz.svg';
import AIGLogo from '../assets/img/aig-logo.svg';
import NextCare from '../assets/img/Nextcare.svg';
import GlobalIcon from '../assets/img/manifesto-global-icon.svg';
import CommunityIcon from '../assets/img/manifesto-community-icon.svg';
import VisionIcon from '../assets/img/manifesto-vision-icon.svg';
import ArrowFrame from '../assets/img/about-polkacover-frames.gif';
import PhaseIcon1 from '../assets/img/phase-icon-1.png';
import PhaseIcon2 from '../assets/img/phase-icon-2.png';
import PhaseIcon3 from '../assets/img/phase-icon-3.png';
import PhaseIcon4 from '../assets/img/phase-icon-4.png';
import PhaseCard from '../components/PhaseCard';

const PhaseArr = [
  {
    phaseNumber: 1,
    phaseIcon: PhaseIcon1,
    title: 'Global CryptoProtect Products by Polkacover',
    descriptionArr: [
      'Crypto Insurance Products for over 40 cryptocurrencies (and growing!) insured by a leading multinational insurance company',
      'Read Page 17 of our whitepaper to get a taste of what&apos;s baking in our oven.',
    ],
  },
  {
    phaseNumber: 2,
    phaseIcon: PhaseIcon2,
    title: 'Global Insurance Marketplace (covercompared.com)',
    descriptionArr: [
      'covercompared.com will be the one-stop-shop to buy, compare & purchase from several insurance providers using crypto.',
      'This will be the first insurance marketplace where you can purchase crypto insurance products from anywhere in the world.',
      'You can purchase them through our website or our mobile app !',
    ],
  },
  {
    phaseNumber: 3,
    phaseIcon: PhaseIcon3,
    title: 'P2P Insurance (Insurance DAO)',
    descriptionArr: [
      'A community-driven crypto insurance protocol that decides the pricing, risks, claims assessment and rewards of the products.',
      'Be rewarded with the claims-free bonus when no insurance claims are reported during the policy period.',
    ],
  },
  {
    phaseNumber: 4,
    phaseIcon: PhaseIcon4,
    title: 'Polkacover Claim It!',
    descriptionArr: [
      'Autonomous claims processing platform based on AI and machine learning which acts-as a third-party claims management platform for insurance companies.',
      'Polkacover will change the way to process claims by making it easy for the insurance companies and making payouts pain-free for their customers.',
    ],
  },
];
const AboutUs = () => {
  return (
    <>
      <div className="text-32 text-partner-page-title font-Montserrat font-semibold text-center mb-12 dark:text-white">
        Our Core Team
      </div>
      <div className="flex justify-center xl:px-28 lg:px-24 md:px-16 w-full">
        <div className="grid grid-cols-2 w-full xl:gap-x-28 gap-x-6">
          <div className="flex justify-center col-span-2 md:col-span-1">
            <div className="flex-col flex items-center">
              <div className="md:h-32 md:w-32 h-16 w-16 rounded-full bg-gray-300 md:mb-6 mb-4">
                {/* img here */}
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-h6 dark:text-white">
                Kunal Sadani
              </div>
              <div className="text-dark-blue font-Montserrat font-medium text-body-md mb-4 dark:text-white">
                Founder, CEO
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold md:text-body-sm text-body-xs text-center mb-3 dark:text-white">
                Heading Partnerships, Product & <br /> Market Development
              </div>
              <div className="flex-col flex items-start">
                <div className="flex justify-center items-start mb-2">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xs dark:text-subtitle-dark-text">
                    Worked in a senior leadership role within an insurtech startup (Valued at over
                    $1 billion).
                  </div>
                </div>
                <div className="flex justify-center items-start">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xs dark:text-subtitle-dark-text">
                    10+ years working in insurance product development with multinational insurers
                  </div>
                </div>
              </div>
              <div className="font-Montserrat font-semibold text-dark-blue text-body-sm mt-4 mb-2 dark:text-white">
                Previous Employers :
              </div>
              <div className="flex align-center">
                <img src={Allianz} alt="Allianz" className="mr-2" />
                <img src={AIGLogo} alt="AIG" />
              </div>
            </div>
          </div>
          <div className="flex justify-center col-span-2 md:col-span-1 mt-12 md:mt-0">
            <div className="flex-col flex items-center justify-center">
              <div className="md:h-32 md:w-32 h-16 w-16 rounded-full bg-gray-300 md:mb-6 mb-4">
                {/* img here */}
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-h6 dark:text-white text-">
                Anthony Thomas
              </div>
              <div className="text-dark-blue font-Montserrat font-medium text-body-md mb-4 dark:text-white">
                Co-Founder, CIO
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold md:text-body-sm text-body-xs text-center mb-3 dark:text-white">
                Heading Operations, Systems, & <br />
                Process Setups
              </div>
              <div className="flex-col flex items-start">
                <div className="flex justify-center items-start mb-2">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xs dark:text-subtitle-dark-text">
                    10 years of operational management experience across various service verticals
                  </div>
                </div>
                <div className="flex justify-center items-start mb-2">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xs dark:text-subtitle-dark-text">
                    Set up 3 operational service centres simultaneously from scratch comprising over
                    2000+ staff
                  </div>
                </div>
                <div className="flex justify-center items-start">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xs dark:text-subtitle-dark-text">
                    Created several regional backend system platforms & projects for multinational
                    insurance providers
                  </div>
                </div>
              </div>
              <div className="font-Montserrat font-semibold text-dark-blue text-body-sm mt-4 mb-2 dark:text-white">
                Previous Employers :
              </div>
              <div className="flex align-center">
                <img src={Allianz} alt="Allianz" className="mr-2" />
                <img src={NextCare} alt="NextCare" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* core-team-end */}

      {/* partner-section-start */}
      <div className="text-32 text-partner-page-title font-Montserrat font-semibold text-center mb-12 mt-20 dark:text-white">
        Our Partners
      </div>
      <div className="flex justify-center xl:px-28 lg:px-24 md:px-16 w-full">
        <div className="grid grid-cols-2 w-full xl:gap-x-28 gap-x-6">
          <div className="flex justify-center col-span-2 md:col-span-1">
            <div className="flex-col flex items-center">
              <div className="md:h-32 md:w-32 h-16 w-16 rounded-full bg-gray-300 md:mb-6 mb-4">
                {/* img here */}
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-h6 dark:text-white text-center">
                Jaskanwar “Jas” Singh
              </div>
              <div className="text-dark-blue font-Montserrat font-medium text-body-md mb-4 dark:text-white text-center">
                CTO @ Sehteq Healthcare
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-body-sm text-center mb-3 dark:text-white">
                Technology Advisor
              </div>
            </div>
          </div>
          <div className="flex justify-center col-span-2 md:col-span-1 mt-10 md:mt-0">
            <div className="flex-col flex items-center">
              <div className="md:h-32 md:w-32 h-16 w-16 rounded-full bg-gray-300 md:mb-6 mb-4">
                {/* img here */}
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-h6 dark:text-white text-center">
                DuckDao.io
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-body-sm text-center mt-2 dark:text-white">
                Strategic Advisor
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* partner-section-end */}

      {/* about-platform-start */}
      <div className="relative md:-ml-10 z-0 box-border mt-16 md:pb-96 md:mb-44 mb-20">
        <div className="w-full bg-platofrm-blue-bg md:px-20 p-6 md:pt-10 pb-6 md:rounded-br-full md:rounded-tr-full overflow-hidden relative">
          <div className="text-center font-Montserrat font-extrabold md:text-h1 text-h5">
            A Little Bit about Our Platform
          </div>
          <div className="font-Montserrat md:text-body-lg text-body-xs font-medium text-center mt-2">
            We are building the best insurtech platform for the masses
          </div>
          <div className="pt-10 z-10 px-24 hidden md:flex justify-center">
            <img src={ArrowFrame} alt="" className="h-44" style={{ width: '40vw' }} />
          </div>
          <div className="md:h-40 md:w-40 h-16 w-16 left-6 animate-bubbles1 rounded-full absolute shadow-bubbleShadow" />
          <div className="h-14 w-14 left-96 animate-bubbles rounded-full absolute shadow-bubbleShadow" />
          <div className="h-28 w-28 right-96 animate-bubbles1 rounded-full absolute shadow-bubbleShadow" />
          <div className="h-8 w-8 right-36 animate-bubbles rounded-full absolute shadow-bubbleShadow" />
          <div className="h-16 w-16 right-14 animate-bubbles1 rounded-full absolute shadow-bubbleShadow" />
        </div>

        <div className="grid grid-cols-12 gap-x-3 gap-y-20 md:absolute top-60 z-20 w-full md:px-20 mt-12 md:mt-0">
          {PhaseArr.map((obj) => (
            <PhaseCard {...obj} />
          ))}
        </div>
      </div>

      {/* menifesto-section-start */}
      <div className="text-32 text-partner-page-title font-Montserrat font-semibold text-center dark:text-white mt-16">
        Our Menifesto
      </div>
      <div className="flex justify-center pt-11">
        <img src={GlobalIcon} className="text-center" alt="" />
      </div>
      <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-bold text-center dark:text-white mt-4">
        &quot;Be the change you want to see in the world&quot;
      </h2>
      <div className="md:px-24 md:pt-10 pt-8">
        <div className="font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md  text-center">
          We live in a world that is empowered by technology and innovation every day – it touches
          nearly every aspect of our lives, changing them for the better for the most part.
        </div>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md  text-center">
          One such revolutionary technological advancement was the advent of cryptocurrency - the
          currency that changed the world.
        </div>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md  text-center">
          Over the years, Cryptocurrency usage has significantly increased due to rising inflation
          and demand for inflation-resistant assets. Weary users bound by the restrictive and
          capricious shackles of traditional financial instruments found themselves questioning the
          centralised bodies behind them, growing increasingly concerned about transparency and
          long-term stability of the whole global financial system. Thus, the people turned to this
          novel system of finance– an alternative solution that was freer, fairer, and nearly
          immutable.
        </div>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md text-center">
          This enormous boom in crypto users has proved to be revolutionary for the history of our
          species.
        </div>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md text-center">
          Just during Q1 2021, crypto users have doubled from 100 million to nearly 200 million.
          Regardless of this massive growth in population, the crypto community as a whole has been
          rather neglected by traditional providers of service.
        </div>
        <div
          className="bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 bg-clip-text fill-transparent font-bold md:text-h4 text-h6 text-center mt-6"
          style={{ WebkitTextFillColor: 'transparent' }}
        >
          Specifically, when it comes to institutions that ultimately secure user’s funds, namely,
          Insurance providers, there has been a significant dearth of options available to our
          community.
        </div>
        <div className="flex justify-center pt-14">
          <img src={CommunityIcon} alt="" />
        </div>
        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-bold text-center dark:text-white mt-8">
          IF THEY CAN, WHY NOT ME?
        </h2>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md text-center">
          If a holder of fiat currency wants to secure his assets, be they fiscal or otherwise,
          there exist a plethora of options for him to do so. However, if the same individual would
          like to be ensured using his crypto funds – no dice.
        </div>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md text-center">
          Why does this disparity exist? Why, despite the crypto community being at the advent of
          innovative tech and growing every day, is the average crypto holder not afforded the same
          advantages as holders of more traditional instruments of payment?
        </div>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md text-center">
          PolkaCover aims to right this wrong – we’re the world’s first platform that will enable
          crypto-holders to purchase not just specialized covers for their crypto-based assets, but
          also fulfill their needs in the traditional sectors of insurance such as life, health,
          home, etc. – all bought using a host of different cryptocurrencies.
        </div>
        <div className="flex justify-center pt-14">
          <img src={VisionIcon} alt="" />
        </div>
        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-bold text-center dark:text-white mt-8">
          OUR VISION
        </h2>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md text-center">
          PolkaCover is here to address the needs of the crypto community. We understand the growing
          concerns of safety in the crypto ecosystem, and we firmly believe that every individual
          deserves the chance to protect their valuable assets without worrying about costs and
          limitations. <span className="font-extrabold">Protection shouldn’t be conditional</span>.
          It is time insurers were empathetic to the hardships faced by unprotected crypto users.
        </div>
        <div className="mt-6 font-Montserrat font-medium text-menifesto-content-color md:text-h6 text-body-md text-center">
          PolkaCover is the world’s first platform offering crypto and traditional insurance
          products under one marketplace specially aimed to cater to the global crypto market. We
          are a user-centric insurance aggregator, working towards optimising the experience of
          purchasing insurance – whether it be bought using fiat money, or cryptocurrency.
        </div>
      </div>
      <div className="md:px-20 md:mt-14 mt-12">
        <div className="md:rounded-2xl md:px-12 px-4 py-6 md:pt-10 md:pb-14 rounded-3xl bg-gradient-to-r from-global-banner-gd-1 to-global-banner-gd-2 relative">
          <div className="absolute bottom-0 right-0">
            <svg
              width="128"
              height="80"
              viewBox="0 0 128 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.35117"
                y="46.8724"
                width="145.199"
                height="200.358"
                rx="15.6"
                stroke="white"
                strokeWidth="0.8"
              />
              <rect
                x="31.2994"
                y="0.451392"
                width="145.199"
                height="200.358"
                rx="15.6"
                stroke="white"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          <div className="text-center md:px-10 text-white font-Montserrat font-extrabold md:text-h1 text-body-md">
            THE FUTURE OF POLKACOVER
          </div>
          <div className="font-Montserrat text-white md:text-body-lg text-body-xs font-medium text-center mt-4">
            The platform aims to bridge the gap in the insurance sector by collaborating with
            insurers and giving users historical data to make informed decisions on what cover is
            best-suited to their unique situation, as well as giving them the liberty to act upon
            this decision on their own terms. Additionally, it offers affordable covers, transparent
            pricing, and multiple payment options.
          </div>
          <div className="font-Montserrat text-white md:text-body-lg text-body-md font-medium text-center mt-3">
            PolkaCover will soon bring about a newfound era of innovation in the insurance market
            and be the first platform of its kind to offer a democratic safety net to all.
          </div>
        </div>
      </div>
      {/* <div>
        <div className="roadmap-container col-12 d-none d-md-block">
          <div className="d-md-flex align-items-start justify-content-center">
            <div className="col-3 mr-2 position-relative">
              <div className="roadmap-circle roadmap-circle-active roadmap-circle-1">
                <div className="quater-active" />
              </div>
              <div className="quater">
                Q2 <span>2021</span>
              </div>
              <div className="roadmap-points-title">Marketplace Beta Release</div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Crypto Insurance Marketplace - Launch on Ropsten
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Apps and Delivery Channels Integration
              </div>
            </div>
            <div className="col-3 mr-2">
              <div className="roadmap-circle roadmap-circle-2" />
              <div className="quater">
                Q3 <span>2021</span>
              </div>
              <div className="roadmap-points-title">Marketplace Alpha Release</div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Crypto Insurance Partner Onboarding
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Crypto Insurance Marketplace - Launch on BSC Mainnet
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Crypto Insurance Marketplace - Launch on Kusama/Polkadot Mainnet
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                CEX Listing
              </div>
            </div>
            <div className="col-3 mr-2">
              <div className="roadmap-circle roadmap-circle-3" />
              <div className="quater">
                Q4 <span>2021</span>
              </div>
              <div className="roadmap-points-title">P2P Platform Beta Release</div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Tokenomics Update
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Governance Platform launch
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                P2P Insurance Platform - Launch on Ropsten
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Policy Management and Claims Processing Platform - Launch on Ropsten
              </div>
            </div>
            <div className="col-3">
              <div className="roadmap-circle roadmap-circle-4" />
              <div className="quater">
                Q1 <span>2022</span>
              </div>
              <div className="roadmap-points-title">P2P Platform Alpha Release</div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                P2P Insurance Platform - Launch on Kusama/Polkadot
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Policy Management and Claims Processing Platform - Launch on Kusama/Polkadot
              </div>
              <div className="roadmap-point position-relative">
                <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                Expansion in Coverage and Onboarding More Insurance Product Types
              </div>
            </div>
          </div>
        </div>

        <div className="d-md-none col-12 px-0">
          <div className="d-flex align-items-start ">
            <div className="position-relative roadmap-line-container col-2 px-0">
              <img src="images/roadmap-mobile-line.png" alt="" className="roadmap-line" />
            </div>
            <div className="roadmap-container col-10">
              <div className="col-12 mb-3 position-relative">
                <div className="roadmap-circle roadmap-circle-active roadmap-circle-1">
                  <div className="quater-active" />
                </div>
                <div className="quater">
                  Q2 <span>2021</span>
                </div>
                <div className="roadmap-points-title">Marketplace Beta Release</div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Crypto Insurance Marketplace - Launch on Ropsten
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Apps and Delivery Channels Integration
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="roadmap-circle roadmap-circle-2" />
                <div className="quater">
                  Q3 <span>2021</span>
                </div>
                <div className="roadmap-points-title">Marketplace Alpha Release</div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Crypto Insurance Partner Onboarding
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Crypto Insurance Marketplace - Launch on BSC Mainnet
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Crypto Insurance Marketplace - Launch on Kusama/Polkadot Mainnet
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  CEX Listing
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="roadmap-circle roadmap-circle-3" />
                <div className="quater">
                  Q4 <span>2021</span>
                </div>
                <div className="roadmap-points-title">P2P Platform Beta Release</div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Tokenomics Update
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Governance Platform launch
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  P2P Insurance Platform - Launch on Ropsten
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Policy Management and Claims Processing Platform - Launch on Ropsten
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="roadmap-circle roadmap-circle-4" />
                <div className="quater">
                  Q1 <span>2022</span>
                </div>
                <div className="roadmap-points-title">P2P Platform Alpha Release</div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  P2P Insurance Platform - Launch on Kusama/Polkadot
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Policy Management and Claims Processing Platform - Launch on Kusama/Polkadot
                </div>
                <div className="roadmap-point position-relative">
                  <img src="./images/roadmap-point.png" alt="" className="roadmap-point-icon" />
                  Expansion in Coverage and Onboarding More Insurance Product Types
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default AboutUs;
