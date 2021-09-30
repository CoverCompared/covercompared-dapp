import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setLoginModalVisible, setRegisterModalVisible } from '../redux/actions';
import Modal from './common/Modal';
import Register from './Register';
import Login from './Login';

const PreRenderedModals = () => {
  const dispatch = useDispatch();
  const { loginModalVisible, registerModalVisible, is_verified } = useSelector(
    (state) => state.auth,
  );

  return (
    <>
      <Modal
        isOpen={loginModalVisible}
        title="Log In"
        sizeClass="max-w-2xl"
        renderComponent={Login}
        onClose={() => dispatch(setLoginModalVisible(false))}
        bgImg="bg-loginPopupBg"
      />
      <Modal
        isOpen={!!(is_verified === false && registerModalVisible)}
        title="Register"
        sizeClass="max-w-lg"
        renderComponent={Register}
        onClose={() => dispatch(setRegisterModalVisible(false))}
        bgImg="md:bg-submitClaimBg bg-mobileLoginPopupBg bg-100% bg-no-repeat"
      />
    </>
  );
};
export default PreRenderedModals;
