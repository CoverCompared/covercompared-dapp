import React from 'react';
import MovingCart from '../assets/img/moving-cart.png';
import WheetIcon from '../assets/img/wheel.png';

const PhaseCard = ({ ...props }) => {
  const { phaseNumber, phaseIcon, title, descriptionArr } = props;
  return (
    <>
      <div className="bg-white rounded-xl pt-14 relative px-3 pb-32 md:col-span-3 col-span-12 w-full">
        <div className="absolute -top-8 left-2/4" style={{ transform: `translateX(${-50}%)` }}>
          <span className="text-login-button-text font-semibold font-body-md font-Montserrat">
            <svg
              version="1.1"
              id="Shape_85_1_"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="90px"
              height="90px"
              viewBox="0 0 90 90"
              style={{ enableBackground: 'new 0 0 90 90;' }}
            >
              <g id="Shape_85">
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="#59E7A2"
                    d="M72.236,15.559C58.365-0.161,43.568,0.948,36.725,2.612
                                            C10.647,9.641,6.763,31.649,6.763,31.649C0.105,57.358,7.688,76.223,19.525,84.546c23.119,13.871,49.381-5.733,54.19-9.987
                                            C102.938,45.892,74.455,18.148,72.236,15.559z"
                  />
                </g>
              </g>
            </svg>
            <b
              className="absolute left-2/4 top-2/4 text-center"
              style={{ transform: `translateX(${-50}%) translateY(${-50}%` }}
            >
              Phase <br /> {phaseNumber}.
            </b>
          </span>
        </div>
        <div className="flex justify-center">
          <img src={phaseIcon} alt="" />
        </div>
        <div className="text-phase-content font-Montserrat font-bold text-body-sm text-center mt-4 px-1 md:h-9 h-6">
          {title}
        </div>
        {descriptionArr.map((p) => (
          <div className="font-Montserrat text-body-xs text-phase-content md:mt-4 mt-3 text-center font-medium">
            {p}
          </div>
        ))}
        <div className="absolute -bottom-6 left-0 w-full">
          <img src={MovingCart} alt="" className="w-full" />
        </div>
        <div className="absolute -bottom-12 left-0 md:px-4 px-5 w-full">
          <div className="flex justify-between w-full">
            <img src={WheetIcon} alt="" className="animate-wheelSpin" />
            <img src={WheetIcon} alt="" className="animate-wheelSpin" />
          </div>
        </div>
      </div>
    </>
  );
};
export default PhaseCard;