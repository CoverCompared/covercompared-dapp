import { Fragment, useState, useContext } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpIcon } from '@heroicons/react/solid';

import { classNames } from '../../functions/utils';
import { ThemeContext } from '../../themeContext';

export default function Select({
  fieldTitle,
  options,
  selectedOption,
  setSelectedOption,
  fieldIcon,
  negativeLeft,
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="flex justify-between items-center relative w-full text-left focus:outline-none focus:ring-0 sm:text-sm">
              <Listbox.Label className="flex items-center text-body-md font-Montserrat font-semibold text-dark-blue dark:text-white cursor-pointer">
                <img loading="lazy" src={fieldIcon} alt="sort by" />
                <div className="font-Montserrat font-semibold text-body-md ml-1 text-short-review-text dark:text-white">
                  {!selectedOption ? fieldTitle : selectedOption?.option || selectedOption}
                </div>
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
                        'text-dark-blue cursor-default select-none relative py-2 pl-3 pr-9 font-semibold font-Montserrat text-body-md',
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
                            {item?.option || item}
                          </span>
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
