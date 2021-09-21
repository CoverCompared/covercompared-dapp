import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import InputWithSelect from './common/InputWithSelect';
import { getQuote } from '../redux/actions/CoverList';
import { addItemToCart } from '../redux/actions/AppActions';

const periodOptions = ['Days', 'Week', 'Month'];

const CoverBuyBox = (props) => {
  const dispatch = useDispatch();
  const { card } = useParams();
  const { quote, loader } = useSelector((state) => state.coverList);
  const { currentProduct: product } = useSelector((state) => state.app);
  console.log('=> ', product);
  const {
    name,
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

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    let type = '';
    if (card === 'smart-contract') {
      type = 'smart-contract';
    } else if (card === 'crypto-exchange') {
      type = 'crypto-exchange';
    }
    dispatch(
      addItemToCart({
        type,
        name,
        company_code,
        address,
        product_id,
        currency,
        company,
        logo,
        company_icon,
        currency_limit,
        duration_days_max,
        duration_days_min,
        periodType: periodSelect,
        period: periodField,
        quote: quoteField,
        quote_chain: quoteSelect,
        quote_currency: amountSelect,
        supportedChains,
      }),
    );
    toast.success('Item added to cart!');
  };

  useEffect(() => {
    callGetQuote();
  }, [periodField, periodSelect, amountField, amountSelect]);

  useEffect(() => {
    setQuoteField(quote ? quote.toFixed(6) : quote);
  }, [quote]);

  return (
    <>
      <div className="font-Montserrat font-semibold text-dark-blue text-body-md mb-2 dark:text-white">
        Cover Period and Amount
      </div>
      <form onSubmit={() => {}}>
        <InputWithSelect
          {...props}
          autoFocus
          fieldTitle="Period"
          fieldSubtitle="Max"
          fieldValue={periodField}
          setFieldValue={setPeriodField}
          selectedOption={periodSelect}
          setSelectedOption={setPeriodSelect}
          dropdownOptions={periodOptions}
        />
        <InputWithSelect
          {...props}
          fieldTitle="Amount"
          fieldSubtitle="Max"
          fieldValue={amountField}
          setFieldValue={setAmountField}
          selectedOption={amountSelect}
          setSelectedOption={setAmountSelect}
          dropdownOptions={currency}
        />
        <InputWithSelect
          {...props}
          readOnly
          loading={loader}
          fieldTitle="Quote"
          fieldValue={quoteField}
          setFieldValue={setQuoteField}
          selectedOption={quoteSelect}
          setSelectedOption={setQuoteSelect}
          dropdownOptions={supportedChains}
        />
      </form>

      <div className="grid grid-cols-12 gap-3 w-full">
        <button
          type="button"
          onClick={handleAddToCart}
          className="col-span-5 md:px-4 py-3 mr-3 outline-none border-0 bg-white rounded-xl text-primary-gd-1 font-Montserrat font-semibold text-body-md shadow-addToCart"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="col-span-7 md:py-3 px-2 outline-none border-0 bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 rounded-xl text-white font-Montserrat font-semibold text-body-md shadow-buyInsurance"
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default CoverBuyBox;
