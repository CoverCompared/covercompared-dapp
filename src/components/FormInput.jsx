import React from 'react';
import EditIcon from '../assets/img/Edit.svg';

const FormInput = ({ title, inputValue, setChange, showEditIcon, inputPlaceholder }) => {
  return (
    <div className="py-2 pl-3 pr-10 w-full bg-promo-input-bg rounded-lg shadow-lg relative border-2 border-dark-blue">
      <div className="font-semibold text-body-2xs text-dark-blue font-Montserrat">{title}</div>
      <input
        type="text"
        value={inputValue}
        placeholder={inputPlaceholder}
        onChange={(e) => setChange(e.target.value)}
        className="h-4 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 pl-0 text-black font-Montserrat font-semibold text-body-sm"
      />
      <img src={EditIcon} alt="Edit" className="absolute right-4 top-4" />
    </div>
  );
};
export default FormInput;
