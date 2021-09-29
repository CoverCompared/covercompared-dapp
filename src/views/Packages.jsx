import React, { useState, useContext } from 'react';
import uniqid from 'uniqid';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

import PackageCard from '../components/common/PackageCard';
import SmallPackageCard from '../components/common/SmallPackageCard';
import { classNames } from '../functions/utils';
import ChangeViewIcon from '../assets/img/view-change-icon.svg';
import ChangeViewIconWhite from '../assets/dark-icons/view-change-icon.svg';
import SearchBar from '../components/common/SearchBar';
import { ThemeContext } from '../themeContext';

const PackagesArr = [
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    providerName: 'Provider Name',
    startingPrice: '300',
    discount: '30',
  },
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    providerName: 'Provider Name',
    startingPrice: '100',
    discount: '20',
  },
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    providerName: 'Provider Name',
    startingPrice: '500',
    discount: '',
  },
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    providerName: 'Provider Name',
    startingPrice: '600',
    discount: '',
  },
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    ProviderName: 'Provider Name',
    startingPrice: '50',
    discount: '10',
  },
];

const BuyInsuranceArr = [
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    ProviderName: 'Provider Name 1',
    priceRange: '0-500',
    startPrice: '300',
    discount: '10',
  },
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    ProviderName: 'Provider Name 2',
    priceRange: '0-100',
    startPrice: '300',
    discount: '10',
  },
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    ProviderName: 'Provider Name 2',
    priceRange: '0-100',
    startPrice: '300',
    discount: '10',
  },
];

const FilterSection = ({ title }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Disclosure
      as="div"
      key={uniqid()}
      className="rounded-xl shadow-lg mt-5 px-5 py-3 bg-white dark:bg-featureCard-dark-bg"
    >
      {({ open }) => (
        <>
          <div className="text-lg">
            <Disclosure.Button className="text-left w-full flex items-center">
              <span className="mr-3 text-dark-blue-1">
                <ChevronDownIcon
                  className={classNames(
                    open ? '-rotate-0' : '-rotate-90',
                    'h-4 w-4 transform dark:text-white',
                  )}
                  aria-hidden="true"
                />
              </span>
              <span className="font-Montserrat font-semibold text-dark-blue-1 text-body-sm dark:text-white">
                {title}
              </span>
            </Disclosure.Button>
          </div>
          <Disclosure.Panel as="div" className="mt-2 flex flex-col">
            <div className="flex items-center mb-2">
              <input
                id="sample"
                name="sample"
                type="radio"
                className="focus:ring-dark-blue h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
              />
              <label
                htmlFor="push-nothing"
                className="ml-3 block text-body-sm font-Montserrat font-medium text-dark-blue-1 dark:text-white "
              >
                sample filter 1
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="sample"
                name="sample"
                type="radio"
                className="focus:ring-dark-blue h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
              />
              <label
                htmlFor="push-nothing"
                className="ml-3 block text-body-sm font-Montserrat font-medium text-dark-blue-1 dark:text-white"
              >
                sample filter 1
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="sample"
                name="sample"
                type="radio"
                className="focus:ring-dark-blue h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
              />
              <label
                htmlFor="push-nothing"
                className="ml-3 block text-body-sm font-Montserrat font-medium text-dark-blue-1 dark:text-white"
              >
                sample filter 1
              </label>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const Packages = (props) => {
  const [showProducts, setShowProducts] = useState(false);
  const [changeView, setChangeView] = useState(false);
  const [search, setSearch] = useState('');
  const { theme } = useContext(ThemeContext);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
  };

  return (
    <>
      <div className="md:px-16">
        <div className="font-Montserrat md:text-heading text-h4 font-semibold text-dark-blue text-center pb-6 dark:text-white">
          Search by address/protocol name
        </div>
        <div className="md:px-40 mb-7">
          <SearchBar {...props} {...{ search, setSearch, handleSearch }} />
        </div>

        <div className="grid grid-cols-12 gap-x-20 md:px-12">
          <div className="md:col-span-3 col-span-0 hidden md:block">
            <div className="flex flex-col">
              <div className="font-Montserrat text-body-md font-semibold text-dark-blue dark:text-white">
                Filter
              </div>
              <FilterSection {...props} title="Duration" />
              <FilterSection {...props} title="Cost" />
              <FilterSection {...props} title="Provider" />
              <FilterSection {...props} title="Rating" />
            </div>
          </div>
          <div className="md:col-span-9 col-span-12">
            <div className="flex justify-between items-center mb-7 pr-2">
              <div className="font-Montserrat text-body-md font-semibold text-dark-blue dark:text-white">
                Choose your Package
              </div>
              <div onClick={() => setChangeView(!changeView)} className="cursor-pointer">
                <img
                  src={theme === 'light' ? ChangeViewIcon : ChangeViewIconWhite}
                  alt="Change View"
                  className="h-6"
                />
              </div>
            </div>

            {!changeView ? (
              PackagesArr.map((obj) => <PackageCard key={uniqid()} {...obj} {...props} />)
            ) : (
              <div className="grid grid-cols-12 md:grid-col-6 lg:grid-cols-12 xl:grid-col-12 gap-y-4 md:gap-4 lg:gap-x-6 lg:gap-y-4 w-full">
                {PackagesArr.map((obj) => (
                  <SmallPackageCard key={uniqid()} {...obj} {...props} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Packages;
