import React, { useState, useContext, useEffect } from 'react';
import uniqid from 'uniqid';
import DownArrow from '../../assets/img/Arrow-Down.svg';
import DownArrowWhite from '../../assets/dark-icons/Arrow-Down.svg';
import { ThemeContext } from '../../themeContext';
import { classNames, getKeyByValue, isObject } from '../../functions/utils';
import Loading from './Loading';
import Search from '../../assets/icons/Search.svg';

const DeviceSelect = ({
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
}) => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState(dropdownOptions);

  const searchOption = (value) => {
    setSearchValue(value);
    const options = dropdownOptions.filter((option) => option.toLowerCase().includes(value));
    setOptions(options);
  };

  useEffect(() => {
    if (dropdownOptions) {
      setOptions(dropdownOptions);
    }
  }, [dropdownOptions]);

  return (
    <>
      <div
        className={classNames(
          showColumnLayout ? 'flex-col' : 'flex-row mb-3',
          'w-full flex justify-between py-3 px-4 bg-promo-input-bg rounded-xl dark:bg-product-input-bg-dark',
        )}
      >
        <div className="text-dark-blue font-Montserrat font-semibold text-body-xs dark:text-white">
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
                    type="text"
                    value={fieldValue}
                    onChange={(e) => {
                      setFieldValue(e.target.value);
                    }}
                    className="h-5 pr-0 w-full text-right bg-transparent text-Montserrat text-h6 text-dark-blue dark:text-white font-medium border-0 outline-none focus:border-0 focus:outline-none focus:ring-0"
                  />
                ) : (
                  <Loading widthClass="w-4" heightClass="h-4" />
                )}
                <div
                  className="flex relative h-5 items-center cursor-pointer ml-1"
                  style={{ minWidth: 'fit-content' }}
                >
                  <div
                    className="text-Montserrat text-h6 text-dark-blue font-medium flex items-center dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {isObject(dropdownOptions) ? dropdownOptions[selectedOption] : selectedOption}{' '}
                    <img
                      src={theme === 'light' ? DownArrow : DownArrowWhite}
                      alt="Down Arrow"
                      className="ml-1"
                    />
                  </div>
                  {/* {isOpen && (
                    <div className="absolute left-20 top-0 z-20">
                      {isObject(dropdownOptions) ? (
                        <div className="py-1 px-3.5 rounded-xl bg-promo-input-bg dark:bg-product-input-bg-dark">
                          {Object.values(dropdownOptions || {}).map((option) => (
                            <div
                              key={uniqid()}
                              className="text-dark-blue my-2 font-Montserrat font-medium text-h6 dark:text-white"
                              onClick={() => {
                                setSelectedOption(getKeyByValue(dropdownOptions, option));
                                setIsOpen(false);
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-1 px-3.5 rounded-xl bg-promo-input-bg dark:bg-product-input-bg-dark">
                          {dropdownOptions.map((option) => (
                            <div
                              key={uniqid()}
                              className="text-dark-blue my-2 font-Montserrat font-medium text-h6 dark:text-white"
                              onClick={() => {
                                setSelectedOption(option);
                                setIsOpen(false);
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )} */}
                </div>
              </div>
            </>
          ) : (
            <div className="flex relative h-5 items-center cursor-pointer">
              <div
                className="text-Montserrat text-h6 text-dark-blue font-medium flex items-center dark:text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isObject(dropdownOptions) ? dropdownOptions[selectedOption] : selectedOption}{' '}
                <img
                  src={theme === 'light' ? DownArrow : DownArrowWhite}
                  alt="Down Arrow"
                  className="ml-1"
                />
              </div>

              {/* {isOpen && (
                <div className="absolute left-20 top-0 z-20">
                  {isObject(dropdownOptions) ? (
                    <div className="py-1 px-3.5 rounded-xl bg-promo-input-bg dark:bg-product-input-bg-dark">
                      {Object.values(dropdownOptions || {}).map((option) => (
                        <div
                          key={uniqid()}
                          className="text-dark-blue my-2 font-Montserrat font-medium text-h6 dark:text-white"
                          onClick={() => {
                            setSelectedOption(getKeyByValue(dropdownOptions, option));
                            setIsOpen(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-1 px-3.5 rounded-xl bg-promo-input-bg dark:bg-product-input-bg-dark">
                      {dropdownOptions.map((option) => (
                        <div
                          key={uniqid()}
                          className="text-dark-blue my-2 font-Montserrat font-medium text-h6 dark:text-white"
                          onClick={() => {
                            setSelectedOption(option);
                            setIsOpen(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <>
          {isObject(options) ? (
            <div className="absolute h-full w-full bg-optionContainerBg rounded-xl z-20 top-0 p-4">
              {showSearchOption && (
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    placeholder="Search..."
                    onChange={(e) => searchOption(e.target.value)}
                    className="pl-12 w-full h-11 bg-white rounded-lg text-discount-apply-btn-text font-Montserrat font-semibold text-body-md border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0 outline-none"
                  />
                  <img src={Search} alt="" className="absolute left-3 top-2.5" />
                </div>
              )}
              <div
                className={classNames(
                  showSearchOption ? 'h-option-container-height mt-2 overflow-y-scroll' : 'h-full',
                  'bg-white rounded-lg p-2',
                )}
              >
                {Object.values(options || {}).map((option) => (
                  <div
                    key={uniqid()}
                    onClick={() => {
                      setSelectedOption(getKeyByValue(dropdownOptions, option));
                      setIsOpen(false);
                    }}
                    className="py-2 px-4 text-dark-blue font-semibold md:text-h6 text-body-md font-Montserrat hover:bg-login-button-bg cursor-pointer rounded-lg"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="absolute h-full w-full bg-optionContainerBg rounded-xl z-20 top-0 p-4">
              {showSearchOption && (
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    placeholder="Search..."
                    onChange={(e) => searchOption(e.target.value)}
                    className="pl-12 w-full h-11 bg-white rounded-lg text-discount-apply-btn-text font-Montserrat font-semibold text-body-md border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0 outline-none"
                  />
                  <img src={Search} alt="" className="absolute left-3 top-2.5" />
                </div>
              )}
              <div
                className={classNames(
                  showSearchOption ? 'h-option-container-height mt-2 overflow-y-scroll' : 'h-full',
                  'bg-white rounded-lg p-2',
                )}
              >
                {options.map((option) => (
                  <div
                    key={uniqid()}
                    onClick={() => {
                      setSelectedOption(option);
                      setIsOpen(false);
                    }}
                    className="md:py-2 py-1.5 px-4 text-dark-blue font-semibold md:text-h6 text-body-md font-Montserrat hover:bg-login-button-bg cursor-pointer rounded-lg"
                  >
                    {option !== 'CVR' ? (
                      option
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>{option}</div>
                        <div className="font-Medium font-Montserrat text-body-3xs text-discount-text h-full px-3">
                          Use CVR to ger 50% discount
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default DeviceSelect;
