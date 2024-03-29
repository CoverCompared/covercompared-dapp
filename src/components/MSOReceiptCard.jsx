import React from 'react';
import dayjs from 'dayjs';

import msoLogo from '../assets/img/mso-logo.png';
import { shortenTxHash } from '../utils';
import { mso_countries } from '../functions/data';

import CoverComparedLogo from '../assets/img/logo-final-light.png';
import WishingWell from '../assets/img/wishing-well-logo.png';
import WCD from '../assets/img/world-class-doctor-logo.png';

const MSOReceiptCard = (props) => {
  const {
    txn_hash,
    payment_hash,
    transaction_link,
    network_name,
    crypto_currency,
    currency,
    membersInfo,
    quote,
    total,
    discountAmount,
    addonServices,
    MSOAddOnService,
    name,
    logo = msoLogo,
    MSOCoverUser,
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
        <div className="grid grid-cols-12 gap-x-5 gap-y-2 mt-2 mb-4 md:divide-x-2">
          <div className="w-full flex flex-col items-center col-span-12 md:col-span-5 self-center md:pr-2">
            <img
              loading="lazy"
              src={WishingWell}
              alt=""
              className="w-auto h-28 p-3 dark:bg-white"
            />
          </div>
          <div className="w-full flex flex-col items-center col-span-12 md:col-span-7 self-center md:pl-7">
            <img loading="lazy" src={WCD} alt="" className="w-auto h-28 p-3 dark:bg-white" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 text-center text-white font-semibold mb-10">
          INTERNATIONAL MEDICAL SECOND OPINION
        </div>
        <div className="flex justify-between">
          <img loading="lazy" src={CoverComparedLogo} alt="CoverCompared" className="h-20" />
          <div className="text-dark-blue font-medium font-Montserrat md:text-body-md text-body-xs">
            Date: {getCurrentDate()}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="text-dark-blue font-semibold font-Montserrat md:text-h6 text-body-md text-left">
              {name}
            </div>
            <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
              {MSOCoverUser}
            </div>
          </div>

          {payment_hash && (
            <div>
              <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
                Policy Number: {txn_hash || '-'}
              </div>
              <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
                Tnx Hash:{' '}
                <a
                  className="text-blue-900"
                  href={transaction_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortenTxHash(payment_hash) || '-'}
                </a>
              </div>
              <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
                Network : Ethereum {network_name || ''}
              </div>
              <div className="text-dark-blue font-medium font-Montserrat md:text-body-lg text-body-sm text-left">
                Currency: {crypto_currency || '-'}
              </div>
            </div>
          )}
        </div>

        <div className="w-full mb-8 mt-8">
          <div className="grid grid-cols-12 w-full text-center bg-gray-200">
            <div className="lg:col-span-2 col-span-12 border border-black md:text-body-sm text-dark-blue font-Montserrat text-body-xs">
              User type
            </div>
            <div className="lg:col-span-2 col-span-12 border border-black md:text-body-sm text-dark-blue font-Montserrat text-body-xs">
              First Name
            </div>
            <div className="lg:col-span-2 col-span-12 border border-black md:text-body-sm text-dark-blue font-Montserrat text-body-xs">
              Last Name
            </div>
            <div className="lg:col-span-2 col-span-12 border border-black md:text-body-sm text-dark-blue font-Montserrat text-body-xs">
              Country
            </div>
            <div className="lg:col-span-2 col-span-12 border border-black md:text-body-sm text-dark-blue font-Montserrat text-body-xs">
              DOB
            </div>
            <div className="lg:col-span-2 col-span-12 border border-black md:text-body-sm text-dark-blue font-Montserrat text-body-xs">
              Identity
            </div>
          </div>

          {membersInfo.map((member, index) => (
            <div key={index} className="grid grid-cols-12 w-full">
              <div className="lg:col-span-2 col-span-12 border border-black text-center font-Montserrat md:text-body-sm text-body-xs">
                {member.userType || member.user_type || ''}
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black text-center font-Montserrat md:text-body-sm text-body-xs">
                {member.firstName || member.first_name || ''}
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black text-center font-Montserrat md:text-body-sm text-body-xs">
                {member.lastName || member.last_name || ''}
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black text-center font-Montserrat md:text-body-sm text-body-xs">
                {mso_countries.find((f) => f.value === member.country)?.label || ''}
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black text-center font-Montserrat md:text-body-sm text-body-xs">
                {dayjs(member.dob).format('DD/MM/YYYY')}
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black text-center font-Montserrat md:text-body-sm text-body-xs">
                {member.identity}
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-8">
            <div className="xl:w-5/12 lg:w-1/2 w-full">
              <div className="text-dark-blue font-semibold font-Montserrat md:text-h6 text-body-md text-left">
                Payment Details
              </div>
              <div className="flex items-center justify-between w-full font-Montserrat">
                <h5 className="md:text-body-md text-body-sm  font-medium">Premium</h5>
                <h5 className="md:text-body-sm text-body-xs font-medium">{quote} USD</h5>
              </div>
              {!!addonServices && (
                <div className="flex items-center justify-between w-full font-Montserrat">
                  <h5 className="md:text-body-md text-body-sm  font-medium">
                    Add on concierge services
                  </h5>
                  <h5 className="md:text-body-sm text-body-xs font-medium">
                    {MSOAddOnService} USD
                  </h5>
                </div>
              )}
              <div className="flex items-center justify-between w-full font-Montserrat">
                <h5 className="md:text-body-md text-body-sm  font-medium">Discount</h5>
                <h5 className="md:text-body-sm text-body-xs font-medium">{discountAmount} USD</h5>
              </div>
              <hr />
              <div className="flex items-center justify-between w-full text-body-dark-bg mt-2 font-Montserrat text-body-lg font-semibold">
                <h5>Total</h5>
                <h5 className="md:text-body-md">{total} USD</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full text-body-dark-bg mt-10 font-Montserrat text-body-sm font-medium">
          <h5>
            Note - Membership pack including the certificate and plan details will be emailed
            directly by the Medical Second Option team to the email address shared at the time of
            purchase. You will receive all the necessary information via email within 10 working
            days from the date of issue of this receipt.
          </h5>
        </div>
      </div>
    </>
  );
};
export default MSOReceiptCard;
