import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import { toast } from 'react-toastify';
import DownloadPolicy from './DownloadPolicy';
import { walletLogin } from '../../hooks/useAuth';
import SUPPORTED_WALLETS from '../../config/walletConfig';
import MsoUserInfoForm from '../MsoUserInfoForm';
import MSOReceipt from '../MSOReceipt';
import MSOReceiptCard from '../MSOReceiptCard';
import { getLoginDetails } from '../../redux/actions/Auth';
import { buyMsoInsurance, confirmBuyMsoInsurance } from '../../redux/actions/MsoInsurance';
import Alert from './Alert';
import Loading from './TxLoading';
import PageLoader from './PageLoader';

import useGetAllowanceOfToken from '../../hooks/useGetAllowanceOfToken';
import useTokenBalance, { useGetEthBalance } from '../../hooks/useTokenBalance';
import useStakeForMSO, { useStakeForMSOByToken } from '../../hooks/useStakeForMSO';
import { getBalanceNumber, getDecimalAmount } from '../../utils/formatBalance';
import useTokenAmount from '../../hooks/useTokenAmount';
import useTokenApprove from '../../hooks/useTokenApprove';
import useAddress from '../../hooks/useAddress';
import useAssetsUsdPrice from '../../hooks/useAssetsUsdPrice';
import { MSO_PLAN_TYPE } from '../../config';

const countries = [
  { value: 'UAE', label: 'United Arab Emirates' },
  { value: 'QAT', label: 'Qatar' },
  { value: 'OMN', label: 'Oman' },
  { value: 'KWT', label: 'Kuwait' },
  { value: 'USA', label: 'United States' },
  { value: 'BHR', label: 'Bahrain' },
  { value: 'SAU', label: 'Saudi Arabia' },
  { value: 'NOT', label: 'None of Them' },
];

const MsoCountrySelector = ({
  setIsModalOpen,
  setMaxWidth,
  setTitle,
  selectedPlan,
  addonServices,
  setIsNotCloseable,
}) => {
  // const { login } = useAuth();
  const dispatch = useDispatch();
  const { account, activate } = useWeb3React();
  const [curWalletId, setCurWalletId] = useState('injected');
  const [connectStatus, setConnectStatus] = useState(false);
  const [membersInfo, setMembersInfo] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState(false);

  const { txn_hash, loader, message, isFailed, _id, confirmed, payment_status } = useSelector(
    (state) => state.msoInsurance,
  );
  const [showAlert, setShowAlert] = useState(false);
  const [txPending, setTxPending] = useState(false);

  const { quote = '0', MSOAddOnService = '0', name, logo, MSOCoverUser } = selectedPlan;
  const discount = addonServices ? ((+quote + +MSOAddOnService) * 25) / 100 : (+quote * 25) / 100;
  const discountAmount = applyDiscount ? discount : 0;
  const total = addonServices
    ? +quote + +MSOAddOnService - discountAmount
    : +quote - discountAmount;
  const { getMSOAddress } = useAddress();
  const { crvAllowance, handleAllowance } = useGetAllowanceOfToken(getMSOAddress());
  const { balance } = useGetEthBalance();
  const crvBalanceStatus = useTokenBalance();

  // const ethPrice = useAssetsUsdPrice('eth');
  const crvPrice = useAssetsUsdPrice('crv');

  const { onApprove } = useTokenApprove(getMSOAddress());
  const { onStake } = useStakeForMSO();
  const { onStakeByToken } = useStakeForMSOByToken();
  const { getETHAmountForUSDC, getTokenAmountForUSDC } = useTokenAmount();

  useEffect(() => {
    handleAllowance();
  }, []);

  useEffect(() => {
    if (isFailed) setShowAlert(true);
  }, [isFailed]);

  useEffect(() => {
    if (confirmed && !loader && !isFailed) {
      setTxPending(false);
      setIsNotCloseable(false);
      // setIsModalOpen(false);

      setShowReceipt(true);
      setMaxWidth('max-w-5xl');
      setTitle('Receipt');
    }
  }, [confirmed]);

  useEffect(() => {
    if (!account) {
      setTitle('Login');
      setMaxWidth('max-w-2xl');
    }
  }, []);

  useEffect(() => {
    if (connectStatus && account) {
      dispatch(getLoginDetails({ wallet_address: account }));
      setConnectStatus(false);
    }
  }, [connectStatus, account]);

  useEffect(() => {
    if (!isFailed && !loader && txn_hash && _id) {
      (async () => {
        const param = {
          policyId: txn_hash,
          value: getDecimalAmount(addonServices ? total - MSOAddOnService : total).toString(),
          period: MSO_PLAN_TYPE[`${selectedPlan.unique_id}`],
          conciergePrice: getDecimalAmount(addonServices ? MSOAddOnService : 0).toString(),
        };
        const ethAmount = await getETHAmountForUSDC(total);
        try {
          const result =
            discountAmount > 0
              ? await onStakeByToken(param)
              : await onStake(param, ethAmount.toString());
          if (result.status) {
            dispatch(
              confirmBuyMsoInsurance({
                _id,
                wallet_address: account,
                total_amount: total,
                txn_hash: result.txn_hash,
              }),
            );
            toast.success('Successfully purchased!');
          }
        } catch (error) {
          toast.warning('Purchasing failed.');
          setTxPending(false);
          setIsNotCloseable(false);
          setIsModalOpen(false);
        }
      })();
    }
  }, [txn_hash, _id, isFailed, loader]);

  const tryActivation = (connect) => {
    setCurWalletId(connect);
    setConnectStatus(true);
    walletLogin(connect, activate);
    setMaxWidth('max-w-6xl');
    setTitle('Members Information Form');
  };

  const handleBuyNow = (members) => {
    setMembersInfo(members);
    setShowConfirmation(true);
    setMaxWidth('max-w-lg');
    setTitle('Confirmation');
  };

  const handleConfirm = async () => {
    setTxPending(true);
    setIsNotCloseable(true);
    if (discountAmount > 0 && !crvAllowance) {
      try {
        const result = await onApprove();
        await handleAllowance();
        if (result) {
          toast.success('CVR token approved.');
        } else {
          toast.warning('CVR token approving failed.');
        }
      } catch (e) {
        toast.warning('CVR token approving rejected.');
        console.error(e);
      }
      setTxPending(false);
      setIsNotCloseable(false);
      return;
    }

    let ethAmount1;
    let crvAmount1;
    try {
      ethAmount1 = await getETHAmountForUSDC(total); // total / ethPrice;
      crvAmount1 = await getTokenAmountForUSDC(total); // total / crvPrice;
    } catch (err) {
      toast.warning('Transaction failed.');
      setTxPending(false);
      setIsNotCloseable(false);
      return;
    }
    const ethAmount = getBalanceNumber(ethAmount1);
    const crvAmount = getBalanceNumber(crvAmount1);

    if (ethAmount + 0.001 >= getBalanceNumber(balance)) {
      toast.warning('Insufficient ETH balance!');
      setTxPending(false);
      setIsNotCloseable(false);
      return;
    }
    if (crvAmount >= getBalanceNumber(crvBalanceStatus.balance) && discountAmount > 0) {
      toast.warning('Insufficient CVR balance!');
      setApplyDiscount(false);
      setTxPending(false);
      setIsNotCloseable(false);
      return;
    }
    const param = {
      plan_type: selectedPlan.unique_id,
      plan_name: selectedPlan.name,
      quote,
      currency: applyDiscount ? 'CVR' : 'USD',
      mso_addon_service: addonServices ? MSOAddOnService : 0,
      amount: addonServices ? +quote + +MSOAddOnService : quote,
      discount_amount: discountAmount,
      tax: '0',
      total_amount: total,
      MSOMembers: membersInfo.map((m) => ({
        user_type: m.userType,
        first_name: m.firstName === '' ? 'wang' : m.firstName,
        last_name: m.lastName === '' ? 'dev' : m.lastName,
        country: m.country,
        dob: m.dob === '' ? '1970-01-07' : m.dob,
        identity: m.identity === '' ? 'wang-dev-test' : m.identity,
      })),
      wallet_address: account,
    };
    dispatch(buyMsoInsurance(param));
  };

  const getWalletOption = () => {
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      return (
        <div
          className="md:col-span-5 col-span-5 h-full"
          key={key}
          id={`connect-${key}`}
          onClick={() => tryActivation(option.connector)}
        >
          <div className="flex flex-col items-center md:justify-center h-full py-9 px-6 md:h-52 xl:h-54 w-full rounded-2xl bg-white shadow-md cursor-pointer dark:bg-wallet-dark-bg">
            <img src={option.icon} alt="Metamask" className="md:h-11 h-8 mx-auto" />
            <div className="text-dark-blue font-semibold font-Montserrat md:text-body-md text-body-xs md:mt-5 mt-4 dark:text-white">
              {connectStatus && curWalletId === option.connector ? 'Connecting...' : option.name}
            </div>
          </div>
        </div>
      );
    });
  };

  if (!account) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex items-center justify-center w-full">
          <div className="grid grid-cols-10 md:col-start-1 md:gap-x-6 gap-x-5 w-full">
            {getWalletOption()}
          </div>
        </div>
      </div>
    );
  }

  if (showReceipt && !loader && !isFailed) {
    return (
      <>
        <div className="flex justify-end">
          <DownloadPolicy
            pdf={
              <MSOReceipt
                {...{
                  txn_hash,
                  membersInfo,
                  quote,
                  discount,
                  total,
                  discountAmount,
                  addonServices,
                  applyDiscount,
                  MSOAddOnService,
                  name,
                  logo,
                  MSOCoverUser,
                }}
              />
            }
            fileName="MSO_Policy_Receipt.pdf"
          />
        </div>
        <div className="flex">
          <MSOReceiptCard
            {...{
              txn_hash,
              membersInfo,
              quote,
              total,
              discountAmount,
              addonServices,
              MSOAddOnService,
              name,
              logo,
              MSOCoverUser,
            }}
          />
        </div>
      </>
    );
  }

  if (showConfirmation) {
    return (
      <>
        <div>
          {showAlert && (
            <div className="mb-4">
              <Alert type="danger" text={message} onClose={() => setShowAlert(false)} />
            </div>
          )}
          <div className="flex items-center justify-between w-full dark:text-white">
            <h5 className="text-h6 font-medium">Premium</h5>
            <h5 className="text-body-lg font-medium">{quote} USD</h5>
          </div>
          {!!addonServices && (
            <div className="flex items-center justify-between w-full dark:text-white">
              <h5 className="text-h6 font-medium">Add on concierge services</h5>
              <h5 className="text-body-lg font-medium">{MSOAddOnService} USD</h5>
            </div>
          )}
          <div className="flex items-center justify-between w-full dark:text-white">
            <h5 className="text-h6 font-medium">Pay using CVR for 25% discount</h5>
            <input
              type="checkbox"
              name="applyDiscount"
              className="form-checkbox text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
              checked={applyDiscount}
              onChange={() => setApplyDiscount(!applyDiscount)}
            />
          </div>
          <hr />
          <div className="flex items-center justify-between w-full dark:text-white">
            <h5 className="text-h6 font-medium">Discount</h5>
            <h5 className="text-body-lg font-medium">{discountAmount} USD</h5>
          </div>
          <hr />
          <div className="flex items-center justify-between w-full dark:text-white">
            <h5 className="text-h6 font-medium">Total</h5>
            <h5 className="text-body-lg font-medium">{total} USD</h5>
          </div>
          {applyDiscount && (
            <div className="flex items-center justify-center w-full mt-2 dark:text-white">
              <h5 className="text-h6 font-medium">{`${(total / crvPrice).toFixed(
                2,
              )} CVR will be used for 25% discount`}</h5>
            </div>
          )}
          <div className="flex items-center justify-center w-full mt-6">
            <button
              type="button"
              onClick={handleConfirm}
              className="py-3 md:px-5 px-4 text-white font-Montserrat md:text-body-md text-body-sm md:rounded-2xl rounded-xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
            >
              {txPending ? (
                <Loading widthClass="w-4" heightClass="h-4" />
              ) : discountAmount > 0 && !crvAllowance ? (
                'Approve CVR'
              ) : (
                'Confirm to Pay'
              )}
            </button>
          </div>
        </div>
        {txPending && <PageLoader text="Please wait while the policy is being purchased" />}
      </>
    );
  }

  return (
    <MsoUserInfoForm
      {...{
        ...selectedPlan,
        countries,
        setIsModalOpen,
        handleBuyNow,
      }}
    />
  );
};
export default MsoCountrySelector;
