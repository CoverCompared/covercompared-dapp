import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { logEvent } from 'firebase/analytics';
import { LinkIcon } from '@heroicons/react/outline';

import DownloadPolicy from '../components/common/DownloadPolicy';
import { analytics } from '../config/firebase';
import GetCVROnReview from '../components/GetCVROnReview';
import Modal from '../components/common/Modal';
import ClaimCards from '../components/ClaimCards';
import { getUserPolicies } from '../redux/actions/UserProfile';
import OverlayLoading from '../components/common/OverlayLoading';
import MSOReceipt from '../components/MSOReceipt';
import MSOReceiptCard from '../components/MSOReceiptCard';
import DeviceReceipt from '../components/DeviceReceipt';
import DeviceReceiptCard from '../components/DeviceReceiptCard';
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import useClaimForCover from '../hooks/useClaimForCover';
import Loading from '../components/common/TxLoading';
// import AdditionalDetails from '../components/AdditionalDetails';
// import useGetNexusMutualCover from '../hooks/useFetchEvents';

import p4lLogo from '../assets/img/p4l-logo.png';
import msoLogo from '../assets/img/mso-logo.png';
import placeholderLogo from '../assets/img/placeholder.png';

const DeviceCard = (props) => {
  return (
    <>
      <div className="flex justify-end">
        <DownloadPolicy
          pdf={<DeviceReceipt {...props} />}
          fileName="Device_protection_receipt.pdf"
        />
      </div>
      <DeviceReceiptCard {...props} />
    </>
  );
};

const MSOCard = (props) => {
  return (
    <>
      <div className="flex justify-end">
        <DownloadPolicy pdf={<MSOReceipt {...props} />} fileName="MSO_Policy_Receipt.pdf" />
      </div>
      <div className="flex">
        <MSOReceiptCard {...props} />
      </div>
    </>
  );
};

const MyAccount = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { chainId, account } = useActiveWeb3React();
  const { email } = useSelector((state) => state.auth);
  const { policies, loader } = useSelector((state) => state.userProfile);
  const auth = useSelector((state) => state.auth);

  const { onNMClaim, onNMRedeemClaim, onSubmitCAVote, getCheckVoteClosing, onCloseClaim } =
    useClaimForCover();

  useEffect(() => {
    if (!account) history.push('/');
  });

  useEffect(() => {
    logEvent(analytics, 'View - My Account');
    if (account) dispatch(getUserPolicies());
  }, []);

  const handleSubmitToClaim = async (policy, i) => {
    const { details, wallet_address } = policy;
    const { token_id } = details;
    console.log(policy);
    if (token_id === undefined) {
      toast.warning('This item is invalid!');
      return;
    }
    const newPageUrl = `https://app.nexusmutual.io/home/proof-of-loss/add-affected-addresses?coverId=${token_id}&owner=${wallet_address}`;
    window.open(newPageUrl, '_blank');

    try {
      const emptyData = ethers.utils.defaultAbiCoder.encode([], []);

      const tx = await onNMClaim(token_id, emptyData);

      // console.log('claim tx ::', tx);

      if (!tx.status) {
        toast.warning('Failed to submit claim!');
        return;
      }
      const ev = tx.events.filter((e) => e.event === 'ClaimSubmitted')[0];
      const claimId = parseInt(ev.args.claimId, 10);
      // console.log('claimId ::', claimId);

      const voteStatusBeforeFirst = await getCheckVoteClosing(claimId);
      // console.log('voteStatusBeforeFirst ::', voteStatusBeforeFirst.toString());

      const voteTx = await onSubmitCAVote(claimId);
      // console.log('onSubmitCAVote ::', voteTx);
      if (!voteTx.status) {
        toast.warning('Vote on claim failed!');
        return;
      }

      const voteStatusBefore = await getCheckVoteClosing(claimId);
      // console.log('voteStatusBefore ::', voteStatusBefore.toString());
      if (voteStatusBefore.toString() !== '1') {
        toast.warning('Not allowed vote closing!');
        return;
      }

      const closeClaimTx = await onCloseClaim(claimId);
      // console.log('closeClaimTx ::', closeClaimTx);
      if (!closeClaimTx.status) {
        toast.warning('Failed to close claim!');
        return;
      }

      const voteStatusAfter = await getCheckVoteClosing(claimId);
      // console.log('voteStatusAfter ::', voteStatusAfter.toString());
      if (voteStatusAfter.toString() !== '-1') {
        toast.warning('Not Closed vote claim!');
        return;
      }

      const txRedeem = await onNMRedeemClaim(token_id, claimId);
      if (txRedeem.status) {
        toast.success('Claim requested successfully!');
      } else {
        toast.warning('Failed to redeem claim!');
      }
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    }
  };

  const renderDeviceCard = (device) => {
    const {
      _id,
      tax,
      amount,
      txn_hash,
      total_amount,
      logo = p4lLogo,
      discount_amount,
      review,
      details: {
        email,
        first_name,
        last_name,
        phone,
        brand,
        value,
        device_type,
        purchase_month,
        currency,
        imei_or_serial_number,
        model,
        model_name,
      } = {},
      payment: { transaction_link, payment_hash, network_name, crypto_currency } = {},
    } = device;
    return (
      <div
        className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl flex flex-row justify-between mb-4 relative"
        key={_id}
      >
        <div className="flex items-center h-full w-full">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl shadow-2xl p-1 relative bg-white flex items-center justify-center">
            <img loading="lazy" src={logo} alt="" className="h-auto w-full" />
          </div>
          <div className="flex flex-col">
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-row items-center">
              <div>{`${device_type} - ${brand} `}</div>
            </div>
            <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">
              {model_name || model || 'Others'}
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
          <Modal
            title="Policy Details"
            bgImg="md:bg-additionalDetailsBg1 bg-mobilePopupBg bg-right-bottom bg-no-repeat bg-contain"
            renderComponent={DeviceCard}
            {...{
              tax,
              txn_hash,
              payment_hash,
              transaction_link,
              network_name,
              crypto_currency,
              quote: amount,
              total: total_amount,
              discountAmount: discount_amount,
              fName: first_name,
              lName: last_name,
              email,
              phone,
              brand,
              value,
              logo,
              imei_or_serial_number,
              deviceType: device_type,
              purchaseMonth: purchase_month,
              plan_currency: currency,
              selectedModel: model_name || model || 'Others',
            }}
          >
            <button
              type="button"
              className="md:px-5 px-3 py-3 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
            >
              Policy Details
            </button>
          </Modal>
        </div>
      </div>
    );
  };

  const renderMSOCard = (policy) => {
    const {
      _id,
      tax,
      currency,
      amount,
      details,
      txn_hash,
      total_amount,
      logo = msoLogo,
      discount_amount,
      review,
      payment: { transaction_link, payment_hash, network_name, crypto_currency } = {},
      // plan_details: { name, logo, MSOCoverUser, MSOPlanDuration },
    } = policy;
    const { MSOMembers, quote, mso_addon_service, plan_details } = details;
    const { name, MSOCoverUser, MSOPlanDuration } = plan_details;

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
              <div>{`${name} - ${MSOPlanDuration} `}</div>
            </div>
            <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">
              {MSOCoverUser}
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
          <Modal
            title="Policy Details"
            bgImg="md:bg-additionalDetailsBg1 bg-mobilePopupBg bg-right-bottom bg-no-repeat bg-contain"
            renderComponent={MSOCard}
            {...{
              txn_hash,
              membersInfo: MSOMembers || [],
              quote,
              total: total_amount,
              tax,
              payment_hash,
              transaction_link,
              network_name,
              crypto_currency,
              currency,
              discountAmount: discount_amount,
              addonServices: !!mso_addon_service,
              MSOAddOnService: mso_addon_service,
              name,
              logo,
              MSOCoverUser,
            }}
          >
            <button
              type="button"
              className="md:px-5 px-3 py-3 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
            >
              Policy Details
            </button>
          </Modal>
        </div>
      </div>
    );
  };

  const renderSmartContractCard = (policy, index) => {
    const {
      _id,
      details,
      logo = placeholderLogo,
      crypto_amount,
      crypto_currency,
      txn_hash,
      wallet_address,
      review,
      payment: { transaction_link } = {},
    } = policy;
    const { company_code, name, duration_days, token_id } = details;

    const onSubmitted = () => {};

    return (
      <div
        className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl flex justify-between mb-4 relative"
        key={_id}
      >
        <div className="flex items-center w-full">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl shadow-2xl p-1 relative bg-white">
            <img loading="lazy" src={logo} alt={name} className="h-full w-full rounded-xl" />
          </div>
          <div className="flex flex-col">
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-row items-center">
              <div>{`${name} - ${company_code} `}</div>
            </div>
            <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white">
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
          {/* {company_code === 'nexus' && (
            <button
              disabled={(proofPending && nexusIndex === index) || token_id === undefined}
              onClick={() => handleSubmitToClaim(policy, index)}
              type="button"
              className="md:px-5 px-3 py-3 bg-gradient-to-r from-login-button-bg to-login-button-bg disabled:from-gray-200 disabled:to-gray-200 hover:from-primary-gd-1 hover:to-primary-gd-2 text-black font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
            >
              {proofPending && nexusIndex === index ? (
                <Loading widthClass="w-4" heightClass="h-4" />
              ) : (
                'Submit Claim'
              )}
            </button>
          )} */}

          {company_code === 'nexus' &&
            // replace the true with condition which check whether claim is submitted or not
            (true ? (
              <Modal
                title="Instruction"
                bgImg="md:bg-submitClaimBg bg-submitClaimPopupBg bg-cover"
                sizeClass="max-w-3xl"
                renderComponent={() => (
                  <ClaimCards policyId={token_id} walletAddress={wallet_address} />
                )}
                onSubmitted
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
                className="md:px-6 py-3 px-4 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
              >
                Redeem Claim
              </button>
            ))}
        </div>
      </div>
    );
  };

  const renderCryptoExchangeCard = (policy) => {
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
            (true ? (
              <Modal
                title="Instruction"
                bgImg="md:bg-submitClaimBg bg-submitClaimPopupBg bg-cover"
                sizeClass="max-w-3xl"
                renderComponent={() => (
                  <ClaimCards policyId={token_id} walletAddress={wallet_address} />
                )}
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
                className="md:px-6 py-3 px-4 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
              >
                Redeem Claim
              </button>
            ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {loader && <OverlayLoading />}
      {process.env.SHOW_UPCOMING_FEATURES_TO_CONFIRM && <GetCVROnReview {...props} />}
      {/* <MobilePageTitle title="My Insurance" /> */}
      <div className="font-Montserrat md:text-h2 text-h4 font-semibold text-dark-blue mb-4 dark:text-white">
        My Profile
      </div>

      <div className="xl:pl-5 xl:pr-24">
        <div className="md:col-span-4 col-span-12 md:flex items-center mb-4">
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Email:</label>
            <label className="text-sm font-medium text-gray-500 dark:text-white ml-2">
              {email}
            </label>
          </div>
        </div>
      </div>
      <div className="font-Montserrat md:text-h2 text-h4 font-semibold text-dark-blue mb-8 dark:text-white">
        My Insurance
      </div>
      <div className="xl:pl-5 xl:pr-24">
        {policies?.length ? (
          policies.map((m, i) => {
            if (m.product_type === 'device_insurance') {
              return renderDeviceCard(m);
            }
            if (m.product_type === 'mso_policy') {
              return renderMSOCard(m);
            }
            if (m.product_type === 'smart_contract') {
              return renderSmartContractCard(m, i);
            }
            if (m.product_type === 'crypto_exchange') {
              return renderCryptoExchangeCard(m);
            }
            return <></>;
          })
        ) : (
          <div className="text-md font-medium text-gray-500 dark:text-white">
            No insurance policies to display
          </div>
        )}
      </div>
    </>
  );
};
export default MyAccount;
