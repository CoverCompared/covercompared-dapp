import React from 'react';

const SVGGradients = () => {
  return (
    <svg width="0" height="0">
      <defs>
        <linearGradient
          id="primary-gradient"
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#175186" />
          <stop offset="100%" stopColor="#7BC3E4" />
        </linearGradient>
        <linearGradient
          id="secondary-gradient"
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stopColor="#007993" />
          <stop offset="100%" stopColor="#45EA9A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SVGGradients;
