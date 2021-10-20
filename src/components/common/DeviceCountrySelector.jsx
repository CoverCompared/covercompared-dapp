import React from 'react';

import DeviceBuyBox from '../DeviceBuyBox';

const DeviceCountrySelector = ({ setIsModalOpen, setTitle, setMaxWidth }) => {
  return <DeviceBuyBox {...{ setIsModalOpen, setTitle, setMaxWidth }} />;
};
export default DeviceCountrySelector;
