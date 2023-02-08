import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { parseUnits } from 'ethers/lib/utils';
import {
  CurrencyAmount,
  JSBI,
  Token,
  WETH,
  ETHER,
  Fetcher,
  Trade,
  Router,
  Percent,
  TokenAmount,
} from '@uniswap/sdk';
import { BigNumber } from 'ethers';
import { toast } from 'react-toastify';
import useAddress from '../../hooks/useAddress';
import SwapIcon from '../../assets/img/swap-icon.svg';
import SwapWhiteIcon from '../../assets/img/swap-white-icon.svg';
import { ThemeContext } from '../../themeContext';
import { useUniswapV2RouterContract } from '../../hooks/useContract';
import useTokenApprove from '../../hooks/useTokenApprove';
import useGetAllowanceOfToken from '../../hooks/useGetAllowanceOfToken';
import useTokenBalance, { useGetEthBalance } from '../../hooks/useTokenBalance';
import { getBalanceNumber } from '../../utils/formatBalance';
import { BASE_SCAN_URLS, ROUTER_ADDRESS } from '../../config';
import { setPendingTransaction, openSwapModal } from '../../redux/actions';

const tryParseAmount = (value, currency) => {
  if (!value || !currency) {
    return undefined;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== '0') {
      return currency instanceof Token
        ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
        : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.info(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return undefined;
};

const wrappedCurrency = (currency, chainId) => {
  return chainId && currency === ETHER
    ? WETH[chainId]
    : currency instanceof Token
    ? currency
    : undefined;
};
const useTradeExactIn = (currencyAmountIn, currencyOut) => {
  const [pair, setPair] = useState(null);
  const { chainId } = useWeb3React();
  useEffect(() => {
    if (currencyAmountIn && currencyOut) {
      (async () => {
        setPair(
          await Fetcher.fetchPairData(
            wrappedCurrency(currencyAmountIn?.currency, chainId),
            wrappedCurrency(currencyOut, chainId),
          ),
        );
      })();
    }
  }, [currencyAmountIn, currencyOut, chainId]);
  return useMemo(() => {
    if (currencyAmountIn && currencyOut && pair) {
      return (
        Trade.bestTradeExactIn([pair], currencyAmountIn, currencyOut, {
          maxHops: 3,
          maxNumResults: 1,
        })[0] ?? null
      );
    }
    return null;
  }, [pair, currencyAmountIn, currencyOut]);
};

const useTradeExactOut = (currencyIn, currencyAmountOut) => {
  const [pair, setPair] = useState(null);
  const { chainId } = useWeb3React();
  useEffect(() => {
    if (currencyIn && currencyAmountOut) {
      (async () => {
        setPair(
          await Fetcher.fetchPairData(
            wrappedCurrency(currencyAmountOut?.currency, chainId),
            wrappedCurrency(currencyIn, chainId),
          ),
        );
      })();
    }
  }, [currencyIn, currencyAmountOut, chainId]);
  return useMemo(() => {
    if (currencyIn && currencyAmountOut && pair) {
      return (
        Trade.bestTradeExactOut([pair], currencyIn, currencyAmountOut, {
          maxHops: 3,
          maxNumResults: 1,
        })[0] ?? null
      );
    }
    return null;
  }, [pair, currencyIn, currencyAmountOut]);
};

const useSwapCallArguments = (trade, allowedSlippage, deadline, recipientAddressOrName) => {
  const { account, chainId, library } = useWeb3React();
  const contract = useUniswapV2RouterContract();
  const recipient = account;
  return useMemo(() => {
    if (!trade || !recipient || !library || !account || !chainId) return [];
    const swapMethods = [];
    swapMethods.push(
      Router.swapCallParameters(trade, {
        feeOnTransfer: false,
        allowedSlippage,
        recipient,
        ttl: deadline,
      }),
    );

    if (trade.TradeType === 0) {
      swapMethods.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: true,
          allowedSlippage,
          recipient,
          ttl: deadline,
        }),
      );
    }

    return swapMethods.map((parameters) => ({ parameters, contract }));
  }, [account, allowedSlippage, chainId, deadline, library, recipient, trade]);
};
const useSwapCallback = (trade, allowedSlippage, deadline, recipientAddressOrName) => {
  const { account, chainId, library } = useWeb3React();
  const swapCalls = useSwapCallArguments(trade, allowedSlippage, deadline, recipientAddressOrName);
  const { onApprove } = useTokenApprove(ROUTER_ADDRESS);
  const { cvrAllowance, handleAllowance } = useGetAllowanceOfToken(ROUTER_ADDRESS);
  const recipient = account;
  return useMemo(() => {
    if (!trade || !library || !account || !chainId) {
      return { state: 'Invalid', callback: null, error: 'Missing dependencies' };
    }
    if (!recipient) {
      return { state: 'Loading', callback: null, error: null };
    }

    return {
      state: 'Valid',
      callback: async function onSwap() {
        if (trade.inputAmount.currency.address && !cvrAllowance) {
          await onApprove();
          await handleAllowance();
        }
        const estimatedCalls = await Promise.all(
          swapCalls.map((call) => {
            const {
              parameters: { methodName, args, value },
              contract,
            } = call;
            const options = !value || /^0x0*$/.test(value) ? {} : { value };
            return contract.estimateGas[methodName](...args, options)
              .then((gasEstimate) => {
                return {
                  call,
                  gasEstimate,
                };
              })
              .catch((gasError) => {
                console.info('Gas estimate failed, trying eth_call to extract error', call);

                return contract.callStatic[methodName](...args, options)
                  .then((result) => {
                    console.info(
                      'Unexpected successful call after failed estimate gas',
                      call,
                      gasError,
                      result,
                    );
                    return {
                      call,
                      error: new Error(
                        'Unexpected issue with estimating the gas. Please try again.',
                      ),
                    };
                  })
                  .catch((callError) => {
                    console.info('Call threw error', call, callError);
                    let errorMessage;
                    switch (callError.reason) {
                      case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
                      case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
                        errorMessage =
                          'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.';
                        break;
                      default:
                        errorMessage = `The transaction cannot succeed due to error: ${callError.reason}. This is probably an issue with one of the tokens you are swapping.`;
                    }
                    return { call, error: new Error(errorMessage) };
                  });
              });
          }),
        );

        const successfulEstimation = estimatedCalls.find(
          (el, ix, list) =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        );

        if (!successfulEstimation) {
          const errorCalls = estimatedCalls.filter((call) => 'error' in call);
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error;
          throw new Error(
            'Unexpected error. Please contact support: none of the calls threw an error',
          );
        }

        const {
          call: {
            contract,
            parameters: { methodName, args, value },
          },
          gasEstimate,
        } = successfulEstimation;

        return contract[methodName](...args, {
          gasLimit: gasEstimate
            .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
            .div(BigNumber.from(10000)),
          ...(value && !/^0x0*$/.test(value) ? { value, from: account } : { from: account }),
        })
          .then((response) => {
            return response.hash;
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.');
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, methodName, args, value);
              throw new Error(`Swap failed: ${error.message}`);
            }
          });
      },
      error: null,
    };
  }, [trade, library, account, chainId, recipient, recipientAddressOrName, swapCalls]);
};
const SwapCurrency = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { openSwapModal: isOpen } = useSelector((state) => state.app);
  const { chainId } = useWeb3React();
  // const [isOpen, setISOpen] = useState(false);
  const [firstCurrency, setFirstCurrency] = useState(0);
  const [secondCurrency, setSecondCurrency] = useState(0);
  const { getTokenAddress } = useAddress();

  const ethBalance = useGetEthBalance();
  const cvrBalance = useTokenBalance();

  const [currencies, setCurrencies] = useState({});
  useEffect(() => {
    setCurrencies({
      INPUT: ETHER,
      OUTPUT: new Token(chainId, getTokenAddress('cvr'), 18, 'CVR', 'CVRs'),
    });
  }, [chainId]);
  const [independentField, setIndependentField] = useState('INPUT');
  const [typedValue, setTypedValue] = useState('');
  const dependentField = useMemo(() => {
    return independentField === 'INPUT' ? 'OUTPUT' : 'INPUT';
  }, [independentField]);
  const isExactIn = useMemo(() => {
    return independentField === 'INPUT';
  }, [independentField]);
  const parsedAmount = useMemo(() => {
    return tryParseAmount(
      typedValue,
      (isExactIn ? currencies.INPUT : currencies.OUTPUT) ?? undefined,
    );
  }, [typedValue, isExactIn]);
  const bestTradeExactIn = useTradeExactIn(
    isExactIn ? parsedAmount : undefined,
    currencies.OUTPUT ?? undefined,
  );
  const bestTradeExactOut = useTradeExactOut(
    currencies.INPUT ?? undefined,
    !isExactIn ? parsedAmount : undefined,
  );
  const trade = isExactIn ? bestTradeExactIn : bestTradeExactOut;
  const parsedAmounts = {
    INPUT: independentField === 'INPUT' ? parsedAmount : trade?.inputAmount,
    OUTPUT: independentField === 'OUTPUT' ? parsedAmount : trade?.outputAmount,
  };
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  };
  const slippageTolerance = new Percent('50', '10000');
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    slippageTolerance,
    deadline,
    null,
  );
  const onTypeInput = (value) => {
    setTypedValue(value);
    setIndependentField('INPUT');
  };
  const onTypeOutput = (value) => {
    setTypedValue(value);
    setIndependentField('OUTPUT');
  };
  const changeCurrencySlot = () => {
    setFirstCurrency(secondCurrency);
    setSecondCurrency(firstCurrency);
    setCurrencies({
      INPUT: currencies.OUTPUT,
      OUTPUT: currencies.INPUT,
    });
    setIndependentField(independentField === 'INPUT' ? 'OUTPUT' : 'INPUT');
  };
  const handleSwap = () => {
    if (!formattedAmounts.INPUT || !formattedAmounts.OUTPUT) {
      toast.warning('Please input token amount correctly');
      return;
    }
    if (
      Number(formattedAmounts.INPUT) >
      getBalanceNumber(currencies.INPUT.symbol === 'ETH' ? ethBalance.balance : cvrBalance.balance)
    ) {
      toast.warning(`Insufficient ${currencies.INPUT.symbol} amount`);
      return;
    }
    if (swapCallback) {
      swapCallback()
        .then((hash) => {
          console.log(hash);
          dispatch(
            setPendingTransaction({
              hash,
              description: `Swap exactly ${formattedAmounts.INPUT} ${currencies.INPUT.symbol} for ${formattedAmounts.OUTPUT} ${currencies.OUTPUT.symbol}`,
              etherscan: BASE_SCAN_URLS[chainId],
            }),
          );
        })
        .catch((error) => {
          console.log(error);
          dispatch(setPendingTransaction(null));
        });
    }
  };
  return (
    <>
      <div className="relative ml-3 duration-150">
        <div
          onClick={() => dispatch(openSwapModal(!isOpen))}
          className="p-2 rounded-xl cursor-pointer bg-white dark:bg-featureCard-dark-bg shadow-addToCart"
        >
          <img src={theme === 'light' ? SwapIcon : SwapWhiteIcon} alt="Swap" />
        </div>

        {isOpen && (
          <>
            <div
              className="absolute right-2/4  bg-optionContainerBg p-4 rounded-lg"
              style={{ transform: `translateX(${50}%)` }}
            >
              <div className="bg-white dark:bg-feature-icon-dark-bg rounded-lg p-6">
                <div className="font-Montserrat font-semibold text-dark-blue dark:text-white text-h5 md:text-body-md mb-4">
                  Swap
                </div>
                <div className="flex justify-between items-center p-4 bg-promo-input-bg rounded-lg w-72 relative mb-2">
                  <div className="text-dark-blue font-Montserrat font-semibold text-body-md mr-6">
                    {currencies.INPUT.symbol}
                  </div>
                  <input
                    autoFocus
                    type="number"
                    name="cur1"
                    placeholder="Amount"
                    value={formattedAmounts.INPUT}
                    onChange={(e) => onTypeInput(e.target.value)}
                    className="text-dark-blue font-Montserrat font-semibold text-body-md w-full h-5 pr-0 py-0 text-right border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0 outline-none bg-transparent"
                  />
                  <div
                    className="absolute right-2/4 -bottom-5 cursor-pointer bg-swapIconBg p-2 border-2 border-white dark:border-black shadow-addToCart rounded-xl"
                    style={{ transform: `translateX(${50}%)` }}
                    onClick={changeCurrencySlot}
                  >
                    <img loading="lazy" src={SwapIcon} alt="" className="w-4" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 mb-4 bg-promo-input-bg rounded-lg w-72">
                  <div className="text-dark-blue font-Montserrat font-semibold text-body-md">
                    {currencies.OUTPUT.symbol}
                  </div>
                  <input
                    type="number"
                    name="cur2"
                    value={formattedAmounts.OUTPUT}
                    onChange={(e) => onTypeOutput(e.target.value)}
                    className="text-dark-blue font-Montserrat font-semibold text-body-md w-full h-5 pr-0 py-0 text-right border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0 outline-none bg-transparent"
                  />
                </div>
                <div className="flex justify-center items-center w-72">
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
                  >
                    Swap
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default SwapCurrency;
