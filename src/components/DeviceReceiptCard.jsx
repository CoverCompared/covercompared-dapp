import React from 'react';
import { detach } from 'redux-saga';

import CoverComparedLogo from '../assets/img/logo-final-light.png';
import P4LLogo from '../assets/img/p4l-logo.png';
import { shortenTxHash } from '../utils';

const DeviceReceiptCard = (props) => {
  const {
    txn_hash,
    payment_hash,
    transaction_link,
    network_name,
    crypto_currency,
    quote,
    total,
    discountAmount,
    fName,
    lName,
    phone,
    email,
    deviceType,
    brand,
    value,
    purchaseMonth,
    plan_currency,
    imei_or_serial_number,
    selectedModel,
    logo = P4LLogo,
  } = props;

  const getCurrentDate = () => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${date > 9 ? date : 0 + date}-${month > 9 ? month : 0 + month}-${year}`;
  };

  return (
    <>
      <div className="bg-white rounded-lg mt-8 w-full md:p-8 px-4 py-6 shadow-lg">
        <img loading="lazy" src={logo} alt="MSO" className="h-12" />
        <div className="flex justify-between">
          <img loading="lazy" src={CoverComparedLogo} alt="CoverCompared" className="h-20" />
          <div className="text-dark-blue font-medium font-Montserrat md:text-body-md text-body-xs">
            Date: {getCurrentDate()}
          </div>
        </div>

        <div className="grid md:grid-cols-12 md:gap-6 gap-8 xl:gap-10 mt-6">
          <div className="col-span-12 lg:col-span-5">
            <div className="text-dark-blue font-semibold font-Montserrat md:text-h6 text-body-md text-left mb-2">
              Device Insurance
            </div>
            <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
              Policy ID : {txn_hash}
            </div>
            <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
              First Name : {fName}
            </div>
            <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
              Last Name : {lName}
            </div>
            <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
              Phone : {phone}
            </div>
            <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
              Email : {email}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="text-dark-blue font-semibold font-Montserrat md:text-h6 text-body-md text-left mb-2">
              Device Details
            </div>

            <div className="flex items-center justify-between font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                Device Type
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                {deviceType}
              </div>
            </div>
            <div className="flex items-center justify-between w-full font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                Device Brand
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                {brand}
              </div>
            </div>
            <div className="flex items-center justify-between w-full font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                Device Value
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                {value} {plan_currency}
              </div>
            </div>
            <div className="flex items-center justify-between w-full font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                Purchase Month
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                {purchaseMonth}
              </div>
            </div>
            <div className="flex items-center justify-between w-full font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                IMEI or Serial Number
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                {imei_or_serial_number}
              </div>
            </div>
            <div className="flex items-center justify-between font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm mr-2 text-left">
                Device Model
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm text-right">
                {typeof selectedModel === 'string'
                  ? selectedModel
                  : selectedModel?.model_name || ''}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 md:gap-6 gap-8 xl:gap-10 mt-8">
          {payment_hash && (
            <div className="col-span-12 lg:col-span-5">
              <div className="text-dark-blue font-semibold font-Montserrat md:text-h6 text-body-md text-left mb-2">
                Transaction Details
              </div>
              <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
                Tnx Hash:{' '}
                <a
                  className="text-blue-900"
                  href={transaction_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortenTxHash(payment_hash)}
                </a>
              </div>
              <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
                Network: Ethereum {network_name}
              </div>
              <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
                Currency: {crypto_currency}
              </div>
            </div>
          )}

          <div className="col-span-12 lg:col-span-7">
            <div className="text-dark-blue font-semibold font-Montserrat md:text-h6 text-body-md text-left mb-2">
              Payment Details
            </div>
            <div className="flex items-center justify-between w-full font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                Premium
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                {quote} USD
              </div>
            </div>
            <div className="flex items-center justify-between w-full font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                Discount
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                {discountAmount} USD
              </div>
            </div>
            <hr />
            <div className="flex items-center justify-between w-full text-body-dark-bg mt-2 font-Montserrat text-body-lg font-semibold">
              <div>Total</div>
              <div className="md:text-body-md">{total} USD</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeviceReceiptCard;
