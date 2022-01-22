import React, { useState, useContext, useEffect, useRef } from 'react';
import uniqid from 'uniqid';
import _ from 'lodash';

import DownArrow from '../../assets/img/Arrow-Down.svg';
import DownArrowWhite from '../../assets/dark-icons/Arrow-Down.svg';
import { ThemeContext } from '../../themeContext';
import { classNames, getKeyByValue, isObject } from '../../functions/utils';
import Loading from './Loading';
import Search from '../../assets/icons/Search.svg';

const SelectWithSearch = ({
  loading,
  readOnly,
  autoFocus,
  showColumnLayout,
  fieldTitle,
  fieldSubtitle,
  fieldValue,
  setFieldValue,
  dropdownOptions,
  selectedOption,
  setSelectedOption,
  showSearchOption,
  optionsAsArrayOfObjects,
  labelKey,
  valueKey,
  placeholder = '',
  fieldType = 'text',
}) => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState(dropdownOptions);

  const searchOption = (searchValue, optionType) => {
    setSearchValue(searchValue);
    if (optionType === 'arr') {
      const filteredOptions = dropdownOptions.filter((option) => {
        if (typeof option === 'string') return option?.toLowerCase().includes(searchValue);
        return option?.[labelKey]?.toLowerCase()?.includes(searchValue);
      });
      setOptions(filteredOptions);
    } else if (optionType === 'obj') {
      const filteredOptions = _.flow([
        Object.entries,
        (arr) => arr.filter(([key, value]) => value.includes(searchValue)),
        Object.fromEntries,
      ])(dropdownOptions);
      setOptions(filteredOptions);
    }
  };

  useEffect(() => {
    if (dropdownOptions) {
      setOptions(dropdownOptions);
    }
  }, [dropdownOptions]);

  const optionRef = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (!optionRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <>
      <div
        className={classNames(
          showColumnLayout ? 'flex-col' : 'flex-row mb-3',
          'w-full relative flex justify-between py-3 px-4 bg-white rounded-xl dark:bg-product-input-bg-dark border border-gray-300',
        )}
        ref={optionRef}
      >
        <div className="text-dark-blue font-Montserrat font-semibold text-body-xs dark:text-white text-left">
          {fieldTitle}
        </div>
        <div className="flex-col flex items-end">
          {!showColumnLayout ? (
            <>
              <div className="font-Montserrat font-medium text-primary-gd-1 text-body-xs dark:text-white">
                {fieldSubtitle}
              </div>
              <div className="mt-1 flex items-center justify-end">
                {!loading ? (
                  <input
                    autoFocus={!!autoFocus}
                    readOnly={!!readOnly}
                    type={fieldType}
                    value={fieldValue}
                    placeholder={placeholder}
                    onChange={(e) => {
                      setFieldValue(e.target.value);
                    }}
                    className="h-5 pr-0 w-full text-right bg-transparent text-Montserrat text-body-lg text-dark-blue dark:text-white font-medium border-0 outline-none focus:border-0 focus:outline-none focus:ring-0"
                  />
                ) : (
                  <Loading widthClass="w-4" heightClass="h-4" />
                )}
                <div
                  className="flex relative h-5 items-center cursor-pointer ml-1"
                  style={{ minWidth: 'fit-content' }}
                  onClick={() => setSelectedOption && setIsOpen(!isOpen)}
                >
                  <div className="text-Montserrat text-body-lg text-dark-blue font-medium flex items-center dark:text-white">
                    {isObject(dropdownOptions)
                      ? dropdownOptions[selectedOption]
                      : optionsAsArrayOfObjects
                      ? dropdownOptions.find((f) => f[valueKey] === selectedOption)?.[labelKey] ||
                        ''
                      : selectedOption}{' '}
                    <img
                      src={theme === 'light' ? DownArrow : DownArrowWhite}
                      alt="Down Arrow"
                      className={classNames(setSelectedOption ? '' : 'opacity-0', ' ml-1')}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              className="w-full relative min-h-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="text-Montserrat w-full h-full text-body-lg text-dark-blue font-medium flex justify-end items-center dark:text-white">
                {isObject(dropdownOptions)
                  ? dropdownOptions[selectedOption]
                  : optionsAsArrayOfObjects
                  ? dropdownOptions.find((f) => f[valueKey] === selectedOption)?.[labelKey] || ''
                  : selectedOption}{' '}
                <img
                  src={theme === 'light' ? DownArrow : DownArrowWhite}
                  alt="Down Arrow"
                  className="ml-1"
                />
              </div>
            </div>
          )}
        </div>
        {isOpen && (
          <>
            {isObject(options) ? (
              <div className="absolute w-full left-0 rounded-xl z-20 top-16 shadow-md bg-white border-gray-300 border-2 dark:bg-product-input-bg-dark dark:border-white">
                {showSearchOption && (
                  <div className="relative border-b-2 rounded-t-xl">
                    <input
                      type="text"
                      value={searchValue}
                      placeholder="Search..."
                      onChange={(e) => searchOption(e.target.value, 'obj')}
                      className="pl-11 w-full h-11 bg-white dark:bg-product-input-bg-dark text-discount-apply-btn-text dark:text-white font-Montserrat font-semibold text-body-md border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0 outline-none rounded-t-xl"
                    />
                    <img loading="lazy" src={Search} alt="" className="absolute left-3 top-2.5" />
                    <span className="sr-only">Close</span>
                    {/* <XIcon
                      onClick={() => setIsOpen(false)}
                      className="h-5 text-dark-blue absolute right-3 top-3 cursor-pointer dark:text-white"
                      aria-hidden="true"
                    /> */}
                  </div>
                )}
                <div
                  className={classNames(
                    showSearchOption ? 'max-h-40 overflow-y-auto' : 'h-full',
                    'py-2 rounded-b-xl bg-white dark:bg-product-input-bg-dark',
                  )}
                >
                  {Object.values(options || {}).map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedOption(getKeyByValue(dropdownOptions, option));
                        setIsOpen(false);
                      }}
                      className="md:py-2 py-1 px-4 text-dark-blue dark:text-white dark:hover:text-dark-blue font-semibold md:text-body-md text-body-sm font-Montserrat hover:bg-login-button-bg cursor-pointer text-left"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="absolute w-full left-0 rounded-xl z-20 top-16 shadow-md bg-white border-gray-300 border-2 dark:bg-product-input-bg-dark dark:border-white">
                {showSearchOption && (
                  <div className="relative border-b-2 rounded-t-xl">
                    <input
                      autoFocus
                      type="text"
                      value={searchValue}
                      placeholder="Search..."
                      onChange={(e) => searchOption(e.target.value, 'arr')}
                      className="pl-11 w-full h-11 bg-white dark:bg-product-input-bg-dark text-discount-apply-btn-text dark:text-white font-Montserrat font-semibold text-body-md border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0 outline-none rounded-t-xl"
                    />
                    <img loading="lazy" src={Search} alt="" className="absolute left-3 top-3 h-5" />
                    <span className="sr-only">Close</span>
                    {/* <XIcon
                      onClick={() => setIsOpen(false)}
                      className="h-5 text-dark-blue absolute right-3 top-3 cursor-pointer dark:text-white"
                      aria-hidden="true"
                    /> */}
                  </div>
                )}
                <div
                  className={classNames(
                    showSearchOption ? 'max-h-40 overflow-y-auto' : 'h-full',
                    ' py-2 rounded-b-xl bg-white dark:bg-product-input-bg-dark',
                  )}
                >
                  {options.map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedOption(optionsAsArrayOfObjects ? option[valueKey] : option);
                        setIsOpen(false);
                      }}
                      className="md:py-2 py-1 px-4 text-dark-blue dark:text-white dark:hover:text-dark-blue font-semibold md:text-body-md text-body-sm font-Montserrat hover:bg-login-button-bg cursor-pointer text-left"
                    >
                      {option !== 'CVR' ? (
                        optionsAsArrayOfObjects ? (
                          option[labelKey]
                        ) : (
                          option
                        )
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>{option}</div>
                          <div className="font-Medium font-Montserrat text-body-3xs text-discount-text h-full px-3">
                            Use CVR to get 25% discount
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              // <div className="absolute h-full w-full bg-red-500 left-0 rounded-xl z-20 top-16 py-4">
              //   {showSearchOption && (
              //     <div className="relative">
              //       <input
              //         autoFocus
              //         type="text"
              //         value={searchValue}
              //         placeholder="Search..."
              //         onChange={(e) => searchOption(e.target.value, 'arr')}
              //         className="pl-12 w-full h-11 bg-white rounded-lg text-discount-apply-btn-text font-Montserrat font-semibold text-body-md border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0 outline-none"
              //       />
              //       <img loading="lazy" src={Search} alt="" className="absolute left-3 top-2.5" />
              //     </div>
              //   )}
              //   <div
              //     className={classNames(
              //       showSearchOption
              //         ? 'h-option-container-height mt-2 overflow-y-scroll'
              //         : 'h-full',
              //       'bg-white rounded-lg p-2',
              //     )}
              //   >
              //     {options.map((option) => (
              //       <div
              //         key={uniqid()}
              //         onClick={() => {
              //           setSelectedOption(option);
              //           setIsOpen(false);
              //         }}
              //         className="md:py-2 py-1.5 px-4 text-dark-blue font-semibold md:text-body-lg text-body-md font-Montserrat hover:bg-login-button-bg cursor-pointer rounded-lg"
              //       >
              //         {option !== 'CVR' ? (
              //           option
              //         ) : (
              //           <div className="flex justify-between items-center">
              //             <div>{option}</div>
              //             <div className="font-Medium font-Montserrat text-body-3xs text-discount-text h-full px-3">
              //               Use CVR to ger 50% discount
              //             </div>
              //           </div>
              //         )}
              //       </div>
              //     ))}
              //   </div>
              // </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default SelectWithSearch;
