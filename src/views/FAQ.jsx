import React, { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../config/firebase';

const FAQs = () => {
  useEffect(() => {
    logEvent(analytics, 'View - FAQ Page');
  }, []);

  return (
    <>
      <div className="lg:px-24">
        <div className="text-dark-blue md:text-h4 text-h6 font-semibold font-Montserrat dark:text-white">
          How is the insurance premium and payout calculated without the need for human interaction?
        </div>
        <div className="font-Roboto text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text">
          <div className="mt-4">
            Initially, several aspects of the Policy issuance will have human interaction but as a
            knowledge base of processes gets created we have a long-term vision to automate the
            entire platform using machine learning functionalities in the long run of the platform.
          </div>
          <div className="mt-4">
            In the traditional insurance models, product/ pricing is managed by the insurer. In our
            P2P model, initially, the Governance team (Cover Compared) would be working with
            insurance underwriters (pricing experts) when we build out our initial products.
          </div>
          <div className="mt-4">
            Once there is enough experience & data of claims. We would hand over the pricing
            function to the community. This is to ensure that the community gains the needed
            experience from experts to understand how risk assessment is done. Once the knowledge
            transfer is done, we would hand over all aspects of P2P insurance management to the
            community to make it work similar to a DAO.
          </div>
        </div>

        <div className="border-b border-grey-500 dark:border-post-body-text my-8" />

        <div className="text-dark-blue md:text-h4 text-h6 font-semibold font-Montserrat dark:text-white">
          How are the operational and administrative costs of insurance policies and their coverage
          determined?
        </div>
        <div className="font-Roboto text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text">
          <div className="mt-4">
            Our products are only aimed for the retail users and being built in the same fashion.
          </div>
          <div className="mt-4">
            We believe retail crypto user do not have any real insurance options and are at high
            risk & mercy of exchanges in case something goes wrong and we want to cater to mass
            market users. On every policy sold, a small portion of it goes towards managing the
            operations costs & future growth of the platform.
          </div>
        </div>

        <div className="border-b border-grey-500 dark:border-post-body-text my-8" />

        <div className="text-dark-blue md:text-h4 text-h6 font-semibold font-Montserrat dark:text-white">
          What are the ways that Cover Compared generates profits/revenues to maintain the project?
        </div>
        <div className="font-Roboto text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text">
          <div className="mt-4">
            The revenue models differ depending on our insurance platforms:
          </div>

          <div className="mt-4">
            <span className="text-dark-blue dark:text-white font-semibold">
              1. Traditional insurance marketplace
            </span>
            <span>
              {' '}
              - We receive commissions on every policy sale from our insurance providers{' '}
            </span>
          </div>
          <div className="mt-4">
            <span className="text-dark-blue dark:text-white font-semibold">
              2. P2P insurance marketplace
            </span>
            <span>
              {' '}
              - We receive a percentage of the premium to manage the operational cost of the risk
              pool/governance/pricing support/R&D{' '}
            </span>
          </div>
          <div className="mt-4">
            With this model, we are not dependent on “using” the tokens in our treasury but business
            itself takes cares of the operations & expansion of the platform
          </div>
        </div>

        <div className="border-b border-grey-500 dark:border-post-body-text my-8" />

        <div className="text-dark-blue md:text-h4 text-h6 font-semibold font-Montserrat dark:text-white">
          Could there be a reinsurance option/structure built into P2P Cover Compared insurance?
        </div>
        <div className="font-Roboto text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text">
          <div className="mt-4">
            We have this planned in our P2P insurance platform to reinsure a part of the risk using
            a reinsurance company (thus reducing the risk of users in our risk pool) and there is
            work that is happening around this and will share more information once we have a
            concrete partner supporting us for our products.
          </div>
        </div>
      </div>
    </>
  );
};
export default FAQs;
