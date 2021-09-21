import React from 'react';
import { useHistory } from 'react-router';
import SearchIcon from '../assets/img/Search.svg';
import Modal from './common/Modal';

const InsuranceCard = ({ icon, title, subtitle, gradientClass, bgImg, redirectTo }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(redirectTo)}
      className={`w-full shadow-insuranceCard duration-200 md:rounded-3xl rounded-xl flex ${gradientClass} md:rounded-3xl rounded-xl from-primary-gd-1 to-primary-gd-2 z-10 cursor-pointer`}
    >
      <div className={`w-full  bg-${bgImg} bg-right bg-100%`}>
        <div className="w-full md:px-6 md:py-5 p-3 flex flex-col text-white">
          <img src={icon} alt={title} className="md:w-14 w-5 h-5 md:h-14" />
          <div className="md:mt-8 mt-2 flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <h2 className="font-Montserrat font-extrabold lg:text-h5 md:text-h6 text-body-3xs">
                {title}
              </h2>
              <p className="font-light lg:text-h5 md:text-h6 text-10">{subtitle}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl px-2 py-2 ml-2">
              <img src={SearchIcon} alt="Search" className="md:max-h-6 max-h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCard;
