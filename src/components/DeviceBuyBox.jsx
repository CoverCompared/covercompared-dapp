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

  const [deviceType, setDeviceType] = useState(deviceOptions[0] || '');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState('');
  const [purchaseMonth, setPurchaseMonth] = useState('');
  const [quoteField, setQuoteField] = useState('');
  const [quoteSelect, setQuoteSelect] = useState(amountOptions[0]);
  const [devicePlansDetails, setDevicePlansDetails] = useState('');
  const [plans, setPlans] = useState([]);
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
      setDevicePlansDetails(devicePlanDetails);
      setPlanBenefits(devicePlanDetails.plan_benefit);
      const plansArr = devicePlanDetails.plan_price;
      setPlans(plansArr);
      const monthlyObj = plansArr.filter((obj) => obj.plan_type === 'monthly');
      const yearlyObj = plansArr.filter((obj) => obj.plan_type === 'yearly');

      setMonthlyPrice(...monthlyObj);
      setYearlyPrice(...yearlyObj);
      // console.log(...yearlyObj);
      // console.log(...monthlyObj);
      setPlanType(plansArr[1]);
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
    alert('Buy Now button clicked');
  };

  return (
    <>
      <form onSubmit={() => {}}>
        <div className="font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white text-left">
          1- Select Device Details
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

        <div className="my-6">
          <div className="grid grid-cols-2 md:gap-y-3 gap-y-2 gap-x-4">
            {planBenefits.map((point) => (
              <div
                key={uniqid()}
                className="font-semibold font-Montserrat md:text-body-sm text-body-xs text-dark-blue flex col-span-2 md:col-span-1 text-left"
              >
                <img src={CheckIcon} alt="" className="md:h-4 md:w-4 h-3 w-3 mr-2 mt-1" />{' '}
                <div>{point}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white text-left">
          2- Select Plan
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          {plans.map((planObj) => (
            <label>
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
                  planType === planObj
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
                    planObj.plan_discount > 0 ? 'pl-5' : '  ',
                    'text-dark-blue md:text-body-md text-body-2xs dark:text-white',
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
          ))}
        </div>
      </form>

      <div className="w-full mt-5 flex justify-center items-center">
        <button
          type="button"
          // disabled={!planType}
          onClick={handleBuyNow}
          className="py-3 px-5 outline-none border-0 rounded-xl text-white font-Montserrat font-semibold md:text-h6 text-body-md shadow-buyInsurance bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default DeviceBuyBox;
