import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../config/firebase';
import { ETH_ADDRESS } from '../config';
import useGetAllowanceOfToken from '../hooks/useGetAllowanceOfToken';
import useTokenBalance, { useGetEthBalance } from '../hooks/useTokenBalance';
import useTokenApprove from '../hooks/useTokenApprove';
import useStakeForCover from '../hooks/useStakeForCover';
import PageLoader from './common/PageLoader';
import { buyCover } from '../redux/actions/CoverList';
import { setLoginModalVisible, openSwapModal } from '../redux/actions';
import Loading from './common/TxLoading';
import { getBalanceNumber } from '../utils/formatBalance';
import { axiosPost } from '../redux/constants/apicall';
import { API_BASE_URL } from '../redux/constants/config';
import useAddress from '../hooks/useAddress';
import useTokenAmount from '../hooks/useTokenAmount';

const CoverBuyConfirmModal = (props) => {
  const {
    setTitle,
    setMaxWidth,
    onConfirmed,
    period,
    product,
    account,
    coverAmount,
    currency,
    quote,
    quoteDetail,
    token,
    setIsModalOpen,
    setIsNotCloseable,
    onClose,
    payWithCVR,
  } = props;

  const dispatch = useDispatch();
  const [txPending, setTxPending] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState(payWithCVR.current);
  const [cvrAmount, setCvrAmount] = useState(0);

  const { getNexusMutualAddress, getInsureAceAddress, getTokenAddress } = useAddress();
  const { getNeededTokenAmount } = useTokenAmount();
  const cvrAddress = getTokenAddress('cvr');

  const token0 = getTokenAddress(token);
  const token0Balance = useTokenBalance(token);

  const ethBalance = useGetEthBalance();
  const cvrBalance = useTokenBalance();
  const { onApprove: onApproveCVRForNM } = useTokenApprove(getNexusMutualAddress());
  const { onApprove: onApproveCVRForIA } = useTokenApprove(getInsureAceAddress());
  const { onApprove: onApproveTokenForNM } = useTokenApprove(getNexusMutualAddress(), token);
  const { onApprove: onApproveTokenForIA } = useTokenApprove(getInsureAceAddress(), token);
  const { onNMStake, onIAStake } = useStakeForCover();

  const { cvrAllowance: cvrAllowanceForNM, handleAllowance: handleCVRAllowanceForNM } =
    useGetAllowanceOfToken(getNexusMutualAddress());
  const { cvrAllowance: cvrAllowanceForIA, handleAllowance: handleCVRAllowanceForIA } =
    useGetAllowanceOfToken(getInsureAceAddress());

  const { cvrAllowance: tokenAllowanceForNM, handleAllowance: handleTokenAllowanceForNM } =
    useGetAllowanceOfToken(getNexusMutualAddress(), token);
  const { cvrAllowance: tokenAllowanceForIA, handleAllowance: handleTokenAllowanceForIA } =
    useGetAllowanceOfToken(getInsureAceAddress(), token);

  const cvrAllowance = useMemo(() => {
    const { company_code } = product;
    if (company_code === 'nexus') {
      return cvrAllowanceForNM;
    }
    if (company_code === 'insurace') {
      return cvrAllowanceForIA;
    }
    return false;
  }, [product, cvrAllowanceForNM, cvrAllowanceForIA]);

  const tokenAllowance = useMemo(() => {
    const { company_code } = product;
    if (company_code === 'nexus') {
      return tokenAllowanceForNM;
    }
    if (company_code === 'insurace') {
      return tokenAllowanceForIA;
    }
    return false;
  }, [product, tokenAllowanceForNM, tokenAllowanceForIA]);

  useEffect(() => {
    handleCVRAllowanceForNM();
    handleCVRAllowanceForIA();
    handleTokenAllowanceForNM();
    handleTokenAllowanceForIA();
    setTitle('Confirmation');
    setMaxWidth('max-w-lg');

    return () => {
      payWithCVR.current = false;
    };
  }, []);

  const discountAmount = useMemo(() => {
    const discount = (+quote * 25) / 100;
    return applyDiscount ? discount : 0;
  }, [quote, applyDiscount]);

  const total = useMemo(() => {
    return +(+quote).toFixed(5) - +discountAmount.toFixed(5);
  }, [quote, discountAmount]);

  useEffect(() => {
    (async () => {
      if (applyDiscount) {
        const token0 = cvrAddress;
        const token1 = getTokenAddress(token);
        if (token0 === token1) {
          setCvrAmount(total);
        } else {
          const { parsedVal: cvrAmount } = await getNeededTokenAmount(token0, token1, quote);
          setCvrAmount(cvrAmount);
        }
      }
    })();
  }, [total, applyDiscount]);

  const handleConfirm = async () => {
    setIsNotCloseable(true);
    if (!account) {
      toast.warning('You need to login in advance!');
      dispatch(setLoginModalVisible(true));
      setIsNotCloseable(false);
      return;
    }
    if (applyDiscount && cvrAmount >= getBalanceNumber(cvrBalance.balance)) {
      toast.warning('Insufficient CVR balance!');
      setIsNotCloseable(false);
      setIsModalOpen(false);
      dispatch(openSwapModal(true));
      return;
    }
    if (
      !applyDiscount &&
      total >=
        getBalanceNumber(
          token === 'ETH' ? ethBalance.balance : token0Balance.balance,
          token === 'ETH' ? 18 : token0Balance.decimals,
        )
    ) {
      toast.warning(`Insufficient ${token} balance!`);
      setIsNotCloseable(false);
      return;
    }

    if (!quote || !quoteDetail) {
      toast.warning('Cover quote info is not loaded correctly.');
      setIsNotCloseable(false);
      return;
    }
    setTxPending(true);
    try {
      const { company_code } = product;
      const policy = {
        company_code: product.company_code,
        unique_id: product.unique_id,
        address: product.address,
        name: product.name,
        type: product.type,
        duration_days: period,
        chain: 'ethereum',
        crypto_currency: currency || 'ETH',
        crypto_amount: coverAmount,
        wallet_address: account,
      };
      let transaction = null;
      if (company_code === 'nexus') {
        // Buy Nexus Mutual Cover
        const data = ethers.utils.defaultAbiCoder.encode(
          ['uint', 'uint', 'uint', 'uint', 'uint8', 'bytes32', 'bytes32'],
          [
            quoteDetail.price,
            quoteDetail.priceInNXM,
            quoteDetail.expiresAt,
            quoteDetail.generatedAt,
            quoteDetail.v,
            quoteDetail.r,
            quoteDetail.s,
          ],
        );
        transaction = await onNMStake(
          {
            contractAddress: product.address,
            coverAsset: currency === 'ETH' ? ETH_ADDRESS : getTokenAddress(currency), // ETH stands address
            sumAssured: ethers.utils.parseEther(coverAmount),
            coverPeriod: period,
            coverType: 0,
            data,
            token: token0,
          },
          applyDiscount,
        );
      } else if (company_code === 'insurace') {
        // Buy InsuareAce Cover
        const confirmInfo = await axiosPost(`${API_BASE_URL}/company/insurace/confirm-premium`, {
          ...quoteDetail,
          chain: 'ETH',
        });

        transaction = await onIAStake(
          {
            data: confirmInfo?.data?.data,
            token: token0,
            premium: quoteDetail.premiumAmount,
          },
          applyDiscount,
        );
      } else if (company_code === 'nsure') {
        // Buy Nsure Network Cover
      }
      setTxPending(false);
      if (transaction && transaction.status) {
        // console.log({ ...policy, txn_hash: transaction.txn_hash, token_id: transaction.token_id })
        dispatch(
          buyCover({ ...policy, txn_hash: transaction.txn_hash, token_id: transaction.token_id }),
        );
        logEvent(analytics, 'Action - Cover policy bought', {
          name: product.name,
          cardType: product.cardType,
          company: product.company,
          type: product.type,
        });
        toast.success('Successfully Purchased.');
      } else {
        toast.warning('Purchasing failed.');
      }
      onConfirmed();
      if (setIsModalOpen) setIsModalOpen();
    } catch (error) {
      setTxPending(false);
      console.log(error);
      toast.warning('Purchasing failed.');
    }
    setIsNotCloseable(false);
  };

  const onApproveCVR = async () => {
    const { company_code } = product;
    setTxPending(true);
    if (company_code === 'nexus') {
      try {
        const result = await onApproveCVRForNM();
        await handleCVRAllowanceForNM();
        if (result) {
          toast.success('CVR token approved.');
        } else {
          toast.warning('CVR token approving failed.');
        }
      } catch (e) {
        setTxPending(false);
        toast.warning('CVR token approving rejected.');
        console.error(e);
      }
    } else if (company_code === 'insurace') {
      try {
        const result = await onApproveCVRForIA();
        await handleCVRAllowanceForIA();
        if (result) {
          toast.success('CVR token approved.');
        } else {
          toast.warning('CVR token approving failed.');
        }
      } catch (e) {
        setTxPending(false);
        toast.warning('CVR token approving rejected.');
        console.error(e);
      }
    } else {
      toast.warning('Unsupported type of product cover.');
    }
    setTxPending(false);
  };

  const onApproveToken = async () => {
    const { company_code } = product;
    setTxPending(true);
    if (company_code === 'nexus') {
      try {
        const result = await onApproveTokenForNM();
        await handleTokenAllowanceForNM();
        if (result) {
          toast.success(`${token} token approved.`);
        } else {
          toast.warning(`${token} token approving failed.`);
        }
      } catch (e) {
        setTxPending(false);
        toast.warning(`${token} token approving rejected.`);
        console.error(e);
      }
    } else if (company_code === 'insurace') {
      try {
        const result = await onApproveTokenForIA();
        await handleTokenAllowanceForIA();
        if (result) {
          toast.success(`${token} token approved.`);
        } else {
          toast.warning(`${token} token approving failed.`);
        }
      } catch (e) {
        setTxPending(false);
        toast.warning(`${token} token approving rejected.`);
        console.error(e);
      }
    } else {
      toast.warning('Unsupported type of product cover.');
    }
    setTxPending(false);
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Premium</h5>
          <h5 className="text-body-lg font-medium">
            {quote.toFixed(5)} {token}
          </h5>
        </div>
        {currency !== 'DAI' && currency !== 'USDT' && (
          <div className="flex items-center justify-between w-full dark:text-white">
            <h5 className="text-h6 font-medium">Pay using CVR for 25% discount</h5>
            <input
              type="checkbox"
              name="applyDiscount"
              className="form-checkbox text-primary-gd-1 focus:ring-offset-0 duration-500"
              checked={applyDiscount}
              onChange={() => {
                if (token0 !== cvrAddress) setApplyDiscount(!applyDiscount);
              }}
            />
          </div>
        )}
        <hr />
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Discount</h5>
          <h5 className="text-body-lg font-medium">
            {discountAmount.toFixed(5)} {token}
          </h5>
        </div>
        <hr />
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Total</h5>
          <h5 className="text-body-lg font-medium">
            {total.toFixed(5)} {token}
          </h5>
        </div>
        {applyDiscount && (
          <div className="flex items-center justify-center w-full mt-2 dark:text-white">
            <h5 className="text-h6 font-medium">{`${cvrAmount.toFixed(
              2,
            )} CVR will be used for payment`}</h5>
          </div>
        )}
        <div className="flex items-center justify-center w-full mt-6">
          <button
            type="button"
            onClick={
              token !== 'ETH' && !tokenAllowance
                ? onApproveToken
                : discountAmount > 0 && !cvrAllowance
                ? onApproveCVR
                : handleConfirm
            }
            className="py-3 md:px-5 px-4 text-white font-Montserrat md:text-body-md text-body-sm md:rounded-2xl rounded-xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            {txPending ? (
              <Loading widthClass="w-4" heightClass="h-4" />
            ) : token !== 'ETH' && !tokenAllowance ? (
              `Approve ${token}`
            ) : discountAmount > 0 && !cvrAllowance ? (
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
};

export default CoverBuyConfirmModal;
