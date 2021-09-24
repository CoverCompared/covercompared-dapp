import React from 'react';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import Modal from './common/Modal';
import RegisterMail from './RegisterMail';

const GetUserDetails = (props) => {
  const { account } = useWeb3React();
  const { userDetailsModalOpen } = useSelector((state) => state.auth);

  return (
    <Modal
      closeable={false}
      isOpen={!!(userDetailsModalOpen && account)}
      title="Login with Email"
      bgImg="md:bg-additionalDetailsBg1 bg-loginPopupMobileBg bg-right-bottom bg-no-repeat bg-contain"
      renderComponent={RegisterMail}
    />
  );
};
export default GetUserDetails;
