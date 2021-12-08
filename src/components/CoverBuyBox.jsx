import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';

import { ethers } from 'ethers';

import useGetAllowanceOfToken from '../hooks/useGetAllowanceOfToken';
import useTokenBalance from '../hooks/useTokenBalance';
import useTokenApprove from '../hooks/useTokenApprove';
import useStakeForCover from '../hooks/useStakeForCover';
import useTokenAmount from '../hooks/useTokenAmount';
import SelectWithSearch from './common/SelectWithSearch';
import { getQuote } from '../redux/actions/CoverList';
import { setLoginModalVisible } from '../redux/actions';
import Loading from './common/TxLoading';
import { getCrvAddress, getNexusMutualAddress, getInsureAceAddress } from '../utils/addressHelpers';
import { getBalanceNumber } from '../utils/formatBalance';
import { axiosPost } from '../redux/constants/apicall';
import { API_BASE_URL } from '../redux/constants/config';

const periodOptions = ['Days', 'Week', 'Month'];

const CoverBuyBox = (props) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { card } = useParams();
  const { quote, quoteDetail, loader } = useSelector((state) => state.coverList);
  const { currentProduct: product } = useSelector((state) => state.app);

  const { crvAllowance: crvAllowanceForNM, handleAllowance: handleAllowanceForNM } =
    useGetAllowanceOfToken(getNexusMutualAddress());
  const { crvAllowance: crvAllowanceForIA, handleAllowance: handleAllowanceForIA } =
    useGetAllowanceOfToken(getInsureAceAddress());
  useEffect(() => {
    handleAllowanceForNM();
    handleAllowanceForIA();
  }, []);
  const crvBalance = useTokenBalance(getCrvAddress());
  const { getTokenAmountForETH } = useTokenAmount();
  const { onApprove: onApproveForNM } = useTokenApprove(getNexusMutualAddress());
  const { onApprove: onApproveForIA } = useTokenApprove(getInsureAceAddress());
  const { onNMStake, onIAStake } = useStakeForCover();
  // console.log("selected product ::", product);

  const {
    name,
    cardType,
    company_code,
    address,
    product_id,
    currency,
    supportedChains,
    company,
    duration_days_max,
    duration_days_min,
    logo,
    company_icon,
    currency_limit,
  } = product || {};

  const [periodField, setPeriodField] = useState('30');
  const [periodSelect, setPeriodSelect] = useState(periodOptions[0]);
  const [amountField, setAmountField] = useState('1');
  const [amountSelect, setAmountSelect] = useState(currency[0]);
  const [quoteField, setQuoteField] = useState(quote || 0);
  const [quoteSelect, setQuoteSelect] = useState(supportedChains[0]);

  const [txPending, setTxPending] = useState(false);

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
        company: company_code,
        currency: amountSelect,
        coverAmount: amountField,
        supported_chain: quoteSelect,
      }),
    );
  };

  useEffect(() => {
    callGetQuote();
  }, [period, amountField, amountSelect]);

  useEffect(() => {
    setQuoteField(quote ? quote.toFixed(6) : quote);
  }, [quote]);

  const handleBuyNow = async () => {
    if (!account) {
      toast.warning('You need to login in advance!');
      dispatch(setLoginModalVisible(true));
      return;
    }
    if (period < 30) {
      toast.warning('Period should be equal to 30 or larger than that.');
      return;
    }
    const crvAmount = await getTokenAmountForETH(getCrvAddress(), amountField);
    if (getBalanceNumber(crvAmount) >= getBalanceNumber(crvBalance.balance)) {
      toast.warning('Insufficient CRV balance!');
      return;
    }
    if (!quote || !quoteDetail) {
      toast.warning('Cover quote info is not loaded correctly.');
      return;
    }
    setTxPending(true);
    try {
      const { company_code } = product;
      if (company_code === 'nexus') {
        // Buy Nexus Mutual Cover
        if (!crvAllowanceForNM) {
          try {
            const result = await onApproveForNM();
            await handleAllowanceForNM();
            if (result) {
              toast.success('CRV token approved.');
            } else {
              toast.warning('CRV token approving failed.');
            }
          } catch (e) {
            setTxPending(false);
            toast.warning('CRV token approving rejected.');
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
        const result = await onNMStake({
          contractAddress: address,
          coverAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH stands address
          sumAssured: ethers.utils.parseEther(amountField),
          coverPeriod: period,
          coverType: 0,
          data,
        });
      } else if (company_code === 'insurace') {
        // Buy InsuareAce Cover
        if (!crvAllowanceForIA) {
          try {
            const result = await onApproveForIA();
            await handleAllowanceForIA();
            if (result) {
              toast.success('CRV token approved.');
            } else {
              toast.warning('CRV token approving failed.');
            }
          } catch (e) {
            setTxPending(false);
            toast.warning('CRV token approving rejected.');
            console.error(e);
          }
        }
        const confirmInfo = await axiosPost(`${API_BASE_URL}/company/insurace/confirm-premium`, {
          ...quoteDetail,
          chain: 'ETH',
        });
        const result = await onIAStake({
          data: confirmInfo?.data?.data,
          premium: quoteDetail.premiumAmount,
        });
      } else if (company_code === 'nsure') {
        // Buy Nsure Network Cover
      }
      setTxPending(false);
      toast.success('Purchasing cover succeed.');
    } catch (error) {
      setTxPending(false);
      toast.warning('User rejected the transaction.');
      console.log(error);
    }
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

      <div className="grid grid-cols-12 gap-3 w-full">
        <button
          type="button"
          onClick={handleBuyNow}
          className="col-span-7 md:py-3 px-2 outline-none border-0 bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 rounded-xl text-white font-Montserrat font-semibold text-body-md shadow-buyInsurance"
        >
          {txPending ? <Loading widthClass="w-4" heightClass="h-4" /> : `Buy Now`}
        </button>
      </div>
    </>
  );
};

export default CoverBuyBox;
