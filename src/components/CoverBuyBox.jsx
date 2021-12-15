import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';

import { ethers } from 'ethers';

import useGetAllowanceOfToken from '../hooks/useGetAllowanceOfToken';
import useTokenBalance, { useGetEthBalance } from '../hooks/useTokenBalance';
import useTokenApprove from '../hooks/useTokenApprove';
import useStakeForCover from '../hooks/useStakeForCover';
import useTokenAmount from '../hooks/useTokenAmount';
import SelectWithSearch from './common/SelectWithSearch';
import PageLoader from './common/PageLoader';
import Modal from './common/Modal';
import { buyCover, getQuote } from '../redux/actions/CoverList';
import { setLoginModalVisible } from '../redux/actions';
import Loading from './common/TxLoading';
import { getBalanceNumber } from '../utils/formatBalance';
import { setupNetwork } from '../utils/wallet';
import { axiosPost } from '../redux/constants/apicall';
import { API_BASE_URL } from '../redux/constants/config';
import useAddress from '../hooks/useAddress';
import { SupportedChainId } from '../config/chains';

const periodOptions = ['Days', 'Week', 'Month'];

const ConfirmModal = (props) => {
  const {
    setTitle,
    setMaxWidth,
    onConfirmed,
    period,
    product,
    account,
    amountField,
    amountSelect,
    quote,
    quoteDetail,
    setIsModalOpen,
  } = props;

  const dispatch = useDispatch();
  const [txPending, setTxPending] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState(false);

  const { getCrvAddress, getNexusMutualAddress, getInsureAceAddress } = useAddress();

  const ethBalance = useGetEthBalance();
  const crvBalance = useTokenBalance(getCrvAddress());
  const { getTokenAmountForETH, getTokenAmountForUSDC, getETHAmountForUSDC } = useTokenAmount();
  const { onApprove: onApproveForNM } = useTokenApprove(getNexusMutualAddress());
  const { onApprove: onApproveForIA } = useTokenApprove(getInsureAceAddress());
  const { onNMStake, onIAStake } = useStakeForCover();

  const { crvAllowance: crvAllowanceForNM, handleAllowance: handleAllowanceForNM } =
    useGetAllowanceOfToken(getNexusMutualAddress());
  const { crvAllowance: crvAllowanceForIA, handleAllowance: handleAllowanceForIA } =
    useGetAllowanceOfToken(getInsureAceAddress());

  const crvAllowance = useMemo(() => {
    const { company_code } = product;
    if (company_code === 'nexus') {
      return crvAllowanceForNM;
    }
    if (company_code === 'insurace') {
      return crvAllowanceForIA;
    }
    return false;
  }, [product, crvAllowanceForNM, crvAllowanceForIA]);

  useEffect(() => {
    handleAllowanceForNM();
    handleAllowanceForIA();
    setTitle('Confirmation');
    setMaxWidth('max-w-lg');
  }, []);

  const [quoteInUSD, setQuoteInUSD] = useState(0);

  useEffect(() => {
    (async () => {
      const eth_per_usdc = await getETHAmountForUSDC(1);
      setQuoteInUSD(quote / getBalanceNumber(eth_per_usdc));
    })();
  }, [quote, applyDiscount]);

  const discountAmount = useMemo(() => {
    const discount = (+quoteInUSD * 25) / 100;
    return applyDiscount ? discount : 0;
  }, [quoteInUSD, applyDiscount]);

  const total = useMemo(() => {
    return +quoteInUSD - discountAmount;
  }, [quoteInUSD, discountAmount]);

  const handleConfirm = async () => {
    if (!account) {
      toast.warning('You need to login in advance!');
      dispatch(setLoginModalVisible(true));
      return;
    }
    if (period < 30) {
      toast.warning('Period should be equal to 30 or larger than that.');
      return;
    }
    const ethAmount = await getETHAmountForUSDC(total);
    // const crvAmount = await getTokenAmountForETH(getCrvAddress(), (quote * 75) / 100);
    const crvAmount = await getTokenAmountForUSDC(getCrvAddress(), discountAmount);

    if (
      !applyDiscount &&
      getBalanceNumber(ethAmount) >= ethers.utils.formatEther(ethBalance.balance)
    ) {
      toast.warning('Insufficient ETH balance!');
      return;
    }
    if (applyDiscount && getBalanceNumber(crvAmount) >= getBalanceNumber(crvBalance.balance)) {
      toast.warning('Insufficient CVR balance!');
      return;
    }
    if (!quote || !quoteDetail) {
      toast.warning('Cover quote info is not loaded correctly.');
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
        crypto_currency: amountSelect,
        crypto_amount: amountField,
        wallet_address: account,
      };
      let transaction = null;
      if (company_code === 'nexus') {
        // Buy Nexus Mutual Cover
        if (!crvAllowanceForNM) {
          try {
            const result = await onApproveForNM();
            await handleAllowanceForNM();
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
        }

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
            coverAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH stands address
            sumAssured: ethers.utils.parseEther(amountField),
            coverPeriod: period,
            coverType: 0,
            data,
          },
          applyDiscount,
        );
      } else if (company_code === 'insurace') {
        // Buy InsuareAce Cover
        if (!crvAllowanceForIA) {
          try {
            const result = await onApproveForIA();
            await handleAllowanceForIA();
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
        }
        const confirmInfo = await axiosPost(`${API_BASE_URL}/company/insurace/confirm-premium`, {
          ...quoteDetail,
          chain: 'ETH',
        });
        transaction = await onIAStake(
          {
            data: confirmInfo?.data?.data,
            premium: quoteDetail.premiumAmount,
          },
          applyDiscount,
        );
      } else if (company_code === 'nsure') {
        // Buy Nsure Network Cover
      }
      setTxPending(false);
      if (transaction && transaction.status) {
        dispatch(buyCover({ ...policy, txn_hash: transaction.txn_hash }));
        toast.success('Purchasing cover succeed.');
      } else {
        toast.error('Purchasing cover failed.');
      }
      onConfirmed();
      if (setIsModalOpen) setIsModalOpen();
    } catch (error) {
      setTxPending(false);
      toast.warning(error.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Premium</h5>
          <h5 className="text-body-lg font-medium">{quoteInUSD.toFixed(3)} USD</h5>
        </div>
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
          <h5 className="text-body-lg font-medium">{discountAmount.toFixed(3)} USD</h5>
        </div>
        <hr />
        <div className="flex items-center justify-between w-full dark:text-white">
          <h5 className="text-h6 font-medium">Total</h5>
          <h5 className="text-body-lg font-medium">{total.toFixed(3)} USD</h5>
        </div>
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
};

const CoverBuyBox = (props) => {
  const dispatch = useDispatch();
  const { account, chainId } = useWeb3React();
  const { card } = useParams();
  const { quote, quoteDetail, loader } = useSelector((state) => state.coverList);
  const { currentProduct: product } = useSelector((state) => state.app);

  const {
    name,
    cardType,
    company_code,
    address,
    product_id,
    currency,
    company,
    duration_days_max,
    duration_days_min,
    logo,
    company_icon,
    currency_limit,
  } = product || {};

  const supportedChains = product?.supportedChains?.length ? product.supportedChains : ['ETH'];

  const [periodField, setPeriodField] = useState('30');
  const [periodSelect, setPeriodSelect] = useState(periodOptions[0]);
  const [amountField, setAmountField] = useState('1');
  const [amountSelect, setAmountSelect] = useState(currency[0]);
  const [quoteField, setQuoteField] = useState(quote || 0);
  const [quoteSelect, setQuoteSelect] = useState(supportedChains[0]);

  const period = useMemo(() => {
    let val = 1;
    switch (periodSelect) {
      case 'Days':
        val = periodField;
        break;
      case 'Week':
        val = periodField * 7;
        break;
      case 'Month':
        val = periodField * 30;
        break;

      default:
        val = 1;
        break;
    }
    return val;
  }, [periodField, periodSelect]);

  const callGetQuote = () => {
    dispatch(
      getQuote({
        address,
        period,
        product_id,
        owner_id: account,
        company: company_code,
        currency: amountSelect || 'ETH',
        coverAmount: amountField,
        supported_chain: 'Ethereum',
      }),
    );
  };

  useEffect(() => {
    (async () => {
      const { company_code } = product;
      let _chainId = SupportedChainId.RINKEBY;
      switch (company_code) {
        case 'nexus':
          _chainId = SupportedChainId.KOVAN;
          break;
        case 'insurace':
          _chainId = SupportedChainId.RINKEBY;
          break;
        case 'nsure':
          break;
        default:
          break;
      }
      if (chainId !== _chainId) {
        await setupNetwork(_chainId);
      }
    })();
  }, [product]);

  useEffect(() => {
    if (account && period && amountField) callGetQuote();
  }, [period, amountField, amountSelect, account]);

  useEffect(() => {
    setQuoteField(quote ? quote.toFixed(6) : quote);
  }, [quote]);

  const onConfirmed = () => {
    callGetQuote();
  };

  return (
    <>
      <div className="font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white">
        Cover Period and Amount
      </div>
      <form onSubmit={() => {}} className="relative">
        <SelectWithSearch
          {...props}
          autoFocus
          fieldTitle="Period"
          fieldSubtitle="Max"
          fieldValue={periodField}
          setFieldValue={setPeriodField}
          selectedOption={periodSelect}
          setSelectedOption={setPeriodSelect}
          dropdownOptions={periodOptions}
          showSearchOption="true"
        />
        <SelectWithSearch
          {...props}
          fieldTitle="Amount"
          fieldSubtitle="Max"
          fieldValue={amountField}
          setFieldValue={setAmountField}
          selectedOption={amountSelect}
          setSelectedOption={setAmountSelect}
          dropdownOptions={currency}
          showSearchOption="true"
        />
        <SelectWithSearch
          {...props}
          readOnly
          loading={loader}
          fieldTitle="Quote"
          fieldValue={quoteField}
          setFieldValue={setQuoteField}
          selectedOption={quoteSelect}
          setSelectedOption={setQuoteSelect}
          dropdownOptions={supportedChains}
          showSearchOption="true"
        />
      </form>

      <Modal
        title="Members Information Form"
        sizeClass="max-w-6xl"
        renderComponent={ConfirmModal}
        bgImg="bg-loginPopupBg"
        {...{
          period,
          product,
          account,
          amountField,
          amountSelect,
          quote,
          quoteDetail,
          onConfirmed,
        }}
      >
        <div className="grid grid-cols-12 gap-3 w-full">
          <button
            type="button"
            className="col-span-7 md:py-3 px-2 outline-none border-0 bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 rounded-xl text-white font-Montserrat font-semibold text-body-md shadow-buyInsurance"
          >
            Buy Now
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CoverBuyBox;
