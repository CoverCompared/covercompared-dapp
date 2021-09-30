import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import uniqid from 'uniqid';
import PackageCard from '../components/common/PackageCard';
import MSOPlanCard from '../components/MSOPlanCard';
import { ThemeContext } from '../themeContext';
import { searchMSOList } from '../redux/actions/CoverList';
import Loading from '../components/common/Loading';
import ToolTip from '../components/common/ToolTip';
import MSOServicesCard from '../components/MSOServicesCard';

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
    alt: 'Partner',
  },
  {
    img: MSOpartner2,
    alt: 'Partner',
  },
  {
    img: MSOpartner3,
    alt: 'Partner',
  },
  {
    img: MSOpartner4,
    alt: 'Partner',
  },
  {
    img: MSOpartner5,
    alt: 'Partner',
  },
  {
    img: MSOpartner6,
    alt: 'Partner',
  },
  {
    img: MSOpartner7,
    alt: 'Partner',
  },
  {
    img: MSOpartner8,
    alt: 'Partner',
  },
  {
    img: MSOpartner9,
    alt: 'Partner',
  },
];

const MSOPlans = (props) => {
  const coverListData = useSelector((state) => state.coverList);
  const { loader, coverList, query, message, isFailed, page, totalPages } = coverListData;
  const [products, setProducts] = useState(coverList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMSOList());
  }, []);

  useEffect(() => {
    setProducts(coverList);
  }, [coverList]);

  const renderCards = () => {
    if (loader) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    }
    if (!loader && !products?.length) {
      return (
        <div className="mt-3 text-center dark:text-white text-h6 font-Montserrat font-medium w-full">
          Sorry! No results found
        </div>
      );
    }
    if (products?.length) {
      return (
        <div className="grid grid-cols-12 lg:grid-cols-12 xl:grid-col-12 gap-y-4 gap-x-5 md:gap-4 lg:gap-x-6 lg:gap-y-4 ">
          {products.map((obj) => (
            <MSOPlanCard key={uniqid()} {...obj} {...props} />
          ))}
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className="xl:px-48 sm:px-8">
        <div className="font-Inter text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text text-center">
          Cover Compares has partnered with{' '}
          <span className="font-semibold">World Class Doctors</span> - the MSO consortium which has
          operations in 57countries. And headquartered in the US.
        </div>
        <div className="mt-5 font-Inter text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text text-center">
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

      <div className="xl:px-36 lg:px-28 md:mt-16 mt-12">{renderCards()}</div>

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
            <div className="md:w-44 w-32 inline-flex justify-content-center mx-2">
              <img key={uniqid()} className="p-2 object-scale-down w-full" src={img} alt={alt} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MSOPlans;
