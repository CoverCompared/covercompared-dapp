import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setLoginModalVisible, setRegisterModalVisible } from '../redux/actions/AppActions';
import Modal from './common/Modal';
import RegisterMail from './RegisterMail';
import Login from './Login';

const PreRenderedModals = () => {
  const dispatch = useDispatch();
  const { loginModalVisible, registerModalVisible } = useSelector((state) => state.app);

  return (
    <>
      <Modal
        isOpen={loginModalVisible}
        title="Register"
        sizeClass="max-w-2xl"
        renderComponent={Login}
        onClose={() => dispatch(setLoginModalVisible(false))}
        bgImg="md:bg-submitClaimBg bg-mobileLoginPopupBg bg-100% bg-no-repeat"
      />
      <Modal
        isOpen={registerModalVisible}
        title="Register"
        sizeClass="max-w-2xl"
        renderComponent={RegisterMail}
        onClose={() => dispatch(setRegisterModalVisible(false))}
        bgImg="md:bg-submitClaimBg bg-mobileLoginPopupBg bg-100% bg-no-repeat"
      />
    </>
  );
};
export default PreRenderedModals;
