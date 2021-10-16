import React from 'react';
import { classNames } from '../functions/utils';

const FormInput = ({
  title,
  inputValue,
  setChange,
  name,
  showEditIcon,
  inputPlaceholder,
  type = 'text',
  max,
  required,
  disabled,
  isDropdown,
  dropdownOptions,
}) => {
  return (
    <div
      className={classNames(
        disabled ? 'bg-promo-input-disabled-bg' : 'bg-promo-input-bg',
        'py-2 px-3 w-full  rounded-lg shadow-lg relative border border-light-gray-border',
      )}
    >
      <div className="font-semibold text-body-sm text-dark-blue font-Montserrat text-left">
        {title}
      </div>
      {isDropdown ? (
        <select
          required={required}
          disabled={disabled}
          name={name}
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={(e) => setChange(e.target.value)}
          className={classNames(
            disabled ? 'text-gray-500' : 'text-black',
            'p-0 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 font-Montserrat font-medium text-body-sm',
          )}
        >
          {dropdownOptions?.map((m) => (
            <option value={m.value}>{m.label}</option>
          ))}
        </select>
      ) : (
        <input
          required={required}
          disabled={disabled}
          max={max}
          type={type}
          name={name}
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={(e) => setChange(e.target.value)}
          className={classNames(
            disabled ? 'text-gray-500' : 'text-black',
            'h-4 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 px-0 font-Montserrat font-medium text-body-sm',
          )}
        />
      )}
    </div>
  );
};
export default FormInput;
