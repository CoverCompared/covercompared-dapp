import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Select from './common/Select';

const deviceOptions = [{ option: 'Tab' }, { option: 'Mobile' }, { option: 'Laptop' }];
const brandOptions = [
  {
    option: 'Apple',
    icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Samsung',
    icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Oppo',
    icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Vivo',
    icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Motorola',
    icon: 'https://via.placeholder.com/100',
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

const DeviceQuickSearch = (props) => {
  const history = useHistory();
  const [device, setDevice] = useState(null);
  const [brand, setBrand] = useState(null);
  const [value, setValue] = useState(null);
  const [purchaseMonth, setPurchaseMonth] = useState(null);

  if (device && brand && value && purchaseMonth) history.push('/product/device');

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-20 bg-body-bg dark:bg-body-dark-bg">
      <div className="col-span-1">
        <Select
          {...props}
          fieldTitle="Device"
          options={deviceOptions}
          selectedOption={device}
          setSelectedOption={setDevice}
        />{' '}
      </div>
      <div className="col-span-1">
        <Select
          {...props}
          fieldTitle="Device Brand"
          options={brandOptions}
          selectedOption={brand}
          setSelectedOption={setBrand}
        />{' '}
      </div>
      <div className="col-span-1">
        <Select
          {...props}
          fieldTitle="Device Value"
          options={valueOptions}
          selectedOption={value}
          setSelectedOption={setValue}
        />{' '}
      </div>
      <div className="col-span-1">
        <Select
          {...props}
          fieldTitle="Device Purchase Month"
          options={purchaseMonthOptions}
          selectedOption={purchaseMonth}
          setSelectedOption={setPurchaseMonth}
        />{' '}
      </div>
    </div>
  );
};

export default DeviceQuickSearch;
