import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { LinkIcon } from '@heroicons/react/outline';

import Modal from './common/Modal';
import ClaimCards from './ClaimCards';
import useClaimForCover from '../hooks/useClaimForCover';

import placeholderLogo from '../assets/img/placeholder.png';

const CryptoExchangeCard = ({ policy }) => {
  const history = useHistory();
  const {
    _id,
    details,
    logo = placeholderLogo,
    crypto_amount,
    crypto_currency,
    review,
    wallet_address,
    payment: { transaction_link } = {},
  } = policy;
  const { company_code, name, duration_days, token_id } = details;

  const [redeemable, setRedeemable] = useState(false);
  const { getPayoutOutcome, onNMRedeemClaim } = useClaimForCover();
  const [claimId, setClaimId] = useState(null);
  useEffect(() => {
    const fetch = () => {
      const timer = setTimeout(async () => {
        const { status, amountPaid, coverAsset } = await getPayoutOutcome(claimId);
        if (status === 'passed') {
          setRedeemable(true);
        } else {
          fetch();
        }
      }, 1000);
    };
  }, [claimId]);

  const onSubmitted = (claimId) => {
    setClaimId(claimId);
  };

  const redeemClaim = async () => {
    const txRedeem = await onNMRedeemClaim(token_id, claimId);
    if (txRedeem.status) {
      toast.success('Claim requested successfully!');
    } else {
      toast.warning('Failed to redeem claim!');
    }
  };

  return (
    <div
      className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl flex flex-row justify-between mb-4 relative"
      key={_id}
    >
      <div className="flex items-center h-full w-full">
        <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl shadow-2xl p-1 relative bg-white">
          <img loading="lazy" src={logo} alt={name} className="h-full w-full rounded-xl" />
        </div>
        <div className="flex flex-col">
          <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-row items-center">
            <div>{`${name} - ${company_code} `}</div>
          </div>
          <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">
            {`${crypto_amount} ${crypto_currency} - ${duration_days} days`}
          </div>
        </div>
      </div>

      <div className="flex sm:justify-end items-center min-w-max">
        <button
          type="button"
          onClick={() => window.open(transaction_link, '_blank')}
          className="p-3 md:mr-3 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text rounded-xl "
        >
          <LinkIcon title="Transaction details" className="w-5 h-5" />
        </button>
        {!review?.length && (
          <button
            type="button"
            onClick={() => history.push(`submit-review/${_id}`)}
            className="md:px-5 p-3 md:mr-3 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
          >
            Submit Review
          </button>
        )}

        {company_code === 'nexus' &&
          // replace the true with condition which check whether claim is submitted or not
          (!claimId ? (
            <Modal
              title="Instruction"
              bgImg="md:bg-submitClaimBg bg-submitClaimPopupBg bg-cover"
              sizeClass="max-w-3xl"
              renderComponent={() => (
                <ClaimCards policyId={token_id} walletAddress={wallet_address} />
              )}
              {...{ onSubmitted }}
            >
              <button
                type="button"
                className="md:px-6 py-3 px-4 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
              >
                Submit Claim
              </button>
            </Modal>
          ) : (
            <button
              type="button"
              disabled={!redeemable}
              onClick={redeemClaim}
              className="md:px-6 py-3 px-4 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
            >
              Redeem Claim
            </button>
          ))}
      </div>
    </div>
  );
};

export default CryptoExchangeCard;
