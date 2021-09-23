import React from 'react';
import EditIcon from '../../assets/img/Edit.svg';

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
    <div className="py-2 pl-3 pr-10 w-full bg-promo-input-bg rounded-lg shadow-lg relative border border-light-gray-border">
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
        className="h-4 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 pl-0 text-black font-Montserrat font-medium text-body-sm"
      />
      <img src={EditIcon} alt="Edit" className="absolute right-4 top-4" />
    </div>
  );
};
export default CheckoutFormInput;
