import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';

import SelectWithSearch from './common/SelectWithSearch';
import { getQuote } from '../redux/actions/CoverList';
import { setLoginModalVisible } from '../redux/actions';

const periodOptions = ['Days', 'Week', 'Month'];

const CoverBuyBox = (props) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { card } = useParams();
  const { quote, loader } = useSelector((state) => state.coverList);
  const { currentProduct: product } = useSelector((state) => state.app);

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

  const callGetQuote = () => {
    let period = 1;

    switch (periodSelect) {
      case 'Days':
        period = periodField;
        break;
      case 'Week':
        period = periodField * 7;
        break;
      case 'Month':
        period = periodField * 30;
        break;

      default:
        period = 1;
        break;
    }

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
  }, [periodField, periodSelect, amountField, amountSelect]);

  useEffect(() => {
    setQuoteField(quote ? quote.toFixed(6) : quote);
  }, [quote]);

  const handleBuyNow = () => {
    if (!account) {
      toast.warning('You need to login in advance!');
      dispatch(setLoginModalVisible(true));
      return;
    }
    alert('Buy Now button clicked');
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
          Buy Now
        </button>
      </div>
    </>
  );
};

export default CoverBuyBox;
