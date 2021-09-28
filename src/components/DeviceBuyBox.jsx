import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import InputWithSelect from './common/InputWithSelect';
import DeviceSelect from './common/DeviceSelect';
import { getDeviceDetails, getDevicePlanDetails } from '../redux/actions/CoverList';
import { addItemToCart } from '../redux/actions/AppActions';
import { classNames } from '../functions/utils';

const deviceOptions = ['Mobile Phone', 'Laptop', 'Tablet', 'Smart Watch', 'Portable Speakers'];
const amountOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'CVR'];

const DeviceBuyBox = (props) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const coverListData = useSelector((state) => state.coverList);
  const { deviceDetails, devicePlanDetails, loader } = coverListData || {};

  const [deviceType, setDeviceType] = useState(deviceOptions[0] || '');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState('');
  const [purchaseMonth, setPurchaseMonth] = useState('');
  const [quoteField, setQuoteField] = useState('');
  const [quoteSelect, setQuoteSelect] = useState(amountOptions[0]);
  const [devicePlans, setDevicePlans] = useState('');
  const [planPriceArr, setplanPricesArr] = useState('');
  const [planType, setPlanType] = useState('');

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
      setDevicePlans(devicePlanDetails);
      const plansArr = devicePlanDetails.plan_price;
      setplanPricesArr(plansArr);
      setPlanType(plansArr[1]);
    }
  }, [devicePlanDetails]);

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();

    dispatch(
      addItemToCart({
        cardType: 'device',
        device: deviceType,
        brand,
        device_value: value,
        purchase_month: purchaseMonth,
        quote_chain: quoteSelect,
        quote: planType.plan_total_price,
        planType,
        tran_id: deviceDetails.tran_id,
        quote_currency: planType.plan_currency,
      }),
    );
    toast.success('Item added to cart!');
  };

  const handleClick = () => {
    if (!account) {
      toast.warning('You need to login in advance!');
    }
  };

  return (
    <>
      <div className="font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white">
        Cover Period and Amount
      </div>
      <form onSubmit={() => {}} className="relative">
        <div className="mb-2">
          <DeviceSelect
            {...props}
            showColumnLayout
            fieldTitle="Device"
            selectedOption={deviceType}
            setSelectedOption={setDeviceType}
            dropdownOptions={deviceOptions}
            showSearchOption={false}
          />
        </div>
        <div className="mb-2">
          <DeviceSelect
            {...props}
            showColumnLayout
            fieldTitle="Brand"
            selectedOption={brand}
            setSelectedOption={setBrand}
            dropdownOptions={deviceDetails?.brand || []}
            showSearchOption="true"
          />
        </div>
        <div className="mb-2">
          <DeviceSelect
            {...props}
            showColumnLayout
            fieldTitle="Value"
            selectedOption={value}
            setSelectedOption={setValue}
            dropdownOptions={deviceDetails?.device_values || {}}
          />
        </div>
        <div className="mb-2">
          <DeviceSelect
            {...props}
            showColumnLayout
            fieldTitle="Purchase Month"
            selectedOption={purchaseMonth}
            setSelectedOption={setPurchaseMonth}
            dropdownOptions={deviceDetails?.purchase_month || []}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-3 mb-3">
          {planPriceArr
            ? planPriceArr.map((option) => (
                <label key={uniqid()}>
                  <input
                    id="sample"
                    name="sample"
                    type="radio"
                    className="hidden"
                    value={option}
                    onClick={() => setPlanType(option)}
                  />
                  <div
                    className={classNames(
                      planType === option ? 'border-primary-gd-1 dark:border-white' : '',
                      'bg-white dark:bg-featureCard-dark-bg rounded-xl cursor-pointer border-2 border-transparent shadow-devicePriceBoxShadow w-full py-3 px-2 text-center font-Montserrat text-body-xs text-black dark:text-white font-semibold',
                    )}
                  >
                    {option.plan_type === 'monthly' ? '1 month plan' : '12 month plan'}{' '}
                    <div className="mt-1 text-dark-blue text-body-md dark:text-white">
                      {option.plan_currency} {option.plan_total_price}
                    </div>
                  </div>
                </label>
              ))
            : ''}
        </div>
        {/* <DeviceSelect
          {...props}
          readOnly
          fieldTitle="Quote"
          fieldValue={quoteField}
          setFieldValue={setQuoteField}
          selectedOption={quoteSelect}
          setSelectedOption={setQuoteSelect}
          dropdownOptions={amountOptions}
        /> */}
      </form>

      <div className="grid grid-cols-12 gap-3 w-full">
        <button
          type="button"
          onClick={handleAddToCart}
          className="col-span-6 px-4 py-3 outline-none border-0 bg-white rounded-xl text-primary-gd-1 font-Montserrat font-semibold text-body-md shadow-addToCart"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="col-span-6 py-3 outline-none border-0 bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 rounded-xl text-white font-Montserrat font-semibold text-body-md shadow-buyInsurance"
          onClick={handleClick}
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default DeviceBuyBox;
