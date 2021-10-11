import React from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationIcon, XIcon } from '@heroicons/react/solid';

const Alert = ({ type = 'success', text = '', onClose }) => {
  const bgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'danger':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      default:
        return '';
    }
  };

  const bgHoverColor = () => {
    switch (type) {
      case 'success':
        return 'hover:bg-green-100';
      case 'danger':
        return 'hover:bg-red-100';
      case 'warning':
        return 'hover:bg-yellow-100';
      default:
        return '';
    }
  };

  const textColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'danger':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      default:
        return '';
    }
  };

  const alertIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;
      case 'danger':
        return <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;
      case 'warning':
        return <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <div className={`rounded-md p-4 ${bgColor()}`}>
      <div className="flex">
        <div className="flex-shrink-0">{alertIcon()}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor()}`}>{text}</p>
        </div>
        {!!onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex ${bgColor()} rounded-md p-1.5 ${textColor()} ${bgHoverColor()} focus:outline-none focus:ring-0 focus:ring-offset-0`}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
