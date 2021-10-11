import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Markup } from 'interweave';
import uniqid from 'uniqid';
import Modal from '../components/common/Modal';
import CountrySelector from '../components/common/DeviceCountrySelector';
import { ThemeContext } from '../themeContext';

import MobileIcon from '../assets/icons/mobile-icon.svg';
import LaptopIcon from '../assets/icons/laptop-icon.svg';
import TabletIcon from '../assets/icons/tablet-icon.svg';
import HeadPhoneIcon from '../assets/icons/headphone-icon.svg';

import PickupIcon from '../assets/icons/pickup_dropoff.svg';
import UpgradIcon from '../assets/icons/upgrade-download.svg';
import OnlineClaimsIcon from '../assets/icons/online-claims.svg';
import QuickStepIcon from '../assets/icons/quick-step-icon.svg';

import CrackedScreeIcon from '../assets/icons/crackedscreen-icon.svg';
import TouchScreenIcon from '../assets/icons/touchscreenmalfunction-icon.svg';
import LiquidDamageIcon from '../assets/icons/liquiddamage-icon.svg';
import TheftIcon from '../assets/icons/theft-icon.svg';

import AXA from '../assets/partners/p4l-partners/axa.png';
import Arch from '../assets/partners/p4l-partners/arch.png';
import SwissRe from '../assets/partners/p4l-partners/swiss_re.jpg';

import Axiom from '../assets/partners/p4l-partners/axiom.png';
import BatArabiya from '../assets/partners/p4l-partners/bat-arabia.png';
import Comtel from '../assets/partners/p4l-partners/comtel.png';
import Ensure from '../assets/partners/p4l-partners/ensure.png';
import Fixsquad from '../assets/partners/p4l-partners/fixsquad.png';
import FPPRLogo from '../assets/partners/p4l-partners/FPPR_logo.png';
import HarmanHouse from '../assets/partners/p4l-partners/harman-house.png';
import Ifix from '../assets/partners/p4l-partners/Ifix.png';
import TechBayt from '../assets/partners/p4l-partners/techbayt_logo.png';

import P4LLogo from '../assets/img/p4l-logo.png';
// import StarRatings from 'react-star-ratings';
// import { useSelector } from 'react-redux';
// import DeviceBuyBox from '../components/DeviceBuyBox';
// import IdeaCard from '../assets/img/idea-icon.svg';
// import Filter from '../assets/img/Filter.svg';
// import FilterWhite from '../assets/dark-icons/Filter.svg';
// import ProductBgDots from '../assets/bg-img/product-bg-dots.svg';

const countries = ['AE', 'QA', 'OM', 'KW', 'US', 'BH', 'SA'];

const filterOption = ['High to low', 'Low to high', 'Other'];

const Backers = [
  {
    image: AXA,
    alt: 'Axa',
  },
  {
    image: Arch,
    alt: 'Arch',
  },
  {
    image: SwissRe,
    alt: 'SwissRe',
  },
];

const partners = [
  {
    image: Axiom,
    alt: 'Axiom',
  },
  {
    image: BatArabiya,
    alt: 'BatArabiya',
  },
  {
    image: Comtel,
    alt: 'Comtel',
  },
  {
    image: Ensure,
    alt: 'Ensure',
  },
  {
    image: Fixsquad,
    alt: 'Fixsquad',
  },
  {
    image: FPPRLogo,
    alt: 'FPPRLogo',
  },
  {
    image: HarmanHouse,
    alt: 'HarmanHouse',
  },
  {
    image: Ifix,
    alt: 'Ifix',
  },
  {
    image: TechBayt,
    alt: 'TechBayt',
  },
];

const DeviceTypeArr = [
  {
    image: MobileIcon,
    title: 'Mobile Phone',
  },
  {
    image: LaptopIcon,
    title: 'Laptop',
  },
  {
    image: TabletIcon,
    title: 'Tablet',
  },
  {
    image: HeadPhoneIcon,
    title: 'Accessories',
  },
];

const includedItems = [
  {
    image: PickupIcon,
    title: 'Free Pick Up & Drop Off',
  },
  {
    image: QuickStepIcon,
    title: '3 quick steps (2 minutes) to protect your device',
  },
  {
    image: UpgradIcon,
    title: 'Upgrade, Downgrade & Cancel anytime',
  },
  {
    image: OnlineClaimsIcon,
    title: 'Hassle-free online claims',
  },
];

const DeviceProtection = [
  {
    image: CrackedScreeIcon,
    title: 'Cracked Screen',
    price: '215 $',
  },
  {
    image: TouchScreenIcon,
    title: 'Touchscreen Malfunction',
    price: '400 $',
  },
  {
    image: LiquidDamageIcon,
    title: 'Liquid Damage',
    price: '400 $',
  },
  {
    image: TheftIcon,
    title: 'Theft',
    price: 'Full Device Value',
  },
];

const p4lTable = [
  {
    firstCol: 'Monthly Plans',
    secondCol:
      '<div><b >YES</b> <br /> Starting from <b>USD 1</b>/Month & <b>USD 11</b>/Year</div>',
    thirdCol: '<div><b >No</b> <br /> <b>USD 136 </b> to <b>USD 218</b></div>',
    forthCol: '<div><b >No</b> <br /> <b>USD 24 </b> to <b>USD 136</b></div>',
    fifthCol: '<div><b >No</b> <br /> <b>10% - 12%</b> of device cost</div>',
  },
  {
    firstCol: 'Protect any Phone – Old or New',
    secondCol: '<div> <b >YES</b> <br /> Devices upto<b>12 months</b> old </div>',
    thirdCol: '<div> <b >No</b> <br /> Devices up to <b>60</b> days old</div>',
    forthCol: '<div> <b >No</b> <br /> Devices up to <b>30</b> days old</div>',
    fifthCol: '<div> <b >No</b> <br /> Only when buying new device</div>',
  },
  {
    firstCol: 'Pick Up & Drop Off',
    secondCol: '<div> <b >YES</b> <br />(and FREE)</div>',
    thirdCol: '<div> <b >No</b></div>',
    forthCol: '<div> <b >No</b></div>',
    fifthCol: '<div> <b >No</b></div>',
  },
  {
    firstCol: 'Accidental Damage Claims	',
    secondCol: '<div>Up to 2 per year</div>',
    thirdCol: '<div>Up to 2 per year</div>',
    forthCol: '<div>1 per year</div>',
    fifthCol: '<div>1 per year</div>',
  },
  {
    firstCol: 'Device Theft Coverage',
    secondCol: '<div> <b >YES</b></div>',
    thirdCol: '<div> <b >No</b></div>',
    forthCol: '<div> <b >No</b></div>',
    fifthCol: '<div> <b >No</b></div>',
  },
  {
    firstCol: 'Protection for all Brands with one Account',
    secondCol: '<div> <b >YES</b> Any brand, any make-just add it to your plan</div>',
    thirdCol: '<div> <b >No</b></div>',
    forthCol: '<div> <b >No</b></div>',
    fifthCol: '<div> <b >No</b></div>',
  },
  {
    firstCol: 'Deductible per Accidental Damage Claim',
    secondCol: '<div><b>USD 15 </b> to <b>USD 55</b></div>',
    thirdCol: '<div><b>USD 25 </b> to <b>USD 95</b></div>',
    forthCol: '<div><b>USD 20 </b> to <b>USD 50</b></div>',
    fifthCol: '<div>Min <b>USD 25 </b> to <b>USD 10%</b> of invoice value</div>',
  },
  {
    firstCol: 'Protection for Device bought anywhere in the world',
    secondCol: '<div><b>Yes</b></div>',
    thirdCol: '<div><b>No</b></div>',
    forthCol: '<div><b>No</b></div>',
    fifthCol: '<div><b>No</b></div>',
  },
  {
    firstCol: 'Protection for Device bought from e-Commerce stores',
    secondCol: '<div><b>Yes</b></div>',
    thirdCol: '<div><b>No</b></div>',
    forthCol: '<div><b>No</b></div>',
    fifthCol: '<div><b>No</b></div>',
  },
  {
    firstCol: 'Wide Network of Authorized Service Centers',
    secondCol: '<div><b>Yes</b></div>',
    thirdCol: '<div><b>No</b></div>',
    forthCol: '<div><b>No</b></div>',
    fifthCol: '<div><b>No</b></div>',
  },
  {
    firstCol: 'Plan Cancellation',
    secondCol: '<div>Anytime - No Deductions</div>',
    thirdCol: '<div>Anytime - Deductions Applied</div>',
    forthCol: '<div>Within 30 days of plan purchase</div>',
    fifthCol: '<div>Within 7 days of plan purchase</div>',
  },
];

const InsuranceProduct = (props) => {
  const [table, setTable] = useState(p4lTable);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const t = p4lTable.slice(0, 4);
    setTable(t);
  }, []);

  useEffect(() => {
    if (showMore) {
      setTable(p4lTable);
    } else {
      const t = p4lTable.slice(0, 4);
      setTable(t);
    }
  }, [showMore]);

  return (
    <>
      <div className="xl:px-32 lg:px-26">
        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white">
          We protect what you love
        </h2>
        <div className="mt-5 font-Inter text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text text-center">
          Protection benefits provided across a wide range of product categories
        </div>

        <div className="flex justify-center items-center md:mt-10 mt-8">
          <div className="grid grid-cols-12 md:gap-6 gap-4">
            {DeviceTypeArr.map((item) => (
              <div
                key={uniqid()}
                className="animation-wrapper w-full shadow-md rounded-xl flex flex-col items-center bg-white md:px-8 px-5 py-6 dark:bg-featureCard-dark-bg sm:col-span-1 md:col-span-3 col-span-6"
              >
                <div className="md:h-24 md:w-24 h-12 w-12 flex justify-center items-center">
                  <img src={item.image} alt="" className="h-full" />
                </div>
                <div className="mt-3 font-Montserrat font-semibold md:text-body-md text-body-sm dark:text-white text-center">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white md:mt-16 mt-12">
          All our plans include
        </h2>

        <div className="flex justify-center items-center mt-4">
          <div className="grid grid-cols-12 md:gap-4 gap-0">
            {includedItems.map((item) => (
              <div
                key={uniqid()}
                className="animation-wrapper md:col-span-3 col-span-6 p-4 flex flex-col items-center"
              >
                <div>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="mt-3 font-Montserrat font-semibold md:text-h6 text-body-sm text-dark-blue dark:text-white text-center">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white md:mt-16 mt-12">
          We protect what you love
        </h2>

        <div className="flex flex-col md:mt-10 mt-8">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="p-3 device-table-cell text-xs md:text-h6 font-semibold text-dark-blue uppercase tracking-wider text-center"
                      >
                        {' '}
                      </th>
                      <th
                        scope="col"
                        className="p-3 device-table-cell text-xs md:text-h6 font-semibold text-dark-blue uppercase tracking-wider flex justify-center"
                      >
                        <img src={P4LLogo} alt="" title="P4L" />
                      </th>
                      <th
                        scope="col"
                        className="p-3 device-table-cell text-xs md:text-h6 font-semibold text-dark-blue uppercase tracking-wider text-center"
                      >
                        Apple Care +
                      </th>
                      <th
                        scope="col"
                        className="p-3 device-table-cell text-xs md:text-h6 font-semibold text-dark-blue uppercase tracking-wider text-center"
                      >
                        Samsung Care +
                      </th>
                      <th
                        scope="col"
                        className="p-3 device-table-cell text-xs md:text-h6 font-semibold text-dark-blue uppercase tracking-wider text-center"
                      >
                        Others
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map(({ firstCol, secondCol, thirdCol, forthCol, fifthCol }, index) => (
                      <tr key={uniqid()} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                        <td className="p-3 device-table-cell text-body-sm text-gray-900 font-Montserrat font-semibold">
                          {firstCol}
                        </td>
                        <td className="p-3 device-table-cell text-xs font-Montserrat text-gray-600 text-center box-border">
                          <Markup content={secondCol} />
                        </td>
                        <td className="p-3 device-table-cell text-xs font-Montserrat text-gray-600 text-center box-border">
                          <Markup content={thirdCol} />
                        </td>
                        <td className="p-3 device-table-cell text-xs font-Montserrat text-gray-600 text-center box-border">
                          <Markup content={forthCol} />
                        </td>
                        <td className="p-3 device-table-cell text-xs font-Montserrat text-gray-600 text-center box-border">
                          <Markup content={fifthCol} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="font-Montserrat font-semibold font-h5 dark:text-white text-dark-blue px-2 py-2 flex items-center"
          >
            {!showMore ? (
              <>
                <span>Show More</span>
                <div className="font-bold text-white bg-light-green h-5 w-5 rounded-full flex justify-center items-center ml-3">
                  +
                </div>
              </>
            ) : (
              <>
                <span>Show Less</span>
                <div className="font-bold text-white bg-red-500 h-5 w-5 rounded-full flex justify-center items-center ml-3">
                  -
                </div>
              </>
            )}
          </button>
        </div>

        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white md:mt-16 mt-12">
          Why Get Device Protection?
        </h2>
        <div className="mt-5 font-Inter text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text text-center">
          Accidental Damage can be costly
        </div>

        <div className="flex justify-center items-center mt-4">
          <div className="grid grid-cols-12 md:gap-4 gap-2">
            {DeviceProtection.map((item) => (
              <div
                key={uniqid()}
                className="animation-wrapper md:col-span-3 col-span-6 p-4 flex flex-col items-center"
              >
                <div>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="mt-3 font-Montserrat font-semibold md:text-h6 text-body-md text-dark-blue dark:text-white text-center">
                  {item.title}
                </div>
                <div className="mt-1 font-Montserrat font-semibold md:text-h5 text-body-sm text-light-green text-center">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-dark-blue font-Inter mt-4 dark:text-white text-body-md md:text-h6">
          (Average Cost of Repair)
        </div>

        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white md:mt-16 mt-12">
          Device Protection Backed By Industry Leaders
        </h2>

        <div className="flex justify-center items-center md:mt-10 mt-8 text-center">
          {Backers.map(({ image, alt }) => (
            <div
              key={uniqid()}
              className="animation-wrapper md:w-40 w-32 inline-flex justify-content-center md:mx-5 mx-2 rounded-xl bg-white shadow-md"
            >
              <img className="w-full rounded-xl" src={image} alt={alt} />
            </div>
          ))}
        </div>

        <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white md:mt-16 mt-12">
          Wide Network Of Service Partners
        </h2>

        <div className="flex justify-center items-center md:mt-10 mt-8">
          <div className="text-center">
            {partners.map(({ image, alt }) => (
              <div
                key={uniqid()}
                className="animation-wrapper md:w-40 w-20 inline-flex justify-content-center md:mx-4 mx-1 md:my-3 my-1 rounded-xl bg-white shadow-md"
              >
                <img className="w-full rounded-xl" src={image} alt={alt} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold text-center dark:text-white md:mt-16 mt-12">
        It’s easy to get started - 3 easy steps, 2 mins max!
      </h2>
      <div className="flex justify-center items-center mt-8">
        <Modal
          title="Country of Residence"
          sizeClass="max-w-2xl"
          renderComponent={CountrySelector}
          bgImg="bg-loginPopupBg bg-cover"
        >
          <button
            type="button"
            className="py-3 px-5 cursor-pointer outline-none border-0 bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 rounded-xl text-white font-Montserrat font-semibold text-body-md shadow-buyInsurance"
          >
            Get Protection
          </button>
        </Modal>
      </div>
    </>
  );
};

export default InsuranceProduct;
