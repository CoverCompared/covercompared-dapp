import React, { useState, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';

import { PDFViewer } from '@react-pdf/renderer';
import DownloadPolicy from './DownloadPolicy';
import useAuth from '../../hooks/useAuth';
import SUPPORTED_WALLETS from '../../config/walletConfig';
import MsoUserInfoForm from '../MsoUserInfoForm';
import MSOReceipt from '../MSOReceipt';

const countries = [
  { value: 'UAE', label: 'United Arab Emirates' },
  { value: 'QAT', label: 'Qatar' },
  { value: 'OMN', label: 'Oman' },
  { value: 'KWT', label: 'Kuwait' },
  { value: 'USA', label: 'United States' },
  { value: 'BHR', label: 'Bahrain' },
  { value: 'SAU', label: 'Saudi Arabia' },
  { value: 'NOT', label: 'None of Them' },
];

const MsoCountrySelector = ({
  setIsModalOpen,
  setMaxWidth,
  setTitle,
  selectedPlan,
  addonServices,
}) => {
  const { login } = useAuth();
  const { account } = useWeb3React();
  const [curWalletId, setCurWalletId] = useState('injected');
  const [connectStatus, setConnectStatus] = useState(false);
  const [membersInfo, setMembersInfo] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState(false);

  useEffect(() => {
    if (!account) {
      setTitle('Login');
      setMaxWidth('max-w-2xl');
    }
  }, []);

  const tryActivation = (connect) => {
    setCurWalletId(connect);
    setConnectStatus(true);
    login(connect);
  };

  const handleBuyNow = (members) => {
    setMembersInfo(members);
    setShowConfirmation(true);
    setMaxWidth('max-w-lg');
    setTitle('Confirmation');
  };

  const handleConfirm = () => {
    setShowReceipt(true);
    setMaxWidth('max-w-5xl');
    setTitle('Receipt');
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

  if (!account) {
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
    const { quote = '0', MSOAddOnService = '0', tax = '5', name, logo } = selectedPlan;
    const discount = addonServices ? ((+quote + +MSOAddOnService) * 25) / 100 : (+quote * 25) / 100;
    const discountAmount = applyDiscount ? discount : 0;
    const total = addonServices
      ? +quote + +MSOAddOnService + +tax - discountAmount
      : +quote + +tax - discountAmount;
    return (
      <>
        <div className="flex">
          <PDFViewer className="w-full h-80">
            <MSOReceipt
              {...{
                membersInfo,
                quote,
                discount,
                total,
                tax,
                discountAmount,
                addonServices,
                applyDiscount,
                MSOAddOnService,
                name,
                logo,
              }}
            />
          </PDFViewer>
        </div>

        <div className="flex justify-end">
          <DownloadPolicy
            pdf={
              <MSOReceipt
                {...{
                  membersInfo,
                  quote,
                  discount,
                  total,
                  tax,
                  discountAmount,
                  addonServices,
                  applyDiscount,
                  MSOAddOnService,
                  name,
                }}
              />
            }
            fileName="MSO_Policy_Receipt.pdf"
          />
        </div>
        {/* <button
          type="button"
          className="py-3 px-5 mt-8 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
        >
          <PDFDownloadLink
            document={
              
            }
            
          >
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        </button> */}
      </>
    );
  }

  if (showConfirmation) {
    const { quote = '0', MSOAddOnService = '0', tax = '5' } = selectedPlan;
    const discount = addonServices ? ((+quote + +MSOAddOnService) * 25) / 100 : (+quote * 25) / 100;
    const discountAmount = applyDiscount ? discount : 0;
    const total = addonServices
      ? +quote + +MSOAddOnService + +tax - discountAmount
      : +quote + +tax - discountAmount;

    return (
      <div>
        <div className="flex items-center justify-between w-full">
          <h5 className="text-h6 font-medium">Premium</h5>
          <h5 className="text-body-lg font-medium">{quote} USD</h5>
        </div>
        {!!addonServices && (
          <div className="flex items-center justify-between w-full">
            <h5 className="text-h6 font-medium">Add on concierge services</h5>
            <h5 className="text-body-lg font-medium">{MSOAddOnService} USD</h5>
          </div>
        )}
        <div className="flex items-center justify-between w-full">
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
        <div className="flex items-center justify-between w-full">
          <h5 className="text-h6 font-medium">Discount</h5>
          <h5 className="text-body-lg font-medium">{discountAmount} USD</h5>
        </div>
        <div className="flex items-center justify-between w-full">
          <h5 className="text-h6 font-medium">Tax</h5>
          <h5 className="text-body-lg font-medium">{tax} USD</h5>
        </div>
        <hr />
        <div className="flex items-center justify-between w-full">
          <h5 className="text-h6 font-medium">Total</h5>
          <h5 className="text-body-lg font-medium">{total} USD</h5>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            onClick={handleConfirm}
            className="py-3 px-5 mt-8 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            Confirm to Pay
          </button>
        </div>
      </div>
    );
  }

  return (
    <MsoUserInfoForm
      {...{
        ...selectedPlan,
        countries,
        setIsModalOpen,
        handleBuyNow,
      }}
    />
  );
};
export default MsoCountrySelector;
