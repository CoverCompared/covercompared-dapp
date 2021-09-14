import React from 'react';
import Loading from './Loading';

const OverlayLoading = ({
  overlayBackgroundClass = 'bg-gray-700',
  overlayOpacityClass = 'opacity-75',
  colorClass = 'text-white',
  heightClass = 'h-16',
  widthClass = 'w-16',
  message = '',
}) => {
  return (
    <div id="overlay-loading" className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className={`absolute inset-0 ${overlayBackgroundClass} ${overlayOpacityClass}`} />
        </div>
        <div
          className="inline-block"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <Loading colorClass={colorClass} heightClass={heightClass} widthClass={widthClass} />
        </div>
        <div>
          <p className={`${colorClass} text-xl mt-3`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default OverlayLoading;
