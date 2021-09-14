import React, { useState } from 'react';

const AdditionalDetails = () => {
  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-4">
            <img
              src="https://via.placeholder.com/1000"
              className="w-full h-52 rounded-2xl"
              alt="Product"
            />
          </div>
          <div className="col-span-7 flex-col flex justify-center">
            <div className="font-Montserrat font-semibold text-dark-blue text-h5 dark:text-white">
              Product Name Here
            </div>
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mt-6 mb-2 dark:text-white">
              Description :
            </div>
            <div className="font-Inter text-counter-card-text text-body-xsm leading-5 dark:text-subtitle-dark-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat
              nunc varius porta. Tincidunt vestibulum vivamus
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-12">
          <div className="col-span-7">
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mb-2 dark:text-white">
              Additional Details :
            </div>
            <div className="font-Inter text-counter-card-text text-body-xsm leading-5 dark:text-subtitle-dark-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat
              nunc varius porta. Tincidunt vestibulum vivamus sed facilisi ac urna quisque etiam
              bibendum. Sed aliquet at aliquam at nascetur hendrerit adipiscing.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-6">
          <div className="col-span-7">
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mb-2 dark:text-white">
              Term & Condition :
            </div>
            <div className="font-Inter text-counter-card-text text-body-xsm leading-5 dark:text-subtitle-dark-text">
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
