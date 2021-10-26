import React from 'react';

import CoverComparedLogo from '../assets/img/logo-final-light.png';
import P4LLogo from '../assets/img/p4l-logo.png';

const DeviceReceiptCard = (props) => {
  const {
    txn_hash,
    quote,
    discount,
    total,
    tax,
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
    value,
    purchaseMonth,
    plan_currency,
    selectedModel,
  } = props;

  console.log('props :>> ', props);

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
        <div className="flex justify-between">
          <img src={CoverComparedLogo} alt="CoverCompared" className="h-10" />
          <div className="text-dark-blue font-medium font-Montserrat md:text-body-md text-body-xs">
            Date: {getCurrentDate()}
          </div>
        </div>
        <img src={P4LLogo} alt="MSO" className="w-24 h-auto my-5" />

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
              Phone : {email}
            </div>
            <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
              Email : {phone}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="text-dark-blue font-semibold font-Montserrat md:text-h6 text-body-md text-left mb-2">
              Device Details
            </div>
            <div className="flex items-center justify-between font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm mr-2 text-left">
                Device Model
              </div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm text-right">
                {selectedModel && selectedModel.model_name}
              </div>
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
          </div>
        </div>

        <div className="grid md:grid-cols-12 md:gap-6 gap-8 xl:gap-10 mt-8">
          <div className="col-span-12 col-start-1 lg:col-span-7 lg:col-start-6">
            <div className="text-dark-blue font-semibold font-Montserrat md:text-h6 text-body-md text-left">
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
            <div className="flex items-center justify-between w-full font-Montserrat">
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">Tax</div>
              <div className="font-medium font-Montserrat md:text-body-lg text-body-sm">
                {tax} USD
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
