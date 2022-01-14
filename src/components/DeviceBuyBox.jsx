import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { CheckIcon } from '@heroicons/react/outline';
import { useWeb3React } from '@web3-react/core';
import { PDFViewer } from '@react-pdf/renderer';
import { toast } from 'react-toastify';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../config/firebase';
import Alert from './common/Alert';
import { walletLogin } from '../hooks/useAuth';
import SUPPORTED_WALLETS from '../config/walletConfig';
import SelectWithSearch from './common/SelectWithSearch';
import DeviceReceiptCard from './DeviceReceiptCard';
import DownloadPolicy from './common/DownloadPolicy';
import DeviceReceipt from './DeviceReceipt';
import Loading from './common/TxLoading';
import PageLoader from './common/PageLoader';
import {
  setProfileDetails,
  verifyOTP,
  getLoginDetails,
  setLoginModalVisible,
} from '../redux/actions/Auth';
import {
  buyDeviceInsuranceFirst,
  resetDeviceInsurance,
  buyDeviceInsurance,
  getDeviceDetails,
  getDevicePlanDetails,
  getDeviceModelDetails,
  createDeviceInsurancePolicy,
} from '../redux/actions/DeviceInsurance';
import { classNames } from '../functions/utils';
import useStakeForDevice, { useStakeForDeviceByToken } from '../hooks/useStakeForDevice';
import useGetAllowanceOfToken from '../hooks/useGetAllowanceOfToken';
import useTokenApprove from '../hooks/useTokenApprove';
import useTokenBalance, { useGetEthBalance } from '../hooks/useTokenBalance';
import useAssetsUsdPrice from '../hooks/useAssetsUsdPrice';
import useTokenAmount from '../hooks/useTokenAmount';
import { getBalanceNumber } from '../utils/formatBalance';
import useAddress from '../hooks/useAddress';

const deviceOptions = ['Mobile Phone', 'Laptop', 'Tablet', 'Smart Watch', 'Portable Speakers'];

const DeviceBuyBox = (props) => {
  const { setTitle, setMaxWidth, setIsNotCloseable, initDeviceType } = props;

  const dispatch = useDispatch();
  const { account, activate } = useWeb3React();
  const [curWalletId, setCurWalletId] = useState('injected');
  const [connectStatus, setConnectStatus] = useState(false);
  const { showOTPScreen, showVerified, is_verified, loader, authLoader, isFailed } = useSelector(
    (state) => state.auth,
  );
  const notRegistered = !is_verified;
  const {
    policyId,
    deviceDetails,
    devicePlanDetails,
    deviceModelDetails,
    txn_hash,
    signature,
    loader: deviceLoader,
    message: deviceMessage,
    isFailed: deviceIsFailed,
  } = useSelector((state) => state.deviceInsurance);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');

  const [deviceType, setDeviceType] = useState(initDeviceType || deviceOptions[0] || '');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState('');
  const [purchaseMonth, setPurchaseMonth] = useState('');
  const [model, setModel] = useState('');
  const [planType, setPlanType] = useState('');

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [imeiOrSerial, setImeiOrSerial] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const [applyDiscount, setApplyDiscount] = useState(false);
  const [txPending, setTxPending] = useState(false);

  const [useForRegistration, setUseForRegistration] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userOtp, setUserOtp] = useState('');

  const [showLogin, setShowLogin] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const { getP4LAddress } = useAddress();
  const { onStake } = useStakeForDevice();
  const { onStakeByToken } = useStakeForDeviceByToken();
  const { onApprove } = useTokenApprove(getP4LAddress());
  const { cvrAllowance, handleAllowance } = useGetAllowanceOfToken(getP4LAddress());
  const { getETHAmountForUSDC, getTokenAmountForUSDC } = useTokenAmount();

  const { balance } = useGetEthBalance();
  const cvrBalanceStatus = useTokenBalance();

  // const ethPrice = useAssetsUsdPrice('eth');
  const cvrPrice = useAssetsUsdPrice('cvr');

  const hasFirstStep = deviceType && brand && value && purchaseMonth;
  const hasFirstTwoStep = hasFirstStep && planType;
  const hasAllStep = hasFirstTwoStep && (model || !deviceModelDetails?.models?.length);

  const { plan_total_price, plan_currency, plan_type } = planType;
  const discount = +((+plan_total_price * 25) / 100).toFixed(2);
  const discountAmount = applyDiscount ? discount : 0;
  const total = Number(+plan_total_price - discountAmount).toFixed(2);
  const selectedModel = deviceModelDetails?.models?.filter((obj) => obj.model_code === model) || [];

  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const minDateOneYear = new Date(year - 1, month, day).toLocaleDateString('en-ca');
  const minDateTwoYear = new Date(year - 2, month, day).toLocaleDateString('en-ca');
  const maxDate = new Date().toLocaleDateString('en-ca');

  useEffect(() => {
    handleAllowance();
  }, []);

  useEffect(() => {
    dispatch(resetDeviceInsurance());
  }, []);

  useEffect(() => {
    if (deviceIsFailed) setShowAlert(true);
  }, [deviceIsFailed]);

  // useEffect(() => {
  //   if (txn_hash && !deviceLoader && !deviceIsFailed) {
  //     setTitle('Receipt');
  //     setMaxWidth('max-w-5xl');
  //     setShowReceipt(true);
  //   } else {
  //     setTitle('Device Details');
  //     setMaxWidth('max-w-2xl');
  //     setShowReceipt(false);
  //   }
  // }, [txn_hash]);

  useEffect(() => {
    dispatch(
      getDeviceDetails({
        device: deviceType,
        partner_code: '1039',
        endpoint: 'device-details',
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
  }, [brand, value, purchaseMonth]);

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
          tran_id: devicePlanDetails?.tran_id,
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

  useEffect(() => {
    if (connectStatus && account) {
      dispatch(getLoginDetails({ wallet_address: account }));
      setConnectStatus(false);
    }
  }, [connectStatus, account]);

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

  useEffect(() => {
    if (!deviceIsFailed && !deviceLoader && policyId && txPending && txn_hash && signature) {
      (async () => {
        const param = {
          policyId: txn_hash,
          device_type: deviceType,
          brand,
          value: deviceDetails?.device_values[value],
          purchase_month: purchaseMonth,
          model_code: model || 'OTHERS',
          model: model || 'OTHERS',
          model_name: selectedModel?.[0]?.model_name || 'Others',
          plan_type: 'monthly',
          first_name: fName,
          last_name: lName,
          email,
          imei_or_serial_number: imeiOrSerial,
          phone,
          mobile: phone,
          currency: applyDiscount ? 'CVR' : 'USD',
          amount: plan_total_price,
          discount_amount: discountAmount,
          tax: '0',
          total_amount: total,
          wallet_address: account,
          partner_code: '1039',
          custom_device_name: selectedModel?.[0]?.model_name || `${brand} ${deviceType}`,
          tran_id: devicePlanDetails?.tran_id,
          purchase_date: purchaseDate,
        };
        const ethAmount = await getETHAmountForUSDC(total);
        try {
          const result =
            discountAmount > 0
              ? await onStakeByToken(param, signature)
              : await onStake(param, ethAmount.toString(), signature);

          if (result.status) {
            dispatch(
              buyDeviceInsurance({
                ...param,
                productId: policyId,
                txn_hash: result.txn_hash,
              }),
            );
            dispatch(
              createDeviceInsurancePolicy({
                endpoint: 'create-policy-api',
                first_name: fName,
                last_name: lName,
                mobile: phone,
                email,
                model_code: model || 'OTHERS',
                custom_device_name: selectedModel?.[0]?.model_name || `${brand} ${deviceType}`,
                imei_or_serial_number: imeiOrSerial,
                tran_id: devicePlanDetails?.tran_id,
                purchase_date: purchaseDate,
                partner_code: '1039',
              }),
            );
            setTxPending(false);
            setIsNotCloseable(false);
            setTitle('Receipt');
            setMaxWidth('max-w-5xl');
            setShowReceipt(true);
            logEvent(analytics, 'Action - Device Policy Bought', {
              device: deviceType,
              brand,
              value: deviceDetails?.device_values[value],
              purchaseMonth,
              model: selectedModel,
              amount: total,
              paidVia: applyDiscount ? 'CVR' : 'USD',
            });
            toast.success('Successfully Purchased!');
          }
        } catch (error) {
          console.log(error);
          toast.warning('transaction failed!.');
          setTxPending(false);
          setIsNotCloseable(false);
        }
      })();
    }
  }, [policyId, deviceIsFailed, deviceLoader, txn_hash, signature]);

  const tryActivation = (connect) => {
    setCurWalletId(connect);
    setConnectStatus(true);
    walletLogin(connect, activate);

    setTitle('Personal Information');
    setShowInfoForm(true);
  };

  const handleConfirm = async (e) => {
    if (e) e.preventDefault();
    setTxPending(true);
    setIsNotCloseable(true);
    if (discountAmount > 0 && !cvrAllowance) {
      try {
        const result = await onApprove();
        await handleAllowance();
        if (result) {
          toast.success('CVR token approved.');
        } else {
          toast.warning('CVR token approving failed.');
        }
      } catch (e) {
        toast.warning('CVR token approving rejected.');
        console.error(e);
      }
    }

    let ethAmount1;
    let cvrAmount1;
    try {
      ethAmount1 = await getETHAmountForUSDC(total); // total / ethPrice;
      cvrAmount1 = await getTokenAmountForUSDC(total); // total / cvrPrice;
    } catch (err) {
      toast.warning(err.message);
      setTxPending(false);
      setIsNotCloseable(false);
      return;
    }
    const ethAmount = getBalanceNumber(ethAmount1);
    const cvrAmount = getBalanceNumber(cvrAmount1);

    if (!applyDiscount && ethAmount + 0.016 >= getBalanceNumber(balance)) {
      toast.warning('Insufficient ETH balance!');
      setTxPending(false);
      setIsNotCloseable(false);
      return;
    }
    if (applyDiscount && cvrAmount >= getBalanceNumber(cvrBalanceStatus.balance)) {
      toast.warning('Insufficient CVR balance!');
      setApplyDiscount(false);
      setTxPending(false);
      setIsNotCloseable(false);
      return;
    }

    // if (policyId === '') {
    //   toast.warning('You have not the policy id yet. Please try again!');
    //   setApplyDiscount(false);
    //   setTxPending(false);
    //   setIsNotCloseable(false);
    // }
    const param = {
      device_type: deviceType,
      brand,
      value: deviceDetails?.device_values[value],
      purchase_month: purchaseMonth,
      durPlan: purchaseMonth === 'Less than 12 months' ? 1 : 2,
      model: model || 'OTHERS',
      model_name: selectedModel?.[0]?.model_name || 'Others',
      plan_type: 'monthly',
      first_name: fName,
      last_name: lName,
      email,
      phone,
      imei_or_serial_number: imeiOrSerial,
      currency: plan_currency,
      amount: plan_total_price,
      discount_amount: discountAmount,
      tax: '0',
      total_amount: total,
      wallet_address: account,
    };

    dispatch(buyDeviceInsuranceFirst(param));
    // try {
    //   const result =
    //     discountAmount > 0
    //       ? await onStakeByToken(param)
    //       : await onStake(param, getDecimalAmount(ethAmount).toString());

    //   if (result.status) {
    //     dispatch(
    //       buyDeviceInsurance({
    //         ...param,
    //         txn_hash: result.txn_hash,
    //       }),
    //     );
    //     toast.success('Successfully purchased!');
    //   }
    // } catch (e) {
    //   console.error(e);
    //   toast.warning(e.message);
    // }
    // setTxPending(false);
    // setIsNotCloseable(false);
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
            <img loading="lazy" src={option.icon} alt="Metamask" className="md:h-11 h-8 mx-auto" />
            <div className="text-dark-blue font-semibold font-Montserrat md:text-body-md text-body-xs md:mt-5 mt-4 dark:text-white">
              {(connectStatus && curWalletId === option.connector) || loader
                ? 'Connecting...'
                : option.name}
            </div>
          </div>
        </div>
      );
    });
  };

  if ((!account && showLogin) || (account && loader && !authLoader)) {
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
                  imei_or_serial_number: imeiOrSerial,
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
            imei_or_serial_number: imeiOrSerial,
            selectedModel: selectedModel[0],
          }}
        />
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div>
        {showAlert && (
          <div className="mb-4">
            <Alert type="danger" text={deviceMessage} onClose={() => setShowAlert(false)} />
          </div>
        )}
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
            className="form-checkbox text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0"
            checked={applyDiscount}
            onChange={() => setApplyDiscount(!applyDiscount)}
          />
        </div>
        <hr />
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Discount</h5>
          <h5 className="text-body-lg font-medium">{discountAmount} USD</h5>
        </div>
        <hr />
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Total</h5>
          <h5 className="text-body-lg font-medium">{total} USD</h5>
        </div>
        {applyDiscount && (
          <div className="flex items-center justify-center w-full mt-2 dark:text-white">
            <h5 className="text-h6 font-medium">{`${(total / cvrPrice).toFixed(
              2,
            )} CVR will be used for 25% discount`}</h5>
          </div>
        )}
        <div className="flex items-center justify-center w-full mt-6">
          <button
            type="button"
            onClick={handleConfirm}
            className="py-3 md:px-5 px-4 text-white font-Montserrat md:text-body-md text-body-sm md:rounded-2xl rounded-xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            {txPending ? (
              <Loading widthClass="w-4" heightClass="h-4" />
            ) : discountAmount > 0 && !cvrAllowance ? (
              'Approve CVR'
            ) : (
              'Confirm to Pay'
            )}
          </button>
        </div>
        {txPending && <PageLoader text="Please wait while the policy is being purchased" />}
      </div>
    );
  }

  if (showInfoForm) {
    return (
      <>
        {showAlert && (
          <div className="mb-4">
            <Alert
              type={alertType || 'danger'}
              text={alertText || deviceMessage}
              onClose={() => setShowAlert(false)}
            />
          </div>
        )}
        <form onSubmit={handleBuyNow}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="first_name" className="ml-1 text-body-md text-black dark:text-white">
                First Name
              </label>
              <input
                required
                type="text"
                placeholder="First Name"
                name="first_name"
                value={fName}
                pattern="[^0-9\?.()/<>[\]\\,':;\{\}+=_|\x22\*&\^%$#@!~`]+"
                title="Only Alphabets are allowed"
                onChange={(e) => setFName(e.target.value)}
                className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="ml-1 text-body-md text-black dark:text-white">
                Last Name
              </label>
              <input
                required
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={lName}
                pattern="[^0-9\?.()/<>[\]\\,':;\{\}+=_|\x22\*&\^%$#@!~`]+"
                title="Only Alphabets are allowed"
                onChange={(e) => setLName(e.target.value)}
                className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="ml-1 text-body-md text-black dark:text-white">
                Mobile
              </label>
              <input
                required
                type="tel"
                pattern="\d*"
                title="Only numbers allowed"
                placeholder="Mobile"
                name="mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
            </div>
            <div>
              <label htmlFor="email" className="ml-1 text-body-md text-black dark:text-white">
                Email
              </label>
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
            <div>
              <label
                htmlFor="imeiOrSerial"
                className="ml-1 text-body-md text-black dark:text-white"
              >
                IMEI or Serial Number
              </label>
              <input
                required
                type="text"
                placeholder="Device IMEI or Serial Number"
                name="imeiOrSerial"
                value={imeiOrSerial}
                pattern="^[a-zA-Z0-9-_#/]*$"
                title="Only Alphabets, Numbers, Hyphen and Underscore are allowed"
                onChange={(e) => setImeiOrSerial(e.target.value)}
                className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
            </div>
            <div>
              <label
                htmlFor="purchaseDate"
                className="ml-1 text-body-md text-black dark:text-white"
              >
                Device Purchase Date
              </label>
              <input
                required
                type="date"
                min={purchaseMonth === 'Less than 12 months' ? minDateOneYear : minDateTwoYear}
                max={purchaseMonth === 'Less than 12 months' ? maxDate : minDateOneYear}
                placeholder="Purchase date"
                name="purchaseDate"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full h-12 border-2 px-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
            </div>
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
                className="form-checkbox text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0"
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

          <div className="mt-3">
            <input
              id="termsAndCondition"
              name="termsAndCondition"
              type="checkbox"
              className="form-checkbox rounded-sm text-primary-gd-1 focus:ring-offset-0 duration-500"
              required
            />
            <label
              htmlFor="termsAndCondition"
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
      {showAlert && (
        <div className="mb-4">
          <Alert
            type={alertType || 'danger'}
            text={alertText || deviceMessage}
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
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
            {devicePlanDetails?.plan_benefit?.map((point, i) => (
              <div
                key={i}
                className="font-semibold font-Montserrat md:text-body-sm text-body-xs text-dark-blue flex col-span-2 md:col-span-1 text-left"
              >
                <img loading="lazy" src={CheckIcon} alt="" className="md:h-4 md:w-4 h-3 w-3 mr-2 mt-1" />{' '}
                <div>{point}</div>
              </div>
            )) || null}
          </div>
        </div> */}

        {hasFirstTwoStep && (
          <>
            <div className="mt-4 font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white text-left">
              2- Payment Plan
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
              {devicePlanDetails?.plan_price
                ?.filter((f) => f.plan_type === 'yearly')
                .map((planObj, i) => (
                  <label key={i} className="col-span-2">
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
                        <div className="font-Montserrat font-semibold text-body-xs dark:text-white mb-1">
                          {planObj.plan_type}
                        </div>

                        <div className="text-Montserrat text-body-lg text-dark-blue font-medium dark:text-white">
                          {planObj.plan_actual_price > planObj.plan_total_price ? (
                            <div>
                              {planObj.plan_total_price} {planObj.plan_currency}{' '}
                              <del>({planObj.plan_actual_price})</del>
                            </div>
                          ) : (
                            <div>
                              {planObj.plan_total_price} {planObj.plan_currency}
                            </div>
                          )}
                        </div>
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
