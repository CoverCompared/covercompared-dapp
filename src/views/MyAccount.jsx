import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import GetCVROnReview from '../components/GetCVROnReview';
import Modal from '../components/common/Modal';
import ClaimCards from '../components/ClaimCards';
// import AdditionalDetails from '../components/AdditionalDetails';
import { getUserPolicies } from '../redux/actions/UserProfile';
import OverlayLoading from '../components/common/OverlayLoading';
import MSOReceipt from '../components/MSOReceipt';
import MSOReceiptCard from '../components/MSOReceiptCard';
import DeviceReceipt from '../components/DeviceReceipt';
import DeviceReceiptCard from '../components/DeviceReceiptCard';
import DownloadPolicy from '../components/common/DownloadPolicy';

import p4lLogo from '../assets/img/p4l-logo.png';
import msoLogo from '../assets/img/mso-logo.png';
import placeholderLogo from '../assets/img/placeholder.png';
// import useGetNexusMutualCover from '../hooks/useFetchEvents';
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import useClaimForCover from '../hooks/useClaimForCover';
import { SupportedChainId } from '../config/chains';
import { setupNetwork } from '../utils/wallet';
import Loading from '../components/common/TxLoading';

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
  const [proofPending, setProofPending] = useState(false);
  const [nexusIndex, setNexusIndex] = useState(-1);

  const { onNMClaim, onNMRedeemClaim, onSubmitCAVote, getCheckVoteClosing, onCloseClaim } =
    useClaimForCover();

  useEffect(() => {
    if (!account) history.push('/');
  });

  useEffect(() => {
    if (account) dispatch(getUserPolicies());
  }, []);

  // this hooks for testing. Should be remove in production.
  useEffect(() => {
    (async () => {
      const _chainId = SupportedChainId.KOVAN;
      if (chainId !== _chainId) {
        await setupNetwork(_chainId);
      }
    })();
  }, [chainId]);

  const handleSubmitToClaim = async (policy, i) => {
    const { details, wallet_address } = policy;
    const { token_id } = details;
    if (token_id === undefined) {
      toast.warning('This item is invalid!');
      return;
    }
    const newPageUrl = `https://app.nexusmutual.io/home/proof-of-loss/add-affected-addresses?coverId=${token_id}&owner=${wallet_address}`;
    window.open(newPageUrl, '_blank');

    setProofPending(true);
    setNexusIndex(i);
    try {
      const emptyData = ethers.utils.defaultAbiCoder.encode([], []);

      const tx = await onNMClaim(token_id, emptyData);

      console.log('claim tx ::', tx);

      if (!tx.status) {
        toast.warning('Failed to submit claim!');
        return;
      }
      const ev = tx.events.filter((e) => e.event === 'ClaimSubmitted')[0];
      const claimId = parseInt(ev.args.claimId, 10);
      // console.log(claimId, policy.token_id)
      console.log('claimId ::', claimId);

      const voteStatusBeforeFirst = await getCheckVoteClosing(claimId);
      console.log('voteStatusBeforeFirst ::', voteStatusBeforeFirst.toString());

      const voteTx = await onSubmitCAVote(claimId);
      console.log('onSubmitCAVote ::', voteTx);
      if (!voteTx.status) {
        toast.warning('Vote on claim failed!');
        return;
      }

      const voteStatusBefore = await getCheckVoteClosing(claimId);
      console.log('voteStatusBefore ::', voteStatusBefore.toString());
      if (voteStatusBefore.toString() !== '1') {
        toast.warning('Not allowed vote closing!');
        return;
      }

      const closeClaimTx = await onCloseClaim(claimId);
      console.log('closeClaimTx ::', closeClaimTx);
      if (!closeClaimTx.status) {
        toast.warning('Failed to close claim!');
        return;
      }

      const voteStatusAfter = await getCheckVoteClosing(claimId);
      console.log('voteStatusAfter ::', voteStatusAfter.toString());
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

      setProofPending(false);
      setNexusIndex(-1);
    } catch (err) {
      console.log(err);
      setProofPending(false);
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
        model,
        model_name,
      } = {},
    } = device;
    return (
      <div
        className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative"
        key={_id}
      >
        <div className="flex items-center h-full w-full sm:col-span-6 lg:col-span-6 col-span-12">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl shadow-2xl p-1 relative bg-white flex items-center justify-center">
            <img src={logo} alt="" className="h-auto w-full" />
          </div>
          <div className="flex flex-col">
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">{`${device_type} - ${brand} `}</div>
            <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">
              {model_name || model || 'Others'}
            </div>
          </div>
        </div>

        <div className="flex sm:justify-end items-center sm:col-span-6 lg:col-span-6 col-span-12">
          <button
            type="button"
            onClick={() => history.push(`submit-review/${_id}`)}
            className="md:px-5 p-3 md:mr-4 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
          >
            Submit Review
          </button>
          <Modal
            title="Policy Details"
            bgImg="md:bg-additionalDetailsBg1 bg-mobilePopupBg bg-right-bottom bg-no-repeat bg-contain"
            renderComponent={DeviceCard}
            {...{
              tax,
              txn_hash,
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
      amount,
      details,
      txn_hash,
      total_amount,
      logo = msoLogo,
      discount_amount,
      // plan_details: { name, logo, MSOCoverUser, MSOPlanDuration },
    } = policy;
    const { MSOMembers, quote, mso_addon_service, plan_details } = details;
    const { name, MSOCoverUser, MSOPlanDuration } = plan_details;

    return (
      <div
        className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative"
        key={_id}
      >
        <div className="flex items-center h-full w-full sm:col-span-6 lg:col-span-6 col-span-12">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl shadow-2xl p-1 relative bg-white">
            <img src={logo} alt={name} className="h-full w-full rounded-xl" />
          </div>
          <div className="flex flex-col">
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">{`${name} - ${MSOPlanDuration} `}</div>
            <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">
              {MSOCoverUser}
            </div>
          </div>
        </div>

        <div className="flex sm:justify-end items-center sm:col-span-6 lg:col-span-6 col-span-12">
          <button
            type="button"
            onClick={() => history.push(`submit-review/${_id}`)}
            className="md:px-5 p-3 md:mr-4 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
          >
            Submit Review
          </button>
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

  const renderCryptoCard = (policy) => {
    const { _id, details, logo = placeholderLogo, crypto_amount, crypto_currency } = policy;
    const { company_code, name, duration_days } = details;

    return (
      <div
        className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative"
        key={_id}
      >
        <div className="flex items-center h-full w-full sm:col-span-6 lg:col-span-6 col-span-12">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl shadow-2xl p-1 relative bg-white">
            <img src={logo} alt={name} className="h-full w-full rounded-xl" />
          </div>
          <div className="flex flex-col">
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">{`${name} - ${company_code} `}</div>
            <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">
              {`${crypto_amount} ${crypto_currency} - ${duration_days} days`}
            </div>
          </div>
        </div>

        <div className="flex sm:justify-end items-center sm:col-span-6 lg:col-span-6 col-span-12">
          <button
            type="button"
            onClick={() => history.push(`submit-review/${_id}`)}
            className="md:px-5 p-3 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
          >
            Submit Review
          </button>

          {company_code === 'nexus' ? (
            // replace the true with condition which check whether claim is submitted or not
            true ? (
              <Modal
                title="Instruction"
                bgImg="md:bg-submitClaimBg bg-submitClaimPopupBg bg-cover"
                sizeClass="max-w-3xl"
                renderComponent={ClaimCards}
              >
                <button
                  type="button"
                  className="md:px-6 py-3 px-4 md:ml-4 ml-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
                >
                  Submit Claim
                </button>
              </Modal>
            ) : (
              <button
                type="button"
                className="md:px-6 py-3 px-4 md:ml-4 ml-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
              >
                Redeem Claim
              </button>
            )
          ) : null}
        </div>
      </div>
    );
  };

  const renderNexusCard = (policy, index) => {
    const {
      _id,
      details,
      logo = placeholderLogo,
      crypto_amount,
      crypto_currency,
      txn_hash,
      wallet_address,
    } = policy;
    const { company_code, name, duration_days, token_id } = details;

    return (
      <div
        className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative"
        key={_id}
      >
        <div className="flex items-center h-full w-full sm:col-span-6 lg:col-span-6 col-span-12">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl shadow-2xl p-1 relative bg-white">
            <img src={logo} alt={name} className="h-full w-full rounded-xl" />
          </div>
          <div className="flex flex-col">
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">{`${name} - ${company_code} `}</div>
            <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">
              {`${crypto_amount} ${crypto_currency} - ${duration_days} days`}
            </div>
          </div>
        </div>

        <div className="flex sm:justify-end items-center sm:col-span-6 lg:col-span-6 col-span-12">
          <button
            type="button"
            onClick={() => history.push(`submit-review/${_id}`)}
            className="md:px-5 p-3 md:mr-4 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
          >
            Submit Review
          </button>
          <button
            disabled={(proofPending && nexusIndex === index) || token_id === undefined}
            onClick={() => handleSubmitToClaim(policy, index)}
            type="button"
            className="md:px-5 px-3 py-3 bg-gradient-to-r from-login-button-bg to-login-button-bg disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:text-white hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
          >
            {proofPending && nexusIndex === index ? (
              <Loading widthClass="w-4" heightClass="h-4" />
            ) : (
              'Submit Claim'
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {loader && <OverlayLoading />}
      <GetCVROnReview {...props} />
      {/* <MobilePageTitle title="My Insurance" /> */}
      <div className="font-Montserrat md:text-h2 text-h4 font-semibold text-dark-blue mb-4 dark:text-white">
        My Profile
      </div>

      <div className="xl:pl-5 xl:pr-24">
        <div className="md:col-span-4 col-span-12 md:flex items-center mb-4">
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Email:</label>
            <label className="text-sm font-medium text-gray-500 ml-2">{email}</label>
          </div>
          {/* <div className="mt-1 flex rounded-md shadow-sm">  
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
                disabled
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 bg-gray-50"
              />
            </div>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:border-0"
            >
              <PencilAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div> */}
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
              return renderNexusCard(m, i);
            }
            if (m.product_type === 'crypto_exchange') {
              return renderCryptoCard(m);
            }
            return <></>;
          })
        ) : (
          <div className="text-md font-medium text-gray-500">No insurance policies to display</div>
        )}

        {/* <div className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative">
          <div className="flex items-center h-full sm:col-span-6 lg:col-span-7 col-span-12">
            <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl bg-gray-200">
              <img
                src="https://via.placeholder.com/400x250.png"
                alt=""
                className="h-full w-full rounded-xl"
              />
            </div>
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white">
              Uniswap - Nexus Mutual
            </div>
          </div>
          <div className="flex sm:justify-end items-center sm:col-span-6 lg:col-span-5 col-span-12">
            <Modal
              title="Instruction"
              bgImg="md:bg-submitClaimBg bg-submitClaimPopupBg bg-cover"
              renderComponent={ClaimCards}
            >
              <button
                type="button"
                className="md:px-6 py-3 px-4 md:mr-4 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
              >
                Submit Claim
              </button>
            </Modal>
            <button
              type="button"
              className="md:px-7 px-5 py-3 bg-discount-apply-btn-bg text-white font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
            >
              Reedem Claim
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default MyAccount;
