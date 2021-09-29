import React from 'react';
import EditIcon from '../assets/img/Edit.svg';
import { classNames } from '../functions/utils';

const FormInput = ({
  title,
  inputValue,
  setChange,
  name,
  showEditIcon,
  inputPlaceholder,
  type = 'text',
  required,
  disabled,
}) => {
  return (
    <div className="py-2 px-3 w-full bg-promo-input-bg rounded-lg shadow-lg relative border border-light-gray-border">
      <div className="font-semibold text-body-sm text-dark-blue font-Montserrat text-left">
        {title}
      </div>
      <input
        required={required}
        disabled={disabled}
        type={type}
        name={name}
        value={inputValue}
        placeholder={inputPlaceholder}
        onChange={(e) => setChange(e.target.value)}
        className="h-4 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 px-0 text-black font-Montserrat font-medium text-body-sm"
      />
    </div>
  );
};
export default FormInput;
