import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InputWithSelect from './common/InputWithSelect';
import { getDeviceDetails, getDevicePlanDetails } from '../redux/actions/CoverList';
import Select from './common/Select';

const deviceOptions = [{ option: 'Tab' }, { option: 'Mobile' }, { option: 'Laptop' }];
const brandOptions = [
  {
    option: 'Apple',
    // icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Samsung',
    // icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Oppo',
    // icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Vivo',
    // icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Motorola',
    // icon: 'https://via.placeholder.com/100',
  },
];
const valueOptions = [{ option: '$1000' }, { option: '$2000' }, { option: '$5000' }];
const purchaseMonthOptions = [
  { option: 'January' },
  { option: 'February' },
  { option: 'March' },
  { option: 'April' },
  { option: 'May' },
  { option: 'June' },
  { option: 'July' },
  { option: 'August' },
  { option: 'September' },
  { option: 'October' },
  { option: 'November' },
  { option: 'December' },
];
const amountOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'CVR'];

const DeviceBuyBox = (props) => {
  const { coverListData } = props;
  const { deviceDetails, devicePlanDetails, loader } = coverListData || {};

  const [deviceType, setDeviceType] = useState(null);
  const [brand, setBrand] = useState(deviceDetails?.brand?.[0] || '');
  const [value, setValue] = useState(deviceDetails?.device_values?.[0] || '');
  const [purchaseMonth, setPurchaseMonth] = useState(deviceDetails?.purchase_month?.[0] || '');
  const [quoteField, setQuoteField] = useState('350');
  const [quoteSelect, setQuoteSelect] = useState(amountOptions[0]);

  useEffect(() => {
    props.getDeviceDetails({
      endpoint: 'device-details',
      device: 'Mobile Phone',
      partner_code: 'Crypto',
    });
  }, [deviceType]);

  return (
    <>
      <div className="font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white">
        Cover Period and Amount
      </div>
      <form onSubmit={() => {}}>
        <Select
          {...props}
          fieldTitle="Device"
          options={deviceOptions}
          selectedOption={deviceType}
          setSelectedOption={setDeviceType}
        />
        <Select
          {...props}
          fieldTitle="Brand"
          options={brandOptions}
          selectedOption={brand}
          setSelectedOption={setBrand}
        />
        <Select
          {...props}
          fieldTitle="Device Value"
          options={valueOptions}
          selectedOption={value}
          setSelectedOption={setValue}
        />
        <Select
          {...props}
          fieldTitle="Device Purchase Month"
          options={purchaseMonthOptions}
          selectedOption={purchaseMonth}
          setSelectedOption={setPurchaseMonth}
        />

        <InputWithSelect
          {...props}
          readOnly
          fieldTitle="Quote"
          fieldValue={quoteField}
          setFieldValue={setQuoteField}
          selectedOption={quoteSelect}
          setSelectedOption={setQuoteSelect}
          dropdownOptions={amountOptions}
        />
      </form>

      <div className="grid grid-cols-12 gap-3 w-full">
        <button
          type="button"
          className="col-span-5 px-4 py-3 mr-3 outline-none border-0 bg-white rounded-xl text-primary-gd-1 font-Montserrat font-semibold text-body-md shadow-addToCart"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="col-span-7 py-3 px-2 outline-none border-0 bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 rounded-xl text-white font-Montserrat font-semibold text-body-md shadow-buyInsurance"
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

const mapStateToProps = ({ coverList }) => ({
  coverListData: coverList,
});

export default connect(mapStateToProps, { getDeviceDetails, getDevicePlanDetails })(DeviceBuyBox);
