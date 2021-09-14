import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InputWithSelect from './common/InputWithSelect';
import { getDeviceDetails, getDevicePlanDetails } from '../redux/actions/CoverList';

const deviceOptions = ['Mobile Phone', 'Laptop', 'Tablet', 'Smart Watch', 'Portable Speakers'];
const amountOptions = ['ETH', 'BTC', 'USDT', 'USDC', 'CVR'];

const DeviceBuyBox = (props) => {
  const { coverListData } = props;
  const { deviceDetails, devicePlanDetails, loader } = coverListData || {};

  const [device, setDevice] = useState(deviceOptions[0]);
  const [brand, setBrand] = useState(deviceDetails?.brand?.[0] || '');
  const [value, setValue] = useState(deviceDetails?.device_values?.[0] || '');
  const [purchaseMonth, setPurchaseMonth] = useState(deviceDetails?.purchase_month?.[0] || '');
  const [quoteField, setQuoteField] = useState('350');
  const [quoteSelect, setQuoteSelect] = useState(amountOptions[0]);

  useEffect(() => {
    props.getDeviceDetails({ device, partner_code: 'Crypto' });
  }, [device]);

  return (
    <>
      <div className="font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white">
        Cover Period and Amount
      </div>
      <form onSubmit={() => {}}>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <InputWithSelect
            {...props}
            showColumnLayout
            fieldTitle="Device"
            selectedOption={device}
            setSelectedOption={setDevice}
            dropdownOptions={deviceOptions}
          />
          <InputWithSelect
            {...props}
            showColumnLayout
            fieldTitle="Brand"
            selectedOption={brand}
            setSelectedOption={setBrand}
            dropdownOptions={deviceDetails?.brand || []}
          />
          <InputWithSelect
            {...props}
            showColumnLayout
            fieldTitle="Value"
            selectedOption={value}
            setSelectedOption={setValue}
            dropdownOptions={deviceDetails?.device_values || []}
          />
          <InputWithSelect
            {...props}
            showColumnLayout
            fieldTitle="Purchase Month"
            selectedOption={purchaseMonth}
            setSelectedOption={setPurchaseMonth}
            dropdownOptions={deviceDetails?.purchase_month || []}
          />
        </div>
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
