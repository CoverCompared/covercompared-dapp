import React, { useState } from 'react';

const AdditionalDetails = () => {
  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="md:col-span-4 col-span-11 col">
            <img
              src="https://via.placeholder.com/1000"
              className="w-full h-52 rounded-2xl md:block hidden"
              alt="Product"
            />
            <div className="md:hidden flex items-center">
              <img
                src="https://via.placeholder.com/1000"
                className="w-24 h-24 rounded-2xl"
                alt="Product"
              />
              <div className="font-Montserrat font-semibold text-dark-blue text-h5 dark:text-white ml-6 text-left">
                Product Name Here
              </div>
            </div>
          </div>
          <div className="md:col-span-7 col-span-12 flex-col flex justify-center">
            <div className="font-Montserrat font-semibold text-dark-blue text-h5 dark:text-white hidden md:block ">
              Product Name Here
            </div>
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mt-6 mb-2 dark:text-white text-left">
              Description :
            </div>
            <div className="font-Inter text-counter-card-text text-body-xs leading-5 dark:text-subtitle-dark-text text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat
              nunc varius porta. Tincidunt vestibulum vivamus
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 md:mt-12 mt-6">
          <div className="md:col-span-7 col-span-12">
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mb-2 dark:text-white text-left">
              Additional Details :
            </div>
            <div className="font-Inter text-counter-card-text text-body-xs leading-5 dark:text-subtitle-dark-text text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat
              nunc varius porta. Tincidunt vestibulum vivamus sed facilisi ac urna quisque etiam
              bibendum. Sed aliquet at aliquam at nascetur hendrerit adipiscing.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-6">
          <div className="md:col-span-7 col-span-12">
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mb-2 dark:text-white text-left">
              Term & Condition :
            </div>
            <div className="font-Inter text-counter-card-text text-body-xs leading-5 dark:text-subtitle-dark-text text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat
              nunc varius porta. Tincidunt vestibulum vivamus sed facilisi ac urna quisque etiam
              bibendum. Sed aliquet at aliquam at nascetur hendrerit adipiscing.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdditionalDetails;
