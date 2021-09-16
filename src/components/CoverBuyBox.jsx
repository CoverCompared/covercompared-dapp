import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getQuote } from '../redux/actions/CoverList';
import InputWithSelect from './common/InputWithSelect';
import { addItemToCart } from '../redux/actions/AppActions';

const periodOptions = ['Days', 'Week', 'Month'];

const CoverBuyBox = (props) => {
  const { quote, loader, product } = props;
  const { company_code, address, product_id, currency, supportedChains } = product || {};

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

    props.getQuote({
      address,
      period,
      product_id,
      company: company_code,
      currency: amountSelect,
      coverAmount: amountField,
      supported_chain: quoteSelect,
    });
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    props.addItemToCart(props.product);
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

const mapStateToProps = ({ coverList, app }) => ({
  quote: coverList.quote,
  loader: coverList.loader,
  product: app.currentProduct,
});

export default connect(mapStateToProps, { getQuote, addItemToCart })(CoverBuyBox);
