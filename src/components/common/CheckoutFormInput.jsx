import React from 'react';
import { classNames } from '../../functions/utils';

const CheckoutFormInput = ({
  title,
  inputValue,
  fieldChange,
  key,
  id,
  name,
  min,
  max,
  index,
  inputPlaceholder,
  type = 'text',
  required,
  disabled,
  readOnly,
  isDropdown,
  dropdownOptions,
  pattern,
}) => {
  // return isDropdown ? (
  //   <div
  //     className={classNames(
  //       disabled ? 'bg-promo-input-disabled-bg' : 'bg-promo-input-bg',
  //       'py-2 px-3 w-full rounded-lg shadow-lg relative border border-light-gray-border',
  //     )}
  //   >
  //     <div className="font-semibold text-body-sm text-dark-blue font-Montserrat text-left">
  //       {title}
  //     </div>
  //     <select
  //       required={required}
  //       disabled={disabled}
  //       name={name}
  //       value={inputValue}
  //       placeholder={inputPlaceholder}
  //       onChange={({ target: { name, value } }) => fieldChange(index, name, value)}
  //       className={classNames(
  //         disabled ? 'text-gray-500' : 'text-black',
  //         'p-0 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 font-Montserrat font-medium text-body-sm',
  //       )}
  //     >
  //       {dropdownOptions?.map((m, i) =>
  //         typeof m === 'string' ? (
  //           <option key={i} value={m}>
  //             {m}
  //           </option>
  //         ) : (
  //           <option key={i} value={m.value}>
  //             {m.label}
  //           </option>
  //         ),
  //       )}
  //     </select>
  //   </div>
  // ) : (
  //   <div
  //     className={classNames(
  //       disabled ? 'bg-promo-input-disabled-bg' : 'bg-promo-input-bg',
  //       'py-2 px-3 w-full rounded-lg shadow-lg relative border border-light-gray-border',
  //     )}
  //   >
  //     <div className="font-semibold text-body-sm text-dark-blue font-Montserrat text-left">
  //       {title}
  //     </div>
  //     <input
  //       required={required}
  //       disabled={disabled}
  //       key={key}
  //       type={type}
  //       id={id}
  //       name={name}
  //       max={max}
  //       value={inputValue}
  //       placeholder={inputPlaceholder}
  //       onChange={({ target: { name, value } }) => fieldChange(index, name, value)}
  //       className={classNames(
  //         disabled ? 'text-gray-500' : 'text-black',
  //         'h-4 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 px-0 font-Montserrat font-medium text-body-sm',
  //       )}
  //     />
  //   </div>
  // );
  return isDropdown ? (
    <select
      required={required}
      disabled={disabled}
      name={name}
      value={inputValue}
      placeholder={inputPlaceholder}
      onChange={({ target: { name, value } }) => fieldChange(index, name, value)}
      className={classNames(
        disabled ? 'text-gray-500 bg-promo-input-disabled-bg' : 'text-black bg-white',
        'py-1 px-2 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 font-Montserrat font-medium text-body-sm',
      )}
    >
      {dropdownOptions?.map((m, i) =>
        typeof m === 'string' ? (
          <option key={i} value={m}>
            {m}
          </option>
        ) : (
          <option key={i} value={m.value}>
            {m.label}
          </option>
        ),
      )}
    </select>
  ) : (
    <input
      readOnly={readOnly}
      required={required}
      disabled={disabled}
      key={key}
      type={type}
      id={id}
      name={name}
      title={title}
      min={min}
      max={max}
      value={inputValue}
      pattern={pattern}
      placeholder={inputPlaceholder}
      onChange={({ target: { name, value } }) => fieldChange(index, name, value)}
      className={classNames(
        disabled ? 'text-gray-500 bg-promo-input-disabled-bg' : 'text-black bg-white',
        'py-1 px-2 h-full w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 font-Montserrat font-medium text-body-sm',
      )}
    />
  );
};
export default CheckoutFormInput;
