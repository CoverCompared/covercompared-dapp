import React from 'react';

const CounterCard = ({ title, subtitle }) => {
  if (!title || !subtitle) return null;

  return (
    <div className="w-full flex flex-col col-span-1 box-border h-auto">
      <h2
        style={{ WebkitTextFillColor: 'transparent' }}
        className="w-max font-bold md:text-h2 text-h5 bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 bg-clip-text fill-transparent"
      >
        {title}
      </h2>
      <p className="md:w-max font-Inter md:text-body-lg text-body-xsm text-counter-card-text dark:text-white">
        {subtitle}
      </p>
    </div>
  );
};

export default CounterCard;
