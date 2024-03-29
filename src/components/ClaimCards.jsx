import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import useClaimForCover from '../hooks/useClaimForCover';

const ClaimCards = ({ policyId, walletAddress, onSubmitted }) => {
  const newPageUrl = `https://app.nexusmutual.io/home/proof-of-loss/add-affected-addresses?coverId=${policyId}&owner=${walletAddress}`;
  const { onNMClaim, onSubmitCAVote, getCheckVoteClosing, onCloseClaim, getPayoutOutcome } =
    useClaimForCover();

  const handleSubmitToClaim = async () => {
    if (policyId === undefined) {
      toast.warning('This item is invalid!');
      return;
    }
    try {
      const result = await getPayoutOutcome(46);
      console.log(result);
      if (true) return;
      const emptyData = ethers.utils.defaultAbiCoder.encode([], []);

      console.log('submitting claim...');
      const tx = await onNMClaim(policyId, emptyData);

      if (!tx.status) {
        toast.warning('Failed to submit claim!');
        return;
      }

      const ev = tx.events.filter((e) => e.event === 'ClaimSubmitted')[0];
      const claimId = parseInt(ev.args.claimId, 10);
      console.log('submitted claim id: => ', claimId);

      // const voteStatusBeforeFirst = await getCheckVoteClosing(claimId);
      // console.log('voteStatusBeforeFirst ::', voteStatusBeforeFirst.toString());

      console.log('voting claim...');
      const voteTx = await onSubmitCAVote(claimId);
      // console.log('onSubmitCAVote ::', voteTx);
      if (!voteTx.status) {
        toast.warning('Vote on claim failed!');
        return;
      }

      const voteStatusBefore = await getCheckVoteClosing(claimId);
      if (voteStatusBefore.toString() !== '1') {
        toast.warning('Not allowed vote closing!');
        return;
      }

      console.log('closing claim...');
      const closeClaimTx = await onCloseClaim(claimId);
      if (!closeClaimTx.status) {
        toast.warning('Failed to close claim!');
        return;
      }

      const voteStatusAfter = await getCheckVoteClosing(claimId);
      if (voteStatusAfter.toString() !== '-1') {
        toast.warning('Not Closed vote claim!');
        return;
      }
      onSubmitted(claimId);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 md:gap-8 gap-y-6 mt-6 z-auto relative">
        <div className="w-full z-100 relative col-span-2 md:col-span-1 pt-8 px-16 pb-11 shadow-md flex flex-col justify-center items-center rounded-2xl bg-white dark:bg-featureCard-dark-bg">
          {/* <div className="py-3 px-6 mb-6 rounded-2xl border-2 border-primary-gd-1 dark:border-white border-solid text-primary-gd-1 dark:text-white font-Montserrat font-semibold text-h5 ">
            Step 1
          </div> */}
          <div className="text-dark-blue font-medium font-Montserrat text-h6 text-center leading-7 text dark:text-white">
            Go to{' '}
            <a
              href={newPageUrl}
              className="font-semibold underline"
              target="_blank"
              rel="noreferrer"
            >
              LINK
            </a>{' '}
            and <br /> submit Proof
          </div>
        </div>
        <div className="w-full  col-span-2 md:col-span-1 pt-8 px-16 pb-11 bg-white dark:bg-featureCard-dark-bg shadow-md flex flex-col justify-center items-center rounded-2xl">
          {/* <div className="py-3 px-6 mb-6 rounded-2xl border-2 border-primary-gd-1 border-solid text-primary-gd-1 dark:text-white dark:border-white font-Montserrat font-semibold text-h5 dark:bg-featureCard-dark-bg">
            Step 2
          </div> */}
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={handleSubmitToClaim}
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
