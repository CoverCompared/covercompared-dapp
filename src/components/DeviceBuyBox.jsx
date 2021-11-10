import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { CheckIcon } from '@heroicons/react/outline';
import { useWeb3React } from '@web3-react/core';

import Alert from './common/Alert';
import { walletLogin } from '../hooks/useAuth';
import SUPPORTED_WALLETS from '../config/walletConfig';
import SelectWithSearch from './common/SelectWithSearch';
import DeviceReceiptCard from './DeviceReceiptCard';
import DownloadPolicy from './common/DownloadPolicy';
import DeviceReceipt from './DeviceReceipt';

import { setProfileDetails, verifyOTP } from '../redux/actions/Auth';
import {
  buyDeviceInsurance,
  getDeviceDetails,
  getDevicePlanDetails,
  getDeviceModelDetails,
} from '../redux/actions/DeviceInsurance';
import { classNames } from '../functions/utils';

const deviceOptions = ['Mobile Phone', 'Laptop', 'Tablet', 'Smart Watch', 'Portable Speakers'];

const DeviceBuyBox = (props) => {
  const { setTitle, setMaxWidth } = props;

  const dispatch = useDispatch();
  // const { login } = useAuth();
  const { account, activate } = useWeb3React();
  const [curWalletId, setCurWalletId] = useState('injected');
  const [connectStatus, setConnectStatus] = useState(false);
  const coverListData = useSelector((state) => state.deviceInsurance);
  const { showOTPScreen, showVerified, is_verified, loader, isFailed } = useSelector(
    (state) => state.auth,
  );
  const notRegistered = !is_verified;
  const { deviceDetails, devicePlanDetails, deviceModelDetails, txn_hash } = coverListData || {};

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');

  const [deviceType, setDeviceType] = useState(deviceOptions[0] || '');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState('');
  const [purchaseMonth, setPurchaseMonth] = useState('');
  const [model, setModel] = useState('');
  const [planType, setPlanType] = useState('');

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [applyDiscount, setApplyDiscount] = useState(false);

  const [useForRegistration, setUseForRegistration] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userOtp, setUserOtp] = useState('');

  const [showLogin, setShowLogin] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const hasFirstStep = deviceType && brand && value && purchaseMonth;
  const hasFirstTwoStep = hasFirstStep && planType;
  const hasAllStep = hasFirstTwoStep && (model || !deviceModelDetails?.models?.length);

  const { plan_total_price, plan_currency, plan_type } = planType;
  const tax = '5';
  const discount = (+plan_total_price * 25) / 100;
  const discountAmount = applyDiscount ? discount : 0;
  const total = Number(+plan_total_price + +tax - discountAmount).toFixed(2);
  const selectedModel = deviceModelDetails?.models?.filter((obj) => obj.model_code === model) || [];

  useEffect(() => {
    dispatch(
      getDeviceDetails({
        endpoint: 'device-details',
        device: 'Mobile Phone',
        partner_code: 'Crypto',
      }),
    );
    setBrand('');
    setValue('');
    setPurchaseMonth('');
  }, [deviceType]);

  useEffect(() => {
    if (hasFirstStep) {
      dispatch(
        getDevicePlanDetails({
          endpoint: 'plan-details',
          device: deviceType,
          brand,
          device_value: value,
          purchase_month: purchaseMonth,
          tran_id: deviceDetails.tran_id,
        }),
      );
    }
  }, [deviceType, brand, value, purchaseMonth]);

  useEffect(() => {
    if (devicePlanDetails) {
      setPlanType(devicePlanDetails?.plan_price?.[1]);
    }
  }, [devicePlanDetails]);

  useEffect(() => {
    if (deviceModelDetails) {
      setModel(deviceModelDetails?.models?.[0]?.model_code || '');
    }
  }, [deviceModelDetails]);

  useEffect(() => {
    if (hasFirstTwoStep) {
      dispatch(
        getDeviceModelDetails({
          endpoint: 'initiate-policy',
          plan_id: planType.plan_id,
          tran_id: devicePlanDetails.tran_id,
        }),
      );
    }
  }, [deviceType, brand, value, purchaseMonth, planType]);

  useEffect(() => {
    if (emailSubmitted && showOTPScreen && isFailed && !loader) {
      setShowAlert(true);
      setAlertType('danger');
      return setAlertText("You've provided an invalid OTP");
    }
    if (emailSubmitted && showOTPScreen && !loader) {
      setShowAlert(true);
      setAlertType('success');
      return setAlertText('An OTP has been sent to your email');
    }
    if (emailSubmitted && showVerified && !loader) {
      setShowAlert(true);
      setAlertType('success');
      return setAlertText('Thank you! your email has been verified successfully');
    }
    return null;
  }, [showOTPScreen, showVerified, loader, isFailed, emailSubmitted]);

  const handleProceed = (e) => {
    if (e) e.preventDefault();
    if (!account) {
      setTitle('Login');
      setMaxWidth('max-w-2xl');
      setShowLogin(true);
    } else {
      setTitle('Personal Information');
      setShowInfoForm(true);
    }
  };

  const handleBuyNow = (e) => {
    if (e) e.preventDefault();
    setMaxWidth('max-w-lg');
    setTitle('Confirmation');
    setShowConfirmation(true);
  };

  const tryActivation = (connect) => {
    setCurWalletId(connect);
    setConnectStatus(true);
    walletLogin(connect, activate);

    setTitle('Personal Information');
    setShowInfoForm(true);
  };

  const handleConfirm = (e) => {
    if (e) e.preventDefault();

    dispatch(
      buyDeviceInsurance({
        device_type: deviceType,
        brand,
        value,
        purchase_month: purchaseMonth,
        model,
        plan_type: 'monthly',
        first_name: fName,
        last_name: lName,
        email,
        phone,
        currency: plan_currency,
        amount: plan_total_price,
        discount_amount: discountAmount,
        tax: '5',
        total_amount: total,
      }),
    );

    setTitle('Receipt');
    setMaxWidth('max-w-5xl');
    setShowReceipt(true);
  };

  const handleSubmitEmail = (email = null) => {
    if (userEmail || email) {
      setEmailSubmitted(true);
      dispatch(setProfileDetails({ email: userEmail || email }));
    }
  };

  const handleSubmitOTP = (e) => {
    if (e) e.preventDefault();
    if (userOtp) dispatch(verifyOTP({ otp: userOtp }));
  };

  const toggleRegisterCheckbox = () => {
    setUseForRegistration(!useForRegistration);
    if (!useForRegistration && email) {
      setUserEmail(email);
      handleSubmitEmail(email);
    }
  };

  const getWalletOption = () => {
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      return (
        <div
          className="md:col-span-5 col-span-5 h-full"
          key={key}
          id={`connect-${key}`}
          onClick={() => tryActivation(option.connector)}
        >
          <div className="flex flex-col items-center md:justify-center h-full py-9 px-6 md:h-52 xl:h-54 w-full rounded-2xl bg-white shadow-md cursor-pointer dark:bg-wallet-dark-bg">
            <img src={option.icon} alt="Metamask" className="md:h-11 h-8 mx-auto" />
            <div className="text-dark-blue font-semibold font-Montserrat md:text-body-md text-body-xs md:mt-5 mt-4 dark:text-white">
              {connectStatus && curWalletId === option.connector ? 'Connecting...' : option.name}
            </div>
          </div>
        </div>
      );
    });
  };

  if (!account && showLogin) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex items-center justify-center w-full">
          <div className="grid grid-cols-10 md:col-start-1 md:gap-x-6 gap-x-5 w-full">
            {getWalletOption()}
          </div>
        </div>
      </div>
    );
  }

  if (showReceipt) {
    return (
      <div>
        <div className="flex justify-end">
          <DownloadPolicy
            fileName="Device_protection_receipt.pdf"
            pdf={
              <DeviceReceipt
                {...{
                  txn_hash,
                  quote: plan_total_price,
                  discount,
                  total,
                  tax,
                  discountAmount,
                  applyDiscount,
                  fName,
                  lName,
                  phone,
                  email,
                  plan_type,
                  model,
                  deviceType,
                  brand,
                  value: deviceDetails?.device_values[value] || '',
                  purchaseMonth,
                  plan_currency,
                  selectedModel: selectedModel[0],
                }}
              />
            }
          />
        </div>
        <DeviceReceiptCard
          {...{
            txn_hash,
            quote: plan_total_price,
            total,
            tax,
            discountAmount,
            fName,
            lName,
            phone,
            email,
            deviceType,
            brand,
            value: deviceDetails?.device_values[value] || '',
            purchaseMonth,
            plan_currency,
            selectedModel: selectedModel[0],
          }}
        />
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div>
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">
            Premium Per {plan_type === 'yearly' ? 'Year' : 'Month'}
          </h5>
          <h5 className="text-body-lg font-medium">{plan_total_price} USD</h5>
        </div>
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Pay using CVR for 25% discount</h5>
          <input
            type="checkbox"
            name="applyDiscount"
            className="form-checkbox text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
            checked={applyDiscount}
            onChange={() => setApplyDiscount(!applyDiscount)}
          />
        </div>
        <hr />
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Discount</h5>
          <h5 className="text-body-lg font-medium">{discountAmount} USD</h5>
        </div>
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Tax</h5>
          <h5 className="text-body-lg font-medium">{tax} USD</h5>
        </div>
        <hr />
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Total</h5>
          <h5 className="text-body-lg font-medium">{total} USD</h5>
        </div>
        <div className="flex items-center justify-center w-full mt-6">
          <button
            type="button"
            onClick={handleConfirm}
            className="py-3 md:px-5 px-4 text-white font-Montserrat md:text-body-md text-body-sm md:rounded-2xl rounded-xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            Confirm to Pay
          </button>
        </div>
      </div>
    );
  }

  if (showInfoForm) {
    return (
      <>
        {showAlert && (
          <div className="mb-4">
            <Alert type={alertType} text={alertText} onClose={() => setShowAlert(false)} />
          </div>
        )}
        <form onSubmit={handleBuyNow}>
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="text"
              placeholder="First Name"
              name="first_name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
            />
            <input
              required
              type="tel"
              placeholder="Mobile"
              name="mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
            />
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
            />
          </div>

          {notRegistered && (
            <div className="mt-6">
              <div className="flex justify-center items-center">
                <h5 className="font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-body-md dark:text-white">
                  Registration Information
                </h5>
              </div>

              <input
                type="checkbox"
                id="useForRegistration"
                name="useForRegistration"
                className="form-checkbox text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
                checked={useForRegistration}
                onChange={toggleRegisterCheckbox}
              />
              <label
                htmlFor="useForRegistration"
                className="ml-2 font-Montserrat font-medium md:text-body-md text-body-xs  text-dark-blue dark:text-white group-hover:text-white"
              >
                Use above email for account registration
              </label>

              <div className="mt-4 grid grid-cols-12 gap-3 w-full">
                <div className="lg:col-span-6 col-span-12">
                  <input
                    required
                    disabled={!notRegistered}
                    type="email"
                    placeholder="Email"
                    name="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleSubmitEmail}
                    disabled={!notRegistered}
                    className="pl-2 mt-1 text-body-md underline cursor-pointer disabled:cursor-default"
                  >
                    Send verification OTP
                  </button>
                </div>

                <div className="lg:col-span-6 col-span-12">
                  <input
                    required
                    disabled={!showOTPScreen || !emailSubmitted || !notRegistered}
                    type="number"
                    placeholder="OTP"
                    name="userOtp"
                    value={userOtp}
                    onChange={(e) => setUserOtp(e.target.value)}
                    className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0  disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleSubmitOTP}
                    disabled={!showOTPScreen || !emailSubmitted || !notRegistered}
                    className="pl-2 mt-1 text-body-md underline cursor-pointer disabled:cursor-default"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <input
              required
              id="terms"
              type="checkbox"
              className="form-checkbox rounded-sm text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
            />
            <label
              htmlFor="terms"
              className="ml-2 font-Montserrat font-medium md:text-body-md text-body-xs  text-dark-blue dark:text-white group-hover:text-white"
            >
              I have read and agree to the{' '}
              <a className="underline" target="_blank" href="https://google.com" rel="noreferrer">
                terms and conditions
              </a>{' '}
              *
            </label>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={notRegistered}
              className="py-3 px-5 outline-none border-0 rounded-xl text-white font-Montserrat font-semibold md:text-h6 text-body-md shadow-buyInsurance bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
            >
              Buy Now
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <form onSubmit={handleProceed}>
        <div className="font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white text-left">
          1- Device Details
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div className="col-span-2 md:col-span-1">
            <SelectWithSearch
              {...props}
              showColumnLayout
              fieldTitle="Device"
              selectedOption={deviceType}
              setSelectedOption={setDeviceType}
              dropdownOptions={deviceOptions}
              showSearchOption="true"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <SelectWithSearch
              {...props}
              showColumnLayout
              fieldTitle="Brand"
              selectedOption={brand}
              setSelectedOption={setBrand}
              dropdownOptions={deviceDetails?.brand || []}
              showSearchOption="true"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <SelectWithSearch
              {...props}
              showColumnLayout
              fieldTitle="Value"
              selectedOption={value}
              setSelectedOption={setValue}
              dropdownOptions={deviceDetails?.device_values || {}}
              showSearchOption="true"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <SelectWithSearch
              {...props}
              showColumnLayout
              fieldTitle="Purchase Month"
              selectedOption={purchaseMonth}
              setSelectedOption={setPurchaseMonth}
              dropdownOptions={deviceDetails?.purchase_month || []}
              showSearchOption="true"
            />
          </div>
        </div>

        {/* <div className="my-6">
          <div className="grid grid-cols-2 md:gap-y-3 gap-y-2 gap-x-4">
            {devicePlanDetails?.plan_benefit?.map((point) => (
              <div
                key={uniqid()}
                className="font-semibold font-Montserrat md:text-body-sm text-body-xs text-dark-blue flex col-span-2 md:col-span-1 text-left"
              >
                <img src={CheckIcon} alt="" className="md:h-4 md:w-4 h-3 w-3 mr-2 mt-1" />{' '}
                <div>{point}</div>
              </div>
            )) || null}
          </div>
        </div> */}

        {hasFirstTwoStep && (
          <>
            <div className="mt-4 font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white text-left">
              2- Choose Payment Plan
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
              {devicePlanDetails?.plan_price?.map((planObj) => (
                <label key={uniqid()}>
                  <input
                    id="sample"
                    name="sample"
                    type="radio"
                    className="hidden"
                    value="monthly"
                    onClick={() => setPlanType(planObj)}
                  />
                  <div
                    className={classNames(
                      JSON.stringify(planType) === JSON.stringify(planObj)
                        ? 'border-2 border-primary-gd-1 dark:border-white'
                        : 'border-2 border-gray-300',
                      'bg-white relative dark:bg-featureCard-dark-bg rounded-xl cursor-pointer shadow-devicePriceBoxShadow w-full md:py-3 md:px-2 py-2 px-1 text-center font-Montserrat text-body-xs text-black dark:text-white font-semibold',
                    )}
                  >
                    {JSON.stringify(planType) === JSON.stringify(planObj) && (
                      <div className="absolute top-0 left-0 bg-primary-gd-1 text-white pl-2 pr-3 py-1 rounded-br-3xl rounded-tl-lg">
                        <CheckIcon className="w-5 h-4" />
                      </div>
                    )}
                    {planObj.plan_discount > 0 ? (
                      <div className="absolute h-full md:w-14 w-7 top-0 left-0 bg-primary-gd-1 rounded-l-xl flex justify-center items-center font-Montserrat md:text-body-md text-body-2xs text-white p-2">
                        {planObj.plan_discount}% off
                      </div>
                    ) : (
                      ''
                    )}
                    <div
                      className={classNames(
                        planObj.plan_discount > 0 ? 'pl-5 text-body-2xs' : 'text-body-xs',
                        'text-dark-blue md:text-body-md dark:text-white',
                      )}
                    >
                      <div className="text-center mb-1">{planObj.plan_type}</div>
                      {planObj.plan_actual_price > planObj.plan_total_price ? (
                        <div>
                          {planObj.plan_currency} {planObj.plan_total_price}{' '}
                          <del>({planObj.plan_actual_price})</del>
                        </div>
                      ) : (
                        <div>
                          {planObj.plan_currency} {planObj.plan_total_price}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              )) || null}
            </div>
          </>
        )}

        {!!(deviceModelDetails?.models?.length && hasFirstTwoStep) && (
          <>
            <div className="mt-4 font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white text-left">
              3- Device Specification
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
              <div className="col-span-2">
                <SelectWithSearch
                  {...props}
                  showColumnLayout
                  optionsAsArrayOfObjects
                  labelKey="model_name"
                  valueKey="model_code"
                  fieldTitle="Device Model"
                  selectedOption={model}
                  setSelectedOption={setModel}
                  dropdownOptions={deviceModelDetails?.models || []}
                  showSearchOption="true"
                />
              </div>
            </div>
          </>
        )}

        <div className="w-full mt-5 flex justify-center items-center">
          <button
            type="submit"
            disabled={!hasAllStep}
            className="py-3 px-5 outline-none border-0 rounded-xl text-white font-Montserrat font-semibold md:text-h6 text-body-md shadow-buyInsurance bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
          >
            Proceed
          </button>
        </div>
      </form>
    </>
  );
};

export default DeviceBuyBox;
