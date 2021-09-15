import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { RefreshIcon, XIcon } from '@heroicons/react/outline';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import { searchCoverList, searchMSOList } from '../redux/actions/CoverList';
import { toggleFilters } from '../redux/actions/AppActions';
import { classNames } from '../functions/utils';
import 'rc-slider/assets/index.css';

const RangeSlider = createSliderWithTooltip(Range);

const options = {
  duration_days_option: {
    min: '15',
    max: 365,
  },
  MSO_amout_opt: {
    min: 50,
    max: 115,
  },
  amount_option: {
    min: 1,
    max: 20000,
  },
  companies_option: [
    {
      name: 'Nsure.Network',
      code: 'nsure',
    },
    {
      name: 'Nexus Mutual',
      code: 'nexus',
    },
    {
      name: 'InsurAce',
      code: 'insurace',
    },
  ],
  type_option: ['protocol', 'custodian', 'token'],
  supported_chain_option: [
    'Ethereum',
    'BSC',
    'Polygon',
    'starkware',
    'fantom',
    'xdai',
    'optimism',
    'Terra',
    'thorchain',
    'CEX',
    'Fantom',
    'HECO',
    'xDai',
    'Solana',
  ],
  currency_option: ['ETH', 'DAI', 'USDC', 'USDT', 'MATIC', 'BNB', 'BUSD-T', 'BUSD'],
  mso_plan_type_opt: ['Single cover', 'Family cover'],
  mso_add_on_service: ['Add on Conierge services'],
  EHR: ['EHR & Portal'],
};

const MultiRangeSlider = ({
  value,
  setValue,
  title,
  optionsKey,
  defaultOpen = true,
  showSeparator = true,
}) => {
  const [tempValue, setTempValue] = useState(value);
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(tempValue)) setTempValue(value);
  }, [value]);

  return (
    <Disclosure as="div" defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <div className={classNames(showSeparator ? 'border-b' : 'border-0', 'px-5 py-3')}>
            <div className="text-lg text-left w-full flex items-center">
              <Disclosure.Button className="w-full flex items-center justify-between">
                <span className="font-Montserrat font-semibold text-dark-blue-1 text-body-sm dark:text-white">
                  {title}
                </span>
                <span className="flex items-center text-black dark:text-white">
                  {open ? (
                    <MinusSmIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <PlusSmIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel>
              <div className="mt-2 mb-6 px-1.5 flex flex-col">
                <RangeSlider
                  allowCross={false}
                  min={+options[optionsKey].min}
                  max={+options[optionsKey].max}
                  value={tempValue}
                  onChange={setTempValue}
                  onAfterChange={setValue}
                  marks={{
                    [+options[optionsKey].min]: +options[optionsKey].min,
                    [+options[optionsKey].max]: +options[optionsKey].max,
                  }}
                  tipFormatter={(value) => `${value}`}
                />
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};

const RangeSliderWithMarks = ({
  value,
  setValue,
  title,
  marks,
  defaultOpen = true,
  showSeparator = true,
}) => {
  const [tempValue, setTempValue] = useState(value);
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(tempValue)) setTempValue(value);
  }, [value]);
  const MSO_user_Opt = { 0: 1, 33: 4, 66: 6, 100: 'unlimited' };
  return (
    <Disclosure as="div" defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <div className={classNames(showSeparator ? 'border-b' : 'border-0', 'px-5 py-3')}>
            <div className="text-lg text-left w-full flex items-center">
              <Disclosure.Button className="w-full flex items-center justify-between">
                <span className="font-Montserrat font-semibold text-dark-blue-1 text-body-sm dark:text-white">
                  {title}
                </span>
                <span className="flex items-center text-black dark:text-white">
                  {open ? (
                    <MinusSmIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <PlusSmIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel>
              <div className="mt-2 mb-6 px-1.5 flex flex-col">
                <Slider
                  min={1}
                  defaultValue={1}
                  marks={MSO_user_Opt}
                  step={null}
                  onChange={setTempValue}
                  onAfterChange={setValue}
                  included={false}
                />
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};

const MultiCheckObjectFilter = ({
  value,
  setValue,
  title,
  optionsKey,
  defaultOpen = true,
  showSeparator = true,
}) => {
  return (
    <Disclosure as="div" defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <div className={classNames(showSeparator ? 'border-b' : 'border-0', 'px-5 py-3')}>
            <div className="text-lg text-left w-full flex items-center">
              <Disclosure.Button className="w-full flex items-center justify-between">
                <span className="font-Montserrat font-semibold text-dark-blue-1 text-body-sm dark:text-white">
                  {title}
                </span>
                <span className="flex items-center text-black dark:text-white">
                  {open ? (
                    <MinusSmIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <PlusSmIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel>
              <div className="mt-2 flex flex-col">
                {options[optionsKey].map((m) => (
                  <div key={uniqueId()} className="flex items-center mb-2">
                    <label className="text-body-sm font-Montserrat font-medium text-dark-blue-1 dark:text-white ">
                      <input
                        id={m.code}
                        name={m.code}
                        type="checkbox"
                        value={m.code}
                        checked={value.includes(m.code)}
                        onChange={() =>
                          setValue((c) =>
                            c.includes(m.code) ? c.filter((f) => f !== m.code) : [...c, m.code],
                          )
                        }
                        className="mr-3 focus:ring-0 h-4 w-4 text-dark-blue-1 dark:text-primary-gd-1 border-gray-300 border-2"
                      />
                      {m.name}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};

const MultiCheckValueFilter = ({
  value,
  setValue,
  title,
  optionsKey,
  defaultOpen = true,
  showSeparator = true,
}) => {
  return (
    <Disclosure as="div" defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <div className={classNames(showSeparator ? 'border-b' : 'border-0', 'px-5 py-3')}>
            <div className="text-lg text-left w-full flex items-center">
              <Disclosure.Button className="w-full flex items-center justify-between">
                <span className="font-Montserrat font-semibold text-dark-blue-1 text-body-sm dark:text-white">
                  {title}
                </span>
                <span className="flex items-center text-black dark:text-white">
                  {open ? (
                    <MinusSmIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <PlusSmIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel>
              <div className="mt-2 flex flex-col">
                {options[optionsKey].map((m) => (
                  <div key={uniqueId()} className="flex items-center mb-2">
                    <label className="text-body-sm font-Montserrat font-medium text-dark-blue-1 dark:text-white ">
                      <input
                        id={m}
                        name={m}
                        type="checkbox"
                        value={m}
                        checked={value.includes(m)}
                        onChange={() =>
                          setValue((c) => (c.includes(m) ? c.filter((f) => f !== m) : [...c, m]))
                        }
                        className="mr-3 focus:ring-0 h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
                      />
                      {m}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};

const FiltersSection = (props) => {
  const { search, type, card, filtersOpen } = props;

  const filtersDialogRef = useRef(null);
  const [duration, setDuration] = useState([
    +options.duration_days_option.min,
    +options.duration_days_option.max,
  ]);
  const [amount, setAmount] = useState([+options.amount_option.min, +options.amount_option.max]);
  const [company, setCompany] = useState([]);
  const [currencyOption, setCurrencyOption] = useState([]);
  const [chianOption, setChianOption] = useState([]);
  const [msoUser, setMsoUser] = useState([]);
  const [msoPlanTypeOpt, setMsoPlanTypeOpt] = useState([]);
  const [wantAddOn, setWantAddOn] = useState([]);
  const [wantEHR, setwantEHR] = useState([]);
  const [msoAmount, setMsoAmount] = useState([
    +options.MSO_amout_opt.min,
    +options.MSO_amout_opt.max,
  ]);

  useEffect(() => {
    if (card !== 'smart-contract' && card !== 'crypto-exchange') return;

    let query = `?search=${search}&?type=${type}`;

    if (duration.length) query += `&duration=${duration.join(',')}`;
    if (amount.length) query += `&amount=${amount.join(',')}`;
    if (company.length) query += `&company=${company.join(',')}`;
    if (currencyOption.length) query += `&currency=${currencyOption.join(',')}`;
    if (chianOption.length) query += `&supported_chain=${chianOption.join(',')}`;

    props.searchCoverList(query);
  }, [duration, amount, company, currencyOption, chianOption]);

  useEffect(() => {
    if (card !== 'mso') return;

    let query = `?search=${search}`;

    if (msoPlanTypeOpt.length) query += `&plan_type=${msoPlanTypeOpt.join(',')}`;
    if (wantAddOn.length) query += `&add_on_service=1`;
    if (wantEHR.length) query += `&ehr=1`;
    if (msoAmount.length) query += `&amount_min=${msoAmount[0]}`;
    if (msoAmount.length) query += `&amount_max=${msoAmount[1]}`;

    props.searchMSOList(query);
  }, [msoPlanTypeOpt, wantAddOn, msoAmount, wantEHR]);

  const handleResetFilter = () => {
    if (card === 'smart-contract' || card === 'crypto-exchange') {
      const query = `?search=${search}&?type=${type}`;

      setDuration([+options.duration_days_option.min, +options.duration_days_option.max]);
      setAmount([+options.amount_option.min, +options.amount_option.max]);
      setCompany([]);
      setCurrencyOption([]);
      setChianOption([]);

      return props.searchCoverList(query);
    }

    if (card === 'mso') {
      const query = `?search=${search}`;

      setMsoAmount([options.MSO_amout_opt.min, +options.MSO_amout_opt.max]);
      setMsoPlanTypeOpt([]);
      setWantAddOn([]);
      setWantAddOn([]);
      setwantEHR([]);

      return props.searchMSOList(query);
    }
    return null;
  };

  const renderFilterFields = () => {
    return (
      <>
        {(card === 'smart-contract' || card === 'crypto-exchange') && (
          <>
            {!!options.duration_days_option && (
              <MultiRangeSlider
                {...{
                  title: 'Duration',
                  optionsKey: 'duration_days_option',
                  value: duration,
                  setValue: setDuration,
                }}
              />
            )}
            {!!options.amount_option && (
              <MultiRangeSlider
                {...{
                  title: 'Amount',
                  optionsKey: 'amount_option',
                  value: amount,
                  setValue: setAmount,
                }}
              />
            )}
            {!!options.companies_option && (
              <MultiCheckObjectFilter
                {...{
                  title: 'Company',
                  optionsKey: 'companies_option',
                  value: company,
                  setValue: setCompany,
                }}
              />
            )}
            {!!options.currency_option && (
              <MultiCheckValueFilter
                {...{
                  title: 'Currency',
                  optionsKey: 'currency_option',
                  value: currencyOption,
                  setValue: setCurrencyOption,
                }}
              />
            )}
            {!!options.supported_chain_option && (
              <MultiCheckValueFilter
                {...{
                  title: 'Supported Chain',
                  optionsKey: 'supported_chain_option',
                  value: chianOption,
                  setValue: setChianOption,
                  defaultOpen: false,
                  showSeparator: false,
                }}
              />
            )}
          </>
        )}

        {card === 'mso' && (
          <>
            {!!options.MSO_amout_opt && (
              <MultiRangeSlider
                {...{
                  title: 'Amount',
                  optionsKey: 'MSO_amout_opt',
                  value: msoAmount,
                  setValue: setMsoAmount,
                }}
              />
            )}
            <RangeSliderWithMarks
              {...{
                title: 'User',
                optionsKey: 'MSO_user_Opt',
                value: msoUser,
                setValue: setMsoUser,
              }}
            />
            {!!options.mso_plan_type_opt && (
              <MultiCheckValueFilter
                {...{
                  title: 'EHR & Portal',
                  optionsKey: 'EHR',
                  value: wantEHR,
                  setValue: setwantEHR,
                }}
              />
            )}
            {!!options.mso_plan_type_opt && (
              <MultiCheckValueFilter
                {...{
                  title: 'Plan type',
                  optionsKey: 'mso_plan_type_opt',
                  value: msoPlanTypeOpt,
                  setValue: setMsoPlanTypeOpt,
                }}
              />
            )}

            {!!options.mso_add_on_service && (
              <MultiCheckValueFilter
                {...{
                  title: 'Add on',
                  optionsKey: 'mso_add_on_service',
                  value: wantAddOn,
                  setValue: setWantAddOn,
                }}
              />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Transition.Root show={filtersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={() => {}}
          initialFocus={filtersDialogRef}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-white dark:bg-sidebar-dark-bg shadow-xl pt-4 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <div className="flex flex-row">
                  <button
                    type="button"
                    title="Reset filters"
                    onClick={handleResetFilter}
                    className="mr-4 focus:outline-none focus:ring-offset-0"
                  >
                    <RefreshIcon className="h-5 w-5 dark:text-white" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="focus:outline-none focus:ring-offset-0 flex items-center justify-center"
                    onClick={() => props.toggleFilters(false)}
                    ref={filtersDialogRef}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {renderFilterFields()}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="md:col-span-3 col-span-0 hidden lg:block">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4 pr-1">
            <div className="font-Montserrat text-body-md font-semibold text-dark-blue dark:text-white">
              Filters
            </div>
            <div>
              <button
                type="button"
                title="Reset filters"
                onClick={handleResetFilter}
                className="focus:outline-none focus:ring-offset-0"
              >
                <RefreshIcon className="h-5 w-5 dark:text-white" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="rounded-xl shadow-md bg-white dark:bg-featureCard-dark-bg">
            {renderFilterFields()}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ app }) => ({
  filtersOpen: app.filtersOpen,
});

export default connect(mapStateToProps, { searchCoverList, searchMSOList, toggleFilters })(
  FiltersSection,
);
