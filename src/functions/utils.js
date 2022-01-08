export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const isObject = (a) => {
  return !!a && a.constructor === Object;
};

export const numberFormat = (num, digits) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'm' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};
