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
  noPenIcon,
}) => {
  return (
    <div
      className={classNames(
        noPenIcon ? 'px-3' : 'pl-3 pr-10',
        'py-2 w-full bg-promo-input-bg rounded-lg shadow-lg relative border border-light-gray-border',
      )}
    >
      <div className="font-semibold text-body-sm text-dark-blue font-Montserrat">{title}</div>
      <input
        required={required}
        disabled={disabled}
        type={type}
        name={name}
        value={inputValue}
        placeholder={inputPlaceholder}
        onChange={(e) => setChange(e.target.value)}
        className="h-4 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 pl-0 text-black font-Montserrat font-medium text-body-sm"
      />
      {!noPenIcon && <img src={EditIcon} alt="Edit" className="absolute right-4 top-4" />}
    </div>
  );
};
export default FormInput;
