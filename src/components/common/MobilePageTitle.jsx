import React from 'react';
import { classNames } from '../../functions/utils';

const MobilePageTitle = ({ title, subtitle }) => {
  return (
    <div className="lg:hidden">
      <div
        className={classNames(
          subtitle !== '' ? '' : 'mb-8',
          'font-Montserrat font-semibold xl:text-h2 text-h4 text-dark-blue dark:text-white',
        )}
      >
        {title}
      </div>
      <div className="font-Roboto font-normal text-subtitle-dark-text text-body-md mb-8">
        {subtitle !== '' ? subtitle : ''}
      </div>
    </div>
  );
};
export default MobilePageTitle;
