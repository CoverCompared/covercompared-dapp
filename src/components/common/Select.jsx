import { Fragment, useState, useContext } from 'react';
import uniqid from 'uniqid';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { classNames } from '../../functions/utils';
import { ThemeContext } from '../../themeContext';

export default function Select({ fieldTitle, options, selectedOption, setSelectedOption }) {
  const { theme } = useContext(ThemeContext);
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="flex justify-between items-center relative w-full h-14 bg-white dark:bg-featureCard-dark-bg rounded-md shadow-lg pl-4 pr-2 py-2 text-left cursor-pointer focus:outline-none focus:ring-0 sm:text-sm">
              <Listbox.Label className="flex items-center text-body-md font-Montserrat font-semibold text-dark-blue dark:text-white">
                {fieldTitle}
              </Listbox.Label>
              {!selectedOption ? (
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronUpIcon
                    className="h-6 w-7 text-dark-blue dark:text-white"
                    aria-hidden="true"
                  />
                </span>
              ) : (
                <span className="flex items-center justify-center border rounded-xl p-2 min-w-32 dark:bg-crypto-selected-dark-option">
                  {!!selectedOption?.icon && (
                    <img
                      src={selectedOption.icon}
                      alt=""
                      className="mr-2 flex-shrink-0 h-6 rounded-sm"
                    />
                  )}
                  <span className="block text-dark-blue dark:text-white font-medium font-Montserrat text-h6">
                    {selectedOption.option}
                  </span>
                </span>
              )}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-20 mt-1 w-full bg-white dark:bg-featureCard-dark-bg shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((item) => (
                  <Listbox.Option
                    key={item.option}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-buy-button-gd-1' : 'text-dark-blue',
                        'cursor-default select-none relative py-2 pl-3 pr-9 dark:text-white font-semibold font-Montserrat text-body-md',
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
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
                              'ml-3 block truncate  font-semibold font-Montserrat text-body-md',
                            )}
                          >
                            {item.option}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-gd-bg-buy-button-gd-1',
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
