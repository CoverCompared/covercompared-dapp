import React from 'react';
import EditIcon from '../assets/img/Edit.svg';

const FormInput = ({ title, inputValue, setChange, showEditIcon, inputPlaceholder }) => {
  return (
    <div className="py-2 pl-3 pr-4 w-full bg-promo-input-bg rounded-lg grid grid-cols-12 gap-x-4">
      <div className="col-span-9">
        <div className="font-semibold text-body-2xs text-dark-blue font-Montserrat">{title}</div>
        <input
          type="text"
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={(e) => setChange(e.target.value)}
          className="h-4 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 pl-0 text-black font-Montserrat font-semibold text-body-sm"
        />
      </div>
      <div className="col-span-3 flex items-center justify-end">
        <img src={EditIcon} alt="Edit" />
      </div>
    </div>
  );
};
export default FormInput;
