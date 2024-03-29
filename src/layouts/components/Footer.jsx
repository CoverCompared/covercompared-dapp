import React from 'react';
import uniqid from 'uniqid';
import { socialMediaLinks } from '../../functions/data';

const Footer = () => {
  return (
    <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-2 md:px-28 mb-8 pt-2 pb-10 md:pb-0">
      <div className="text-dark-blue text-body-md font-Montserrat font-semibold dark:text-white col-span-12 md:col-span-1 flex  md:justify-start justify-center md:mb-0 mb-2 ">
        Copyright © 2023 Cover Compared
      </div>
      <div className="text-dark-blue text-body-md font-Montserrat font-semibold flex md:justify-end justify-center dark:text-white col-span-12 md:col-span-1">
        Privacy Policy | Terms of Use
      </div>

      <div className="flex justify-center mb-2 md:hidden col-span-12 md:col-span-0 mt-4">
        {socialMediaLinks.map((item) => (
          <a key={uniqid()} href={item.href} target="_blank" rel="noreferrer">
            <div className="rounded-full h-5 w-5 hover:bg-bluegradient flex items-center justify-center mx-1.5">
              <img loading="lazy" src={item.icon} alt={item.name} className="h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default Footer;
