import React from 'react';
import { classNames } from '../../functions/utils';

const CheckoutFormInput = ({
  title,
  inputValue,
  fieldChange,
  key,
  id,
  name,
  index,
  inputPlaceholder,
  type = 'text',
  required,
  disabled,
}) => {
  return (
    <div
      className={classNames(
        disabled ? 'bg-promo-input-disabled-bg' : 'bg-promo-input-bg',
        'py-2 px-3 w-full rounded-lg shadow-lg relative border border-light-gray-border',
      )}
    >
      <div className="font-semibold text-body-sm text-dark-blue font-Montserrat text-left">
        {title}
      </div>
      <input
        required={required}
        disabled={disabled}
        key={key}
        type={type}
        id={id}
        name={name}
        value={inputValue}
        placeholder={inputPlaceholder}
        onChange={({ target: { name, value } }) => fieldChange(index, name, value)}
        className={classNames(
          disabled ? 'text-gray-500' : 'text-black',
          'h-4 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 px-0 font-Montserrat font-medium text-body-sm',
        )}
      />
    </div>
  );
};
export default CheckoutFormInput;
