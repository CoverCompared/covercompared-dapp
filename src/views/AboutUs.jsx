import React, { useState } from 'react';
import PointIcon from '../assets/img/blue-point.svg';
import Allianz from '../assets/img/allianz.svg';
import AIGLogo from '../assets/img/aig-logo.svg';
import NextCare from '../assets/img/Nextcare.svg';

const AboutUs = () => {
  return (
    <>
      <div className="text-32 text-partner-page-title font-Montserrat font-semibold text-center mb-12 dark:text-white">
        Our Core Team
      </div>
      <div className="flex justify-center xl:px-28 lg:px-24 md:px-16 w-full">
        <div className="grid grid-cols-2 w-full xl:gap-x-28 gap-x-6">
          <div className="flex justify-center">
            <div className="flex-col flex items-center">
              <div className="md:h-32 md:w-32 h-16 w-16 rounded-full bg-gray-300 md:mb-6 mb-4">
                {/* img here */}
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-h6 dark:text-white">
                Kunal Sadani
              </div>
              <div className="text-dark-blue font-Montserrat font-medium text-body-md mb-4 dark:text-white">
                Founder, CEO
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold md:text-body-sm text-body-xsm text-center mb-3 dark:text-white">
                Heading Partnerships, Product & Market Development
              </div>
              <div className="flex-col flex items-start">
                <div className="flex justify-center items-start mb-2">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xsm dark:text-subtitle-dark-text">
                    Worked in a senior leadership role within an insurtech startup (Valued at over
                    $1 billion).
                  </div>
                </div>
                <div className="flex justify-center items-start">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xsm dark:text-subtitle-dark-text">
                    10+ years working in insurance product development with multinational insurers
                  </div>
                </div>
              </div>
              <div className="font-Montserrat font-semibold text-dark-blue text-body-sm mt-4 mb-2 dark:text-white">
                Previous Employers :
              </div>
              <div className="flex align-center">
                <img src={Allianz} alt="Allianz" className="mr-2" />
                <img src={AIGLogo} alt="AIG" />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex-col flex items-center justify-center">
              <div className="md:h-32 md:w-32 h-16 w-16 rounded-full bg-gray-300 md:mb-6 mb-4">
                {/* img here */}
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-h6 dark:text-white text-">
                Anthony Thomas
              </div>
              <div className="text-dark-blue font-Montserrat font-medium text-body-md mb-4 dark:text-white">
                Co-Founder, CIO
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold md:text-body-sm text-body-xsm text-center mb-3 dark:text-white">
                Heading Operations, Systems, &{' '}
                <span className="hidden md:flex">
                  <br />
                </span>{' '}
                Process Setups
              </div>
              <div className="flex-col flex items-start">
                <div className="flex justify-center items-start mb-2">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xsm dark:text-subtitle-dark-text">
                    10 years of operational management experience across various service verticals
                  </div>
                </div>
                <div className="flex justify-center items-start mb-2">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xsm dark:text-subtitle-dark-text">
                    Set up 3 operational service centres simultaneously from scratch comprising over
                    2000+ staff
                  </div>
                </div>
                <div className="flex justify-center items-start">
                  <img src={PointIcon} alt="" className="md:mr-3 mr-2 mt-1" />
                  <div className="text-post-body-text font-inter text-body-xsm dark:text-subtitle-dark-text">
                    Created several regional backend system platforms & projects for multinational
                    insurance providers
                  </div>
                </div>
              </div>
              <div className="font-Montserrat font-semibold text-dark-blue text-body-sm mt-4 mb-2 dark:text-white">
                Previous Employers :
              </div>
              <div className="flex align-center">
                <img src={Allianz} alt="Allianz" className="mr-2" />
                <img src={NextCare} alt="NextCare" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-32 text-partner-page-title font-Montserrat font-semibold text-center mb-12 mt-20 dark:text-white">
        Our Partners
      </div>
      <div className="flex justify-center xl:px-28 lg:px-24 md:px-16 w-full">
        <div className="grid grid-cols-2 w-full xl:gap-x-28 gap-x-6">
          <div className="flex justify-center">
            <div className="flex-col flex items-center">
              <div className="md:h-32 md:w-32 h-16 w-16 rounded-full bg-gray-300 md:mb-6 mb-4">
                {/* img here */}
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-h6 dark:text-white text-center">
                Jaskanwar “Jas” Singh
              </div>
              <div className="text-dark-blue font-Montserrat font-medium text-body-md mb-4 dark:text-white text-center">
                CTO @ Sehteq Healthcare
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-body-sm text-center mb-3 dark:text-white">
                Technology Advisor
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex-col flex items-center">
              <div className="md:h-32 md:w-32 h-16 w-16 rounded-full bg-gray-300 md:mb-6 mb-4">
                {/* img here */}
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-h6 dark:text-white text-center">
                DuckDao.io
              </div>
              <div className="text-dark-blue font-Montserrat font-semibold text-body-sm text-center mt-2 dark:text-white">
                Strategic Advisor
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
