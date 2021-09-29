import React from 'react';

const Discount = ({ discountPercentage }) => {
  return (
    <>
      {discountPercentage ? (
        <div className="bg-discount-bg rounded-lg shadow-discountShadow px-2 py-1 absolute -right-2 top-1 text-body-xs font-medium text-discount-text">
          {discountPercentage}% applicable
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default Discount;
