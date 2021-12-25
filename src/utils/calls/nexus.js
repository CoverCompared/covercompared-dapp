const getProductPrice = async (contract, param) => {
  const { contractAddress, coverAsset, sumAssured, coverPeriod, coverType, data } = param;
  try {
    const result = await contract.getProductPrice(
      contractAddress,
      coverAsset,
      sumAssured,
      coverPeriod,
      coverType,
      data,
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const buyCoverByETH = async (contract, param, setTxState) => {
  const { contractAddress, coverAsset, sumAssured, coverPeriod, coverType, maxPriceWithFee, data } =
    param;
  const tx = await contract.buyCoverByETH(
    contractAddress,
    coverAsset,
    sumAssured,
    coverPeriod,
    coverType,
    maxPriceWithFee,
    data,
    { value: maxPriceWithFee },
  );
  setTxState({ state: 'pending', hash: tx.hash });
  const receipt = await tx.wait();
  setTxState({ state: 'confirmed', hash: tx.hash });

  let events = null;
  let buyNMEvent = null;
  let pId = null;

  if (receipt.status) {
    events = receipt.events;
    buyNMEvent = events?.filter((_e) => _e.event === 'BuyNexusMutual')[0];
    pId = buyNMEvent?.args?.pid.toString();
  }

  return {
    status: receipt.status,
    txn_hash: tx.hash,
    token_id: pId,
  };
};

const buyCoverByToken = async (contract, param, setTxState) => {
  const {
    contractAddress,
    coverAsset,
    sumAssured,
    coverPeriod,
    coverType,
    maxPriceWithFee,
    token,
    data,
  } = param;
  const tx = await contract.buyCoverByToken(
    [token, contractAddress, coverAsset],
    sumAssured,
    coverPeriod,
    coverType,
    maxPriceWithFee,
    data,
  );
  setTxState({ state: 'pending', hash: tx.hash });
  const receipt = await tx.wait();
  setTxState({ state: 'confirmed', hash: tx.hash });

  let events = null;
  let buyNMEvent = null;
  let pId = null;

  if (receipt.status) {
    events = receipt.events;
    buyNMEvent = events?.filter((_e) => _e.event === 'BuyNexusMutual')[0];
    pId = buyNMEvent?.args?.pid.toString();
  }

  return {
    status: receipt.status,
    txn_hash: tx.hash,
    token_id: pId,
  };
};

export default {
  getProductPrice,
  buyCoverByETH,
  buyCoverByToken,
};
