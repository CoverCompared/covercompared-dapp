import React from 'react';
import { classNames } from '../../functions/utils';

const MobilePageTitle = ({ title, subtitle }) => {
  return (
    <div className="md:hidden">
      <div
        className={classNames(
          subtitle !== '' ? '' : 'mb-8',
          'font-Montserrat font-semibold text-h2 text-dark-blue dark:text-white',
        )}
      >
        {title}
      </div>
      <div className="font-Inter font-normal text-subtitle-dark-text text-body-md mb-14">
        {subtitle !== '' ? subtitle : ''}
      </div>
    </div>
  );
};
export default MobilePageTitle;
