import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { PDFViewer } from '@react-pdf/renderer';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import useAuth from '../hooks/useAuth';
import SUPPORTED_WALLETS from '../config/walletConfig';
import SelectWithSearch from './common/SelectWithSearch';
import DeviceReceiptCard from './DeviceReceiptCard';
import DownloadPolicy from './common/DownloadPolicy';
import DeviceReceipt from './DeviceReceipt';
import {
  getDeviceDetails,
  getDevicePlanDetails,
  getDeviceModelDetails,
} from '../redux/actions/CoverList';
import { classNames } from '../functions/utils';
import { setLoginModalVisible, setRegisterModalVisible } from '../redux/actions';
import CheckIcon from '../assets/icons/check.png';

const deviceOptions = ['Mobile Phone', 'Laptop', 'Tablet', 'Smart Watch', 'Portable Speakers'];
const amountOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'CVR'];

const DeviceBuyBox = (props) => {
  const { setIsModalOpen, setTitle, setMaxWidth } = props;

  const dispatch = useDispatch();
  const { login } = useAuth();
  const { account } = useWeb3React();
  const [curWalletId, setCurWalletId] = useState('injected');
  const [connectStatus, setConnectStatus] = useState(false);
  const coverListData = useSelector((state) => state.coverList);
  const { is_verified } = useSelector((state) => state.auth);
  const { deviceDetails, devicePlanDetails, deviceModelDetails, loader } = coverListData || {};

  const [deviceType, setDeviceType] = useState(deviceOptions[0] || '');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState('');
  const [purchaseMonth, setPurchaseMonth] = useState('');
  const [model, setModel] = useState('');
  const [planType, setPlanType] = useState('');
  const [applyDiscount, setApplyDiscount] = useState(false);

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setEmail] = useState('');
  const [email, setPhone] = useState('');

  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    dispatch(
      getDeviceDetails({
        endpoint: 'device-details',
        device: 'Mobile Phone',
        partner_code: 'Crypto',
      }),
    );
  }, [deviceType]);

  useEffect(() => {
    setBrand(deviceDetails?.brand?.[0] || '');
    setValue(Object.keys(deviceDetails?.device_values || {})?.[0] || '');
    setPurchaseMonth(deviceDetails?.purchase_month?.[0] || '');
  }, [deviceDetails]);

  useEffect(() => {
    if (deviceType && brand && value && purchaseMonth) {
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
    if (deviceType && brand && value && purchaseMonth && planType) {
      dispatch(
        getDeviceModelDetails({
          endpoint: 'initiate-policy',
          tran_id: deviceDetails.tran_id,
          plan_id: planType.plan_id,
        }),
      );
    }
  }, [deviceType, brand, value, purchaseMonth, planType]);

  const handleProceed = () => {
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
    login(connect);
  };

  const handleConfirm = (e) => {
    if (e) e.preventDefault();
    setTitle('Receipt');
    setMaxWidth('max-w-5xl');
    setShowReceipt(true);
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
    const { plan_total_price, plan_currency, plan_type } = planType;
    const tax = '5';
    const discount = (+plan_total_price * 25) / 100;
    const discountAmount = applyDiscount ? discount : 0;
    const total = Number(+plan_total_price + +tax - discountAmount).toFixed(2);
    const selectedModel = deviceModelDetails?.models.filter((obj) => obj.model_code === model);

    return (
      <div>
        <div className="flex justify-end">
          <DownloadPolicy
            fileName="Device_protection_receipt.pdf"
            pdf={
              <DeviceReceipt
                {...{
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
                  value,
                  purchaseMonth,
                  plan_currency,
                  selectedModel: selectedModel[0],
                }}
              />
            }
          />
          {/* <PDFViewer className="w-full h-80">
            <DeviceReceipt
              {...{
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
                value,
                purchaseMonth,
                plan_currency,
                selectedModel: selectedModel[0],
              }}
            />
          </PDFViewer> */}
        </div>
        <DeviceReceiptCard
          {...{
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
            value,
            purchaseMonth,
            plan_currency,
            selectedModel: selectedModel[0],
          }}
        />
      </div>
    );
  }

  if (showConfirmation) {
    const { plan_total_price, plan_currency, plan_type } = planType;
    const tax = '5';
    const discount = (+plan_total_price * 25) / 100;
    const discountAmount = applyDiscount ? discount : 0;
    const total = Number(+plan_total_price + +tax - discountAmount).toFixed(2);

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
            value={email}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
          />
          <input
            required
            type="email"
            placeholder="Email"
            name="email"
            value={phone}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
          />
        </div>
        <div className="mt-4">
          <input
            required
            type="checkbox"
            className="form-checkbox rounded-sm text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
          />
          <span className="ml-2 font-Montserrat font-medium md:text-body-md text-body-xs  text-dark-blue dark:text-white group-hover:text-white">
            I have read and agree to the{' '}
            <a className="underline" target="_blank" href="https://google.com" rel="noreferrer">
              terms and conditions
            </a>{' '}
            *
          </span>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="py-3 px-5 outline-none border-0 rounded-xl text-white font-Montserrat font-semibold md:text-h6 text-body-md shadow-buyInsurance bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
          >
            Buy Now
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      <form onSubmit={() => {}}>
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

        <div className="mt-4 font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white text-left">
          2- Purchase Plan
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

        {!!deviceModelDetails?.models?.length && (
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
      </form>

      <div className="w-full mt-5 flex justify-center items-center">
        <button
          type="button"
          onClick={handleProceed}
          className="py-3 px-5 outline-none border-0 rounded-xl text-white font-Montserrat font-semibold md:text-h6 text-body-md shadow-buyInsurance bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
        >
          Proceed
        </button>
      </div>
    </>
  );
};

export default DeviceBuyBox;
