import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import InputWithSelect from './common/InputWithSelect';
import SelectWithSearch from './common/SelectWithSearch';
import { getDeviceDetails, getDevicePlanDetails } from '../redux/actions/CoverList';
import { classNames } from '../functions/utils';
import { setLoginModalVisible, setRegisterModalVisible } from '../redux/actions';
import CheckIcon from '../assets/icons/check.png';

const deviceOptions = ['Mobile Phone', 'Laptop', 'Tablet', 'Smart Watch', 'Portable Speakers'];
const amountOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'CVR'];

const DeviceBuyBox = (props) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const coverListData = useSelector((state) => state.coverList);
  const { is_verified } = useSelector((state) => state.auth);
  const { deviceDetails, devicePlanDetails, loader } = coverListData || {};

  const { setIsModalOpen } = props;

  const [deviceType, setDeviceType] = useState(deviceOptions[0] || '');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState('');
  const [purchaseMonth, setPurchaseMonth] = useState('');
  const [quoteField, setQuoteField] = useState('');
  const [quoteSelect, setQuoteSelect] = useState(amountOptions[0]);
  const [devicePlans, setDevicePlans] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [yearlyPrice, setYearlyPrice] = useState('');
  const [planType, setPlanType] = useState('');
  const [planBenefits, setPlanBenefits] = useState([]);

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
      setPlanBenefits(devicePlanDetails.plan_benefit);

      const plansArr = devicePlanDetails.plan_price;
      const monthlyObj = plansArr.filter((obj) => obj.plan_type === 'monthly');
      const yearlyObj = plansArr.filter((obj) => obj.plan_type === 'yearly');

      setMonthlyPrice(...monthlyObj);
      setYearlyPrice(...yearlyObj);
      console.log(...yearlyObj);
      console.log(...monthlyObj);
      setPlanType('yearly');
    }
  }, [devicePlanDetails]);

  const handleBuyNow = (e) => {
    if (e) e.stopPropagation();
    if (!account) {
      dispatch(setLoginModalVisible(true));
      dispatch(setRegisterModalVisible(true));
      return;
    }
    if (is_verified === false) {
      dispatch(setRegisterModalVisible(true));
      return;
    }
    const handleSubmit = (e) => {
      if (e) e.preventDefault();
      setIsModalOpen(false);
      toast.success('Policy bought successfully');
    };
  };

  return (
    <>
      <form onSubmit={() => {}}>
        <div className="font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white">
          1- Select Device Details
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <SelectWithSearch
            {...props}
            showColumnLayout
            fieldTitle="Device"
            selectedOption={deviceType}
            setSelectedOption={setDeviceType}
            dropdownOptions={deviceOptions}
            showSearchOption="true"
          />
          <SelectWithSearch
            {...props}
            showColumnLayout
            fieldTitle="Brand"
            selectedOption={brand}
            setSelectedOption={setBrand}
            dropdownOptions={deviceDetails?.brand || []}
            showSearchOption="true"
          />
          <SelectWithSearch
            {...props}
            showColumnLayout
            fieldTitle="Value"
            selectedOption={value}
            setSelectedOption={setValue}
            dropdownOptions={deviceDetails?.device_values || {}}
            showSearchOption="true"
          />
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

        <div className="my-6">
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            {planBenefits.map((point) => (
              <div
                key={uniqid()}
                className="font-semibold font-Montserrat text-body-sm text-dark-blue flex"
              >
                <img src={CheckIcon} alt="" className="h-4 mr-2 mt-1" /> <div>{point}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white">
          2- Select Plan
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <label>
            <input
              id="sample"
              name="sample"
              type="radio"
              className="hidden"
              value="monthly"
              onClick={() => setPlanType('monthly')}
            />
            <div
              className={classNames(
                planType === 'monthly'
                  ? 'border-2 border-primary-gd-1 dark:border-white'
                  : 'border border-gray-300',
                'bg-white dark:bg-featureCard-dark-bg rounded-xl cursor-pointer shadow-devicePriceBoxShadow w-full py-3 px-2 text-center font-Montserrat text-body-xs text-black dark:text-white font-semibold',
              )}
            >
              {'Monthly'}{' '}
              <div className="mt-1 text-dark-blue text-body-md dark:text-white">
                {monthlyPrice
                  ? `${monthlyPrice.plan_total_price} ${monthlyPrice.plan_currency}`
                  : '-'}
              </div>
            </div>
          </label>
          <label>
            <input
              id="sample"
              name="sample"
              type="radio"
              className="hidden"
              value="yearly"
              onClick={() => setPlanType('yearly')}
            />
            <div
              className={classNames(
                planType === 'yearly'
                  ? 'border-2 border-primary-gd-1 dark:border-white'
                  : 'border border-gray-300',
                'bg-white dark:bg-featureCard-dark-bg rounded-xl cursor-pointer shadow-devicePriceBoxShadow w-full py-3 px-2 text-center font-Montserrat text-body-xs text-black dark:text-white font-semibold',
              )}
            >
              {'Yearly'}{' '}
              <div className="mt-1 text-dark-blue text-body-md dark:text-white">
                {yearlyPrice ? `${yearlyPrice.plan_total_price} ${yearlyPrice.plan_currency}` : '-'}
              </div>
            </div>
          </label>
        </div>
      </form>

      <div className="w-full mt-5 flex justify-center items-center">
        <button
          type="button"
          // disabled={!planType}
          onClick={handleBuyNow}
          className="py-3 px-5 outline-none border-0 rounded-xl text-white font-Montserrat font-semibold text-body-md shadow-buyInsurance bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default DeviceBuyBox;
