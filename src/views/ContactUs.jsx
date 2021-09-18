import React, { useState } from 'react';
import uniqid from 'uniqid';
import { classNames } from '../functions/utils';
import FormInput from '../components/FormInput';
import MobilePageTitle from '../components/common/MobilePageTitle';

const TypeOfUser = ['Consumer', 'Insurance Partner', 'Others'];
const ContactUs = (props) => {
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [subject, SetSubject] = useState('');
  const [message, SetMessage] = useState('');

  const isValid = () => {
    return !(name === '' || email === '' || subject === '' || message === '');
  };
  const RadioButtons = () => {
    const [typeOfUser, SetUser] = useState('Consumers');
    return (
      <>
        {TypeOfUser.map((user) => (
          <div className="inline-flex items-center mr-10 mb-4 md:mb-0">
            <input
              id="sample"
              name="sample"
              type="radio"
              className="focus:ring-dark-blue h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
              onClick={() => SetUser(user)}
            />
            <span
              className={classNames(
                typeOfUser === user
                  ? 'text-dark-blue font-semibold dark:text-white'
                  : 'text-contact-input-dark-grey font-medium',
                'ml-2 text-h6 ring-0',
              )}
            >
              {user}
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <MobilePageTitle title="Contact Us" />
      <form className="md:pr-28 md:pl-6 md:mb-8 md:mt-6">
        <div className="grid grid-cols-1 gap-y-6 xl:gap-y-8 gap-x-6 xl:gap-x-8 md:grid-cols-12 lg:grid-cols-12">
          <div className="relative col-span-12 md:col-span-6">
            <FormInput
              title="First Name"
              inputValue={name}
              setChange={SetName}
              inputPlaceholder="Fill Your Name Here"
            />
          </div>
          <div className="relative col-span-12 md:col-span-6">
            <FormInput
              title="Email"
              inputValue={email}
              setChange={SetEmail}
              inputPlaceholder="Fill Your Email Here"
            />
          </div>
        </div>

        <div className="font-Montserrat text-dark-blue font-h1 font-semibold mt-6 dark:text-white">
          Type Of User
        </div>
        <div className="mt-3">
          <RadioButtons {...props} />
        </div>
        <div className="mt-6">
          <FormInput
            title="Subject"
            inputValue={subject}
            setChange={SetSubject}
            inputPlaceholder="Subject"
          />
        </div>

        <div className="relative mt-6">
          <label className="font-Montserrat text-dark-blue font-h1 font-semibold dark:text-white">
            Message
          </label>
          <textarea
            onChange={(e) => SetMessage(e.target.value)}
            className="mt-3 py-2 px-4 h-32 rounded-lg border-2 border-dark-blue focus:border-dark-blue appearance-none w-full bg-promo-input-bg text-black placeholder-contact-input-dark-grey text-base focus:outline-none focus:ring-0 focus:border-0 focus:ring-shadow-none font-Montserrat font-semibold text-body-sm shadow-lg"
            placeholder="Write your message"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid()}
            className="py-3 px-8 mt-8 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default ContactUs;
