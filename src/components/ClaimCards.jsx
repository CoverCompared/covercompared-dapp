import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClaimCards = ({ policyId, wallet_address }) => {
  const [claimId, setClaimId] = useState('');
  const newPageUrl = `https://app.nexusmutual.io/home/proof-of-loss/add-affected-addresses?coverId=${policyId}&owner=${wallet_address}`;

  return (
    <>
      <div className="grid grid-cols-2 md:gap-8 gap-y-6 mt-6 z-auto relative">
        <div className="w-full z-100 relative col-span-2 md:col-span-1 pt-8 px-16 pb-11 shadow-md flex flex-col justify-center items-center rounded-2xl bg-white dark:bg-featureCard-dark-bg">
          {/* <div className="py-3 px-6 mb-6 rounded-2xl border-2 border-primary-gd-1 dark:border-white border-solid text-primary-gd-1 dark:text-white font-Montserrat font-semibold text-h5 ">
            Step 1
          </div> */}
          <div className="text-dark-blue font-medium font-Montserrat text-h6 text-center leading-7 text dark:text-white">
            Go to{' '}
            <Link to={newPageUrl} className="font-semibold underline" target="_blank">
              LINK
            </Link>{' '}
            and <br /> submit Proof
          </div>
        </div>
        <div className="w-full  col-span-2 md:col-span-1 pt-8 px-16 pb-11 bg-white dark:bg-featureCard-dark-bg shadow-md flex flex-col justify-center items-center rounded-2xl">
          {/* <div className="py-3 px-6 mb-6 rounded-2xl border-2 border-primary-gd-1 border-solid text-primary-gd-1 dark:text-white dark:border-white font-Montserrat font-semibold text-h5 dark:bg-featureCard-dark-bg">
            Step 2
          </div> */}
          {/* <div className="text-dark-blue font-medium font-Montserrat text-h6 text-center leading-7 dark:text-white">
            File a claim
          </div> */}
          <div className="flex justify-center items-center">
            {/* <input
              type="text"
              value={claimId}
              onChange={(e) => setClaimId(e.target.value)}
              className="mr-2 border-0 border-b-2 border-dark-blue outline-none w-20 focus:ring-0 text-dark-blue dark:border-white dark:text-white h-8 focus:border-dark-blue bg-transparent"
            /> */}
            <button
              type="button"
              className="border-0 border-b-2 border-dark-blue dark:border-white h-8 text-dark-blue dark:text-white font-semibold font-Montserrat text-body-h6"
            >
              File claim
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClaimCards;
