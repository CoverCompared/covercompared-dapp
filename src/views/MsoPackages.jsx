import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
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
import { searchCoverList } from '../redux/actions/CoverList';
import Loading from '../components/common/Loading';
import MSOPackageCard from '../components/MSOPackageCard';
import MSOSmallPackageCard from '../components/MSOSmallPackageCard';

const MsoProductsArr = [
  {
    InsurancePlanType: 'Medical Second Opinion (MSO)',
    MSOplanName: 'BASIC PLAN',
    MSOPrice: '$50',
    MSOAddOnService: '$15',
    MSOPlanType: 'Single cover',
    MSOPlanDuration: 'Annual Plan',
    MSOCoverUser: 'User - 1',
  },
  {
    InsurancePlanType: 'Medical Second Opinion (MSO)',
    MSOplanName: 'SILVER PLAN',
    MSOPrice: '$60',
    MSOAddOnService: '$20',
    MSOPlanType: 'Family cover',
    MSOPlanDuration: 'Annual Plan',
    MSOCoverUser: '2 plus 2: Husband, wife and 2 children',
  },
  {
    InsurancePlanType: 'Medical Second Opinion (MSO)',
    MSOplanName: 'GOLD PLAN',
    MSOPrice: '$70',
    MSOAddOnService: '$25',
    MSOPlanType: 'Family cover',
    MSOPlanDuration: 'Annual Plan',
    MSOCoverUser: '3 plus 3: Husband, two wives, and 3 children',
  },
  {
    InsurancePlanType: 'Medical Second Opinion (MSO)',
    MSOplanName: 'PLATINUM PLAN',
    MSOPrice: '$85',
    MSOAddOnService: '$30',
    MSOPlanType: 'Family cover',
    MSOPlanDuration: 'Annual Plan',
    MSOCoverUser: 'unlimited: Husband, all wives, all children, parents on husband& wives’ side',
  },
];

const FilterSection = ({ title, name, value, setValue }) => {
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
              <label className="text-body-sm font-Montserrat font-medium text-dark-blue-1 dark:text-white ">
                <input
                  id={name}
                  name={name}
                  type="radio"
                  value="option1"
                  checked={value === 'option1'}
                  onChange={() => setValue('option1')}
                  className="mr-3 focus:ring-gray-500 h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
                />
                sample filter 1
              </label>
            </div>
            <div className="flex items-center mb-2">
              <label className="text-body-sm font-Montserrat font-medium text-dark-blue-1 dark:text-white ">
                <input
                  id={name}
                  name={name}
                  type="radio"
                  value="option2"
                  checked={value === 'option2'}
                  onChange={() => setValue('option2')}
                  className="mr-3 focus:ring-gray-500 h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
                />
                sample filter 2
              </label>
            </div>
            <div className="flex items-center mb-2">
              <label className="text-body-sm font-Montserrat font-medium text-dark-blue-1 dark:text-white ">
                <input
                  id={name}
                  name={name}
                  type="radio"
                  value="option3"
                  checked={value === 'option3'}
                  onChange={() => setValue('option3')}
                  className="mr-3 focus:ring-gray-500 h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
                />
                sample filter 3
              </label>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const MsoPackages = (props) => {
  const dispatch = useDispatch();
  const coverListData = useSelector((state) => state.coverList);

  const { loader, coverList, query, message, isFailed } = coverListData;

  const urlSearchParams = new URLSearchParams(query || '');
  const params = Object.fromEntries(urlSearchParams.entries()) || {};

  const { theme } = useContext(ThemeContext);
  const [changeView, setChangeView] = useState(false);

  const [loading, setLoading] = useState(loader);
  const [search, setSearch] = useState(params?.search || '');
  const [filter1, setFilter1] = useState(params?.filter1 || '');
  const [filter2, setFilter2] = useState(params?.filter2 || '');
  const [filter3, setFilter3] = useState(params?.filter3 || '');
  const [filter4, setFilter4] = useState(params?.filter4 || '');
  const [products, setProducts] = useState(coverList?.list || []);

  useEffect(() => {
    setLoading(loader);
  }, [loader]);

  useEffect(() => {
    setProducts(coverList?.list);
  }, [coverList?.list]);

  useEffect(() => {
    dispatch(
      searchCoverList({
        searchString: search,
        query: `?search=${search}&filter1=${filter1}&filter2=${filter2}`,
      }),
    );
  }, [filter1, filter2]);

  useEffect(() => {
    const urlSearchParamsEffect = new URLSearchParams(query || '');
    const paramsEffect = Object.fromEntries(urlSearchParamsEffect.entries()) || {};
    if (filter1 !== paramsEffect?.filter1) setFilter1(paramsEffect?.filter1);
    if (filter2 !== paramsEffect?.filter2) setFilter2(paramsEffect?.filter2);
  }, [query]);

  const debounceSearch = useCallback(
    debounce(
      (text) =>
        dispatch(
          searchCoverList({
            searchString: text,
            query: `?search=${text}&filter1=${filter1}&filter2=${filter2}`,
          }),
        ),
      500,
    ),
    [],
  );

  const onSearchChange = (value) => {
    setSearch(value);
    debounceSearch(value);
  };

  const renderCards = () => {
    if (loading) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    }

    if (!search && !loading && !products?.length) {
      return <></>;
    }

    if (search && !loading && !products?.length) {
      return <div className="text-center">No results found</div>;
    }

    return !changeView ? (
      products.map((obj) => <PackageCard key={uniqid()} {...obj} {...props} />)
    ) : (
      <div className="grid grid-cols-12 md:grid-col-6 lg:grid-cols-12 xl:grid-col-12 gap-y-4 md:gap-4 lg:gap-x-6 lg:gap-y-4 w-full">
        {products.map((obj) => (
          <SmallPackageCard key={uniqid()} {...obj} {...props} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="md:px-16">
        <div className="font-Montserrat md:text-heading text-h4 font-semibold text-dark-blue text-center pb-6 dark:text-white">
          Search by address/protocol name
        </div>
        <div className="md:px-40 mb-7">
          <SearchBar {...props} {...{ search, setSearch: onSearchChange }} />
        </div>

        <div className="grid grid-cols-12 gap-x-20 md:px-12">
          {/* Filters sidebar start */}
          <div className="md:col-span-3 col-span-0 hidden md:block">
            <div className="flex flex-col">
              <div className="font-Montserrat text-body-md font-semibold text-dark-blue dark:text-white">
                Filter
              </div>
              <FilterSection
                {...props}
                {...{ name: filter1, title: 'Duration', value: filter1, setValue: setFilter1 }}
              />
              <FilterSection
                {...props}
                {...{ name: filter2, title: 'Cost', value: filter2, setValue: setFilter2 }}
              />
              <FilterSection
                {...props}
                {...{ name: filter2, title: 'Provider', value: filter3, setValue: setFilter3 }}
              />
              <FilterSection
                {...props}
                {...{ name: filter2, title: 'Rating', value: filter4, setValue: setFilter4 }}
              />
            </div>
          </div>
          {/* Filters sidebar end */}

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
              MsoProductsArr.map((obj) => <MSOPackageCard key={uniqid()} {...obj} {...props} />)
            ) : (
              <div className="grid grid-cols-12 md:grid-col-6 lg:grid-cols-12 xl:grid-col-12 gap-y-4 md:gap-4 lg:gap-x-6 lg:gap-y-4 w-full">
                {MsoProductsArr.map((obj) => (
                  <MSOSmallPackageCard key={uniqid()} {...obj} {...props} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MsoPackages;
