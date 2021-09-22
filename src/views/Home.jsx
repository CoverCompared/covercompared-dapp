import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import InsuranceCards from '../components/InsuranceCards';
import MobilePageTitle from '../components/common/MobilePageTitle';
import InsuranceCardDotBg from '../assets/bg-img/insurance-card-dot-bg.svg';
import cryptoInsuranceDotBg from '../assets/bg-img/crypto-insurance-dot-bg.svg';
import cryptoInsuranceOrangeDots from '../assets/img/orange-dots.svg';
import CounterCard from '../components/CounterCard';
import PostCard from '../components/PostCard';
import FeatureCard from '../components/FeatureCard';
import Balance from '../assets/icons/balance1.svg';
import Discount from '../assets/icons/discount1.svg';
import Stopwatch from '../assets/icons/stopwatch1.svg';
import Strategy from '../assets/icons/strategy1.svg';
import CryptoInsuranceImg from '../assets/img/crypto-insurance-icon.svg';
import CryptoInsuranceImgDark from '../assets/img/crypto-orange-logo.svg';
import { ThemeContext } from '../themeContext';

const counterCards = [
  {
    title: '50+',
    subtitle: 'Insurance Product',
  },
  {
    title: '2 Days',
    subtitle: 'Avg. Time Buying our Product.',
  },
  {
    title: '300M $',
    subtitle: 'Total covered amount',
  },
];

const postCards = [
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
];

const clientLogos = [
  {
    image: 'https://via.placeholder.com/400x250.png',
    alt: 'client logo',
  },
  {
    image: 'https://via.placeholder.com/400x250.png',
    alt: 'client logo',
  },
  {
    image: 'https://via.placeholder.com/400x250.png',
    alt: 'client logo',
  },
  {
    image: 'https://via.placeholder.com/400x250.png',
    alt: 'client logo',
  },
  {
    image: 'https://via.placeholder.com/400x250.png',
    alt: 'client logo',
  },
  {
    image: 'https://via.placeholder.com/400x250.png',
    alt: 'client logo',
  },
  {
    image: 'https://via.placeholder.com/400x250.png',
    alt: 'client logo',
  },
];

const featureCards = [
  {
    title: 'Fast and Free',
    body: 'Find your insurance in few click on Covercompared guided by a system of simple and intuitive questionaires.',
    icon: Stopwatch,
  },
  {
    title: '100% Neutrual',
    body: 'No favoritism: on Covercompared we display the most relevant insurance for your search criteria.',
    icon: Balance,
  },
  {
    title: 'Over 100 Insurance plans',
    body: 'Our aggregator references more than 100 products spread across 7 major categories of insurance.',
    icon: Strategy,
  },
  {
    title: 'Upto 40% cashback in CVR tokens',
    body: 'Find your insurance in few click on Covercompared guided by a system of simple and intuitive questionaires.',
    icon: Discount,
  },
];

const Features = (props) => {
  return (
    <div className="flex flex-col items-center xl:px-36 md:px-4 md:pb-20 pb-16 text-center">
      <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center lg:max-w-xs dark:text-white">
        Save money on your insurance in 4 easy step!
      </h2>
      <p className="mt-4 text-counter-card-text text-body-md md:px-20 font-Inter dark:text-subtitle-dark-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel semper blandit euismod vitae
        eleifend vitae eleifend massa imperdiet.
      </p>
      <div className="md:mt-10 mt-8 xl:px-14 md:px-6 grid grid-cols-2 gap-y-6 gap-x-5 xl:gap-x-8">
        {featureCards.map(({ icon, title, body }) => (
          <FeatureCard {...props} key={uniqid()} icon={icon} title={title} body={body} />
        ))}
      </div>
    </div>
  );
};

export default function Home(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <MobilePageTitle
        title="Motto of the Company"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel semper blandit euismod vitae eleifend vitae eleifend massa imperdiet."
      />
      <div className="grid grid-cols-2 gap-4 xl:gap-y-8 md:gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 sm:px-28 md:px-6 md:pb-20 pb-12 xl:px-40 relative">
        <InsuranceCards {...props} />
        <img
          src={InsuranceCardDotBg}
          alt=""
          className="absolute sm: md:-top-11 -top-7 right-4 md:right-24 z-0 md:h-24 md:w-24 h-14 w-14"
        />
      </div>

      <div className="grid grid-cols-3 gap-y-6 gap-x-3 xl:gap-y-8 xl:gap-x-8 md:grid-cols-3 lg:grid-cols-3 lg:px-36 sm:px-4 md:gap-x-6 md:pb-20 px-0 pb-10">
        {counterCards.map(({ title, subtitle }) => (
          <CounterCard {...props} key={uniqid()} title={title} subtitle={subtitle} />
        ))}
      </div>

      <div className="sm:grid hidden grid-cols-12 gap-y-6 xl:gap-y-8 gap-x-6 xl:gap-x-8 md:grid-cols-12 lg:grid-cols-12 lg:px-14 md:px-4 md:pb-20 pb-14 sm:px-0">
        {postCards.map(({ image, title, body, ctaLink }) => (
          <PostCard
            {...props}
            key={uniqid()}
            image={image}
            title={title}
            body={body}
            ctaLink={ctaLink}
          />
        ))}
      </div>
      <div className="sm:hidden pb-14">
        {postCards.map(({ image, title, body, ctaLink }) => (
          <div className="grid grid-cols-12 gap-x-3 mb-3" key={uniqid()}>
            <div className=" col-span-4 w-full h-22">
              <img src={image} alt="" className="h-full w-full rounded-lg" />
            </div>
            <div className="col-span-8 flex flex-col justify-center">
              <div className="font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-h6 dark:text-white">
                {`${title.slice(0, 18)}. . .`}
              </div>
              <div className="text-post-body-text md:text-body-md text-body-xs mt-1 mb-2 font-Inter dark:text-subtitle-dark-text">
                {`${body.slice(0, 60)}. . . `}
              </div>
              <Link
                to={ctaLink}
                className="font-Montserrat text-dark-blue font-semibold md:text-body-md text-body-sm underline dark:text-white"
              >
                Read More...
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Features {...props} />

      <div className="md:pb-20 pb-16">
        <h2 className="font-Montserrat font-semibold md:text-h2 text-h4 mb-4 text-dark-blue dark:text-white">
          Our Insurance Partners
        </h2>
        <div className="text-center">
          {clientLogos.map(({ image, alt }) => (
            <img key={uniqid()} className="md:h-36 h-24 inline-block p-2" src={image} alt={alt} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center xl:px-28 pb-16 text-center relative">
        <img
          src={theme === 'light' ? cryptoInsuranceDotBg : cryptoInsuranceOrangeDots}
          alt=""
          className="absolute md:top-12 sm:top-20 left-0 top-32 h-16 w-16"
        />
        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center lg:max-w-xs dark:text-white">
          Crypto Insurance
        </h2>
        <p className="mt-3 text-counter-card-text text-body-md xl:px-36 md:px-28 font-Inter dark:text-subtitle-dark-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel semper blandit euismod vitae
          eleifend vitae eleifend massa imperdiet.
        </p>
        <div className="mt-10 grid grid-cols-12 gap-y-6 xl:gap-y-8 gap-x-6 md:gap-x-12">
          <div className="md:col-span-4 xl:col-start-2 flex items-center col-span-12 justify-center">
            <img
              src={theme === 'light' ? CryptoInsuranceImg : CryptoInsuranceImgDark}
              alt=""
              className="md:max-h-60 max-h-52"
            />
          </div>
          <div className="md:col-span-6 col-span-12 xl:col-end-12 lg:col-end-13">
            <div className="grid grid-cols-2 md:gap-y-12 gap-y-10 gap-x-7 md:gap-x-8 md:grid-cols-2 lg:grid-cols-2 sm:gap-4">
              <div className="text-left">
                <div className="text-dark-blue-1 font-Montserrat text-h4 font-bold mb-2 dark:text-white">
                  01.
                </div>
                <div className="text-dark-blue-1 font-Montserrat text-h6 max-w-8 dark:text-white">
                  Premium starting at values{' '}
                  <span className="text-light-green font-semibold">as low as $2</span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-dark-blue-1 font-Montserrat text-h4 font-bold mb-2 dark:text-white">
                  02.
                </div>
                <div className="text-dark-blue-1 font-Montserrat text-h6 max-w-8 dark:text-white">
                  Coverage ranging from{' '}
                  <span className="text-light-green font-semibold">
                    $25,000 to a whopping $1,000,000
                  </span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-dark-blue-1 font-Montserrat text-h4 font-bold mb-2 dark:text-white">
                  03.
                </div>
                <div className="text-dark-blue-1 font-Montserrat text-h6 max-w-8 dark:text-white">
                  Get covered against{' '}
                  <span className="text-light-green font-semibold">
                    exchange hacks & phishing attacks
                  </span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-dark-blue-1 font-Montserrat text-h4 font-bold mb-2 dark:text-white">
                  04.
                </div>
                <div className="text-dark-blue-1 font-Montserrat font-light text-h6 max-w-8 dark:text-white">
                  Avail claims against{' '}
                  <span className="text-light-green font-semibold">exchanges going backrupt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:px-28 pb-0 lg:pb-20">
        <div className=" bg-gradient-to-r from-global-banner-gd-1 to-global-banner-gd-2 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:px-20 md:px-12 md:py-14 px-4 py-12 md:bg-globalPolicyBg bg-globalPolicyMobileBg bg-100%">
            <div className="flex items-center text-white font-Montserrat font-bold text-30 sm:col-span-1 col-span-2 justify-center md:justify-start mb-6 md:mb-0">
              Global Policy
            </div>
            <div className="flex items-center text-white font-Montserrat text-body-md md:pr-20 md:leading-6 sm:col-span-1 col-span-2 sm:justify-start justify-center text-center sm:text-left">
              One policy, can be purchased from anywhere with the CVR token. Insurance made easy.
            </div>
          </div>
        </div>
      </div>

      {/* <div className="md:pb-24">
        <h2 className="font-Montserrat font-semibold text-h2 mb-4 text-dark-blue dark:text-white">
          Our Upcoming Insurance Partners
        </h2>
        <div className="text-center">
          {clientLogos.map(({ image, alt }) => (
            <img key={uniqid()} className="md:h-36 h-24 inline-block p-2" src={image} alt={alt} />
          ))}
        </div>
      </div> */}
    </div>
  );
}
