import { Fragment, useState, useContext } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpIcon } from '@heroicons/react/solid';

import { classNames } from '../../functions/utils';
import { ThemeContext } from '../../themeContext';

import DownArrow from '../../assets/img/Arrow-Down.svg';
import DownArrowWhite from '../../assets/dark-icons/Arrow-Down.svg';

export default function CurrencySelect({
  fieldTitle,
  options,
  selectedOption,
  setSelectedOption,
  negativeLeft,
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <div className="mt-1 relative rounded-xl border border-gray-300 p-1">
            <Listbox.Button className="flex justify-between items-center relative w-full text-left focus:outline-none focus:ring-0 sm:text-sm">
              <Listbox.Label className="flex items-center text-body-md font-medium font-semibold text-dark-blue dark:text-white cursor-pointer">
                <div className="font-medium font-semibold text-body-md text-short-review-text dark:text-white">
                  Currency
                </div>
              </Listbox.Label>
              <Listbox.Label className="flex items-center text-body-md font-medium font-semibold text-dark-blue dark:text-white cursor-pointer">
                <div className="font-medium font-semibold text-body-md text-short-review-text dark:text-white">
                  {!selectedOption ? fieldTitle : selectedOption?.option || selectedOption}
                </div>
                <img
                  src={theme === 'light' ? DownArrow : DownArrowWhite}
                  alt="Down Arrow"
                  className={classNames(setSelectedOption ? '' : 'opacity-0', ' ml-1')}
                />
              </Listbox.Label>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={classNames(
                  negativeLeft ? '-left-14' : '',
                  'absolute z-20 mt-2 w-full min-w-max bg-white dark:bg-featureCard-dark-bg shadow-lg max-h-56 rounded-md py-0 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
                )}
              >
                {options.map((item) => (
                  <Listbox.Option
                    key={item?.option || item}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-gray-100' : 'dark:text-white',
                        'text-dark-blue cursor-default select-none relative py-2 pl-3 pr-9 font-semibold font-medium text-body-md',
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center justify-between">
                          {!!item?.icon && (
                            <img
                              src={item.icon}
                              alt=""
                              className="mr-2 flex-shrink-0 h-8 rounded-sm"
                            />
                          )}
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate  font-semibold font-medium text-body-md',
                            )}
                          >
                            {item?.option || item}
                          </span>
                          {(item?.option || item) === 'CVR' && (
                            <span className="font-Medium font-medium text-body-3xs text-discount-text h-full px-3">
                              Use CVR to get 25% discount
                            </span>
                          )}
                        </div>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? '' : 'dark:text-white',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
