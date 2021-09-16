export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
