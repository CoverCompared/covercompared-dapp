import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../config/firebase';
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import MSOPlanCard from '../components/MSOPlanCard';
import Loading from '../components/common/Loading';
import MSOServicesCard from '../components/MSOServicesCard';
import { searchMSOList } from '../redux/actions/MsoInsurance';
import Modal from '../components/common/Modal';
import MsoEligibilityChecker from '../components/common/MsoEligibilityChecker';
import OverlayLoading from '../components/common/OverlayLoading';
import { SupportedChainId } from '../config/chains';
import { setupNetwork } from '../utils/wallet';

import MSOpartner1 from '../assets/img/mso-partners-1.jpg';
import MSOpartner2 from '../assets/img/mso-partners-2.jpg';
import MSOpartner3 from '../assets/img/mso-partners-3.jpg';
import MSOpartner4 from '../assets/img/mso-partners-4.png';
import MSOpartner5 from '../assets/img/mso-partners-5.png';
import MSOpartner6 from '../assets/img/mso-partners-6.jpg';
import MSOpartner7 from '../assets/img/mso-partners-7.jpg';
import MSOpartner8 from '../assets/img/mso-partners-8.jpg';
import MSOpartner9 from '../assets/img/mso-partners-9.jpg';
import MSOService1 from '../assets/img/mso-service-1.png';
import MSOService2 from '../assets/img/mso-service-2.png';
import MSOService3 from '../assets/img/mso-service-3.png';
import { PRODUCT_CHAIN } from '../config';

const MSOServices = [
  {
    image: MSOService1,
    title: 'Medical Second Opinion (MSO)',
    description: [
      'Timely , accurate Diagnosis from world class medical centers.',
      'Turn around of 10 days from receipt of medical records.',
    ],
  },
  {
    image: MSOService2,
    title: 'International Concierge Services',
    description: [
      'Admission into a World class Medical centre.',
      'Travel and Accommodation arrangement.',
      'Airport pick up service',
      'Translation services',
    ],
  },
  {
    image: MSOService3,
    title: 'Electronic Health Records/Digital Platform',
    description: [
      'Electronic Health Records on Digital cloud platform.',
      'Access by patients, doctors and hospitals with patient permissions.',
      'Platform with video consult and easy mobile app access.',
    ],
  },
];

const MSOPartners = [
  {
    img: MSOpartner1,
    alt: 'Partner1',
  },
  {
    img: MSOpartner2,
    alt: 'Partner2',
  },
  {
    img: MSOpartner3,
    alt: 'Partner3',
  },
  {
    img: MSOpartner4,
    alt: 'Partner4',
  },
  {
    img: MSOpartner5,
    alt: 'Partner5',
  },
  {
    img: MSOpartner6,
    alt: 'Partner6',
  },
  {
    img: MSOpartner7,
    alt: 'Partner7',
  },
  {
    img: MSOpartner8,
    alt: 'Partner8',
  },
  {
    img: MSOpartner9,
    alt: 'Partner9',
  },
];

const MSOPlans = (props) => {
  const { chainId } = useActiveWeb3React();
  const dispatch = useDispatch();
  const { listLoader, msoList, loader } = useSelector((state) => state.msoInsurance);

  const [country, setCountry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isEligible, setIsEligible] = useState(false);
  const [products, setProducts] = useState(msoList);

  // this hooks for testing. Should be remove in production.
  useEffect(() => {
    (async () => {
      const _chainId = PRODUCT_CHAIN.mso;
      if (chainId !== _chainId) {
        await setupNetwork(_chainId);
      }
    })();
  }, [chainId]);

  useEffect(() => {
    logEvent(analytics, 'View - MSO Insurance');
    dispatch(searchMSOList());
  }, []);

  useEffect(() => {
    setProducts(msoList);
  }, [msoList]);

  const renderCards = () => {
    if (listLoader) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    }
    if (!listLoader && !products?.length) {
      return (
        <div className="mt-3 text-center dark:text-white text-h6 font-Montserrat font-medium w-full">
          Sorry! No results found
        </div>
      );
    }
    if (products?.length) {
      return (
        <>
          <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white">
            Plans
          </h2>
          <div className="grid grid-cols-12 lg:grid-cols-12 xl:grid-col-12 gap-y-4 gap-x-5 md:gap-4 lg:gap-x-6 lg:gap-y-4 mt-8">
            {products.map((obj, i) => (
              <MSOPlanCard
                key={i}
                {...{ ...obj, country, isEligible, setIsModalOpen }}
                {...props}
              />
            ))}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <>
      {loader && <OverlayLoading />}
      <Modal
        isOpen={isModalOpen}
        title="Country of Residence"
        sizeClass="max-w-2xl"
        renderComponent={MsoEligibilityChecker}
        onClose={() => setIsModalOpen(false)}
        bgImg="bg-loginPopupBg"
        {...{ setIsEligible, country, setCountry }}
      />
      <div className="xl:px-48 sm:px-8">
        <div className="font-Roboto text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text text-center">
          Cover Compares has partnered with{' '}
          <span className="font-semibold">World Class Doctors</span> - the MSO consortium which has
          operations in 57countries. And headquartered in the US.
        </div>
        <div className="mt-5 font-Roboto text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text text-center">
          The World Class Doctors -MSO consortium has 25 years medical second opinion (MSO)
          experience and provides opinions through the foremost medical experts from a consortium of
          the top hospitals in the world, with cutting edge research and knowledge.
        </div>
        <div
          className="bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 bg-clip-text fill-transparent font-semibold md:text-body-md text-body-sm text-center mt-6"
          style={{ WebkitTextFillColor: 'transparent' }}
        >
          The tie up is with the institutions and not individual doctors.
        </div>
      </div>

      {!isEligible && (
        <div className="flex justify-center items-center mt-8">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="font-Montserrat md:px-5 py-4 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 focus:outline-none focus:ring-0"
          >
            Check Eligibility
          </button>
        </div>
      )}

      <div className="xl:px-36 lg:px-28 md:my-20 my-12">
        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white">
          RANGE OF SERVICES
        </h2>
        <div className="grid grid-cols-12 gap-x-5 gap-y-4 mt-8">
          {MSOServices.map((obj) => (
            <MSOServicesCard key={uniqid()} {...obj} />
          ))}
        </div>
      </div>

      <div className="xl:px-36 lg:px-28">
        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white">
          WORLD LEADING MEDICAL CENTERS
        </h2>

        <div className="text-center mt-8">
          {MSOPartners.map(({ img, alt }) => (
            <div key={uniqid()} className="md:w-44 w-32 inline-flex justify-content-center mx-2">
              <img loading="lazy" className="p-2 object-scale-down w-full" src={img} alt={alt} />
            </div>
          ))}
        </div>
      </div>

      <div className="xl:px-36 lg:px-28 mt-8">{renderCards(country)}</div>
    </>
  );
};

export default MSOPlans;
