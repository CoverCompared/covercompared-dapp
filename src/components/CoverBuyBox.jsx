import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';

import SelectWithSearch from './common/SelectWithSearch';
import Modal from './common/Modal';
import { getQuote } from '../redux/actions/CoverList';
import { getBalanceNumber } from '../utils/formatBalance';
import { setupNetwork } from '../utils/wallet';
import useAddress from '../hooks/useAddress';
import { SupportedChainId } from '../config/chains';
import useTokenAmount from '../hooks/useTokenAmount';
import CoverBuyConfirmModal from './CoverBuyConfirmModal';

const periodOptions = ['Days', 'Week', 'Month'];

const CoverBuyBox = (props) => {
  const dispatch = useDispatch();
  const { account, chainId } = useWeb3React();
  const { card } = useParams();
  const { quote, quoteDetail, quoteLoader, message } = useSelector((state) => state.coverList);
  const { currentProduct: product } = useSelector((state) => state.app);
  const { buyButton, payWithCVR } = props;

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
    type,
    unique_id,
  } = product || {};

  console.log(currency_limit);
  const [periodField, setPeriodField] = useState(duration_days_min);
  const [periodSelect, setPeriodSelect] = useState(periodOptions[0]);
  const [amountField, setAmountField] = useState('1');
  const [amountSelect, setAmountSelect] = useState(currency[0]);
  const [quoteField, setQuoteField] = useState(quote || 0);
  const [quoteSelect, setQuoteSelect] = useState('ETH');
  const [quoteOptions, setQuoteOptions] = useState(['ETH', 'CVR', 'DOT']);
  const [forceClose, setForceClose] = useState(false);

  const { getTokenAmountForETH, getNeededTokenAmount } = useTokenAmount();
  const { getTokenAddress } = useAddress();
  const cvrAddress = getTokenAddress('cvr');
  // useEffect(() => {
  //   const periodVal = `${periodField}`.split('.')[0];
  //   setPeriodField(+periodVal);
  // }, [periodField]);

  const period = useMemo(() => {
    const periodVal = `${periodField}`.split('.')[0];
    let val = 1;
    switch (periodSelect) {
      case 'Days':
        val = periodVal;
        break;
      case 'Week':
        val = periodVal * 7;
        break;
      case 'Month':
        val = periodVal * 30;
        break;

      default:
        val = 1;
        break;
    }
    return val;
  }, [periodField, periodSelect]);

  const productChainId = useMemo(() => {
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
    return _chainId;
  }, [product]);

  const callGetQuote = useCallback(() => {
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
  }, [account, period, amountSelect, amountField]);
  useEffect(() => {
    (async () => {
      if (chainId !== productChainId) {
        await setupNetwork(productChainId);
      }
    })();
  }, [productChainId]);

  useEffect(() => {
    if (account && period && amountField) {
      // if (
      //   Number(period) >= Number(duration_days_min) &&
      //   Number(period) <= Number(duration_days_max)
      // ) {
      //   callGetQuote();
      // } else {
      //   toast.error(
      //     `Period duration is not valid, it must be between ${duration_days_min} to ${duration_days_max} days`,
      //   );
      // }

      if (
        Number(period) < Number(duration_days_min) ||
        Number(period) > Number(duration_days_max)
      ) {
        toast.error(
          `Period duration is not valid, it must be between ${duration_days_min} to ${duration_days_max} days`,
        );
        return;
      }

      const amountLimit = currency_limit[amountSelect];
      if (
        Number(amountField) < Number(amountLimit.min) ||
        Number(amountField) > Number(amountLimit.max)
      ) {
        toast.error(
          `Amount is not valid, it must be between ${amountLimit.min} to ${amountLimit.max} days`,
        );
        return;
      }

      callGetQuote();
    }
  }, [period, amountField, amountSelect, account]);

  useEffect(() => {
    setQuoteSelect(amountSelect);
    setQuoteOptions([amountSelect, 'CVR', 'DOT']);
  }, [amountSelect]);

  useEffect(() => {
    if (quoteSelect === amountSelect) {
      setQuoteField(quote ? quote.toFixed(6) : quote);
    } else {
      async () => {
        const amount = getBalanceNumber(
          await getNeededTokenAmount(
            getTokenAddress(quoteSelect),
            getTokenAddress(amountSelect),
            quote,
          ),
        );
        const ratio = 4 / 3;
        setQuoteField((amount * ratio).toFixed(6));
      };
    }
    // } else if (quoteSelect === 'CVR') {
    //   (async () => {
    //     const cvrAmount = getBalanceNumber(await getTokenAmountForETH(cvrAddress, quote));
    //     const ratio = 4 / 3;
    //     setQuoteField((cvrAmount * ratio).toFixed(6));
    //   })();
    // } else {
    //   setQuoteField(0);
    // }
  }, [quote, quoteSelect]);

  const onConfirmed = () => {
    setForceClose(true);
    callGetQuote();
  };

  const validate = () => {
    if (!account) {
      toast.warning('You need to login in advance!');
      return false;
    }
    if (chainId !== productChainId) {
      toast.warning('You need to switch over to correct network!');
      return false;
    }
    return true;
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
          fieldType="number"
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
          fieldType="number"
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
          loading={quoteLoader}
          fieldTitle="Quote"
          fieldType="number"
          fieldValue={quoteField}
          setFieldValue={setQuoteField}
          selectedOption={quoteSelect}
          setSelectedOption={setQuoteSelect}
          dropdownOptions={quoteOptions}
          showSearchOption="true"
        />
      </form>

      <div className="w-full flex justify-center">
        <Modal
          title="Members Information Form"
          sizeClass="max-w-6xl"
          renderComponent={CoverBuyConfirmModal}
          forceClose={forceClose}
          validate={validate}
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
            payWithCVR,
          }}
        >
          <button
            ref={buyButton}
            type="button"
            disabled={!!message}
            className="md:py-3 px-6 outline-none border-0 bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 rounded-xl text-white font-Montserrat font-semibold text-body-md shadow-buyInsurance disabled:opacity-80 disabled:cursor-default"
          >
            Buy Now
          </button>
        </Modal>
      </div>
    </>
  );
};

export default CoverBuyBox;
