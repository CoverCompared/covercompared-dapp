import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Spinner from 'react-spinkit';
import SwapComponent from './SwapCurrency';
import ThemeToggleSwitch from '../ThemeToggleSwitch';
import LoginIcon from '../../assets/img/Login.svg';
import { shortenAddress } from '../../utils';
import { walletLogout } from '../../hooks/useAuth';
import { setLoginModalVisible, setPendingTransaction } from '../../redux/actions';
import { logoutUser } from '../../redux/actions/Auth';
import TxDetailMsg from './TxDetailMsg';

const HeaderCTAs = (props) => {
  const { account, deactivate, library } = useWeb3React();
  const dispatch = useDispatch();
  const { pendingTx } = useSelector((state) => state.app);
  const handleLogout = () => {
    walletLogout(deactivate);
    dispatch(logoutUser());
    dispatch(setLoginModalVisible(false));
  };

  useEffect(() => {
    if (pendingTx && library) {
      const txReceiptAsync = async () => {
        if (!pendingTx.hash) {
          dispatch(setPendingTransaction(null));
          return;
        }
        const receipt = await library.getTransactionReceipt(pendingTx.hash);
        if (receipt === null) {
          setTimeout(txReceiptAsync, 1000);
        } else {
          if (!window.localStorage.getItem('tx_log')) {
            toast.success(<TxDetailMsg transaction={pendingTx} />, {
              hideProgressBar: false,
              autoClose: 10000,
            });
            window.localStorage.setItem('tx_log', true);
          }
          dispatch(setPendingTransaction(null));
        }
      };
      txReceiptAsync();
    }
  }, [pendingTx, library]);

  return (
    <div className="flex items-center">
      <ThemeToggleSwitch />
      <SwapComponent />
      {!account ? (
        <button
          type="button"
          onClick={() => dispatch(setLoginModalVisible(true))}
          className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
        >
          <img loading="lazy" src={LoginIcon} alt="Login" className="mr-1" />
          Log In
        </button>
      ) : (
        <button
          type="button"
          onClick={handleLogout}
          className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
        >
          <img loading="lazy" src={LoginIcon} alt="Login" className="mr-1" />
          {shortenAddress(account)}
        </button>
      )}
      {/* {pendingTx && (
        <button
          type="button"
          className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
        >
          Pending&nbsp;
          <Spinner name="circle" color="rgba(23, 81, 134)" style={{ height: '17px' }} />
        </button>
      )} */}
    </div>
  );
};

export default HeaderCTAs;
