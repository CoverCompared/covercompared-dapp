// remove these comments once we have 2 or more functions here
// eslint-disable-next-line import/prefer-default-export
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
