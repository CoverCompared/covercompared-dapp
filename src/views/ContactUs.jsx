import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { classNames } from '../functions/utils';
import FormInput from '../components/FormInput';
import MobilePageTitle from '../components/common/MobilePageTitle';
import EditIcon from '../assets/img/Edit.svg';
import { submitContactDetails } from '../redux/actions/UserProfile';

const TypeOfUser = ['CUSTOMER', 'PARTNER', 'OTHER'];

const ContactUs = (props) => {
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.userProfile);
  const { isFailed, loader, message, contacUsData } = contactData;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [typeOfUser, setUser] = useState('CUSTOMER');

  const isValid = () => {
    return !(name === '' || email === '' || contactMessage === '');
  };

  const submitDetails = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      user_type: typeOfUser,
      message: contactMessage,
    };
    dispatch(submitContactDetails(payload));
  };

  useEffect(() => {
    if (contacUsData) {
      if (contacUsData?.success) {
        setName('');
        setEmail('');
        setContactMessage('');
        toast.success('Details Sent Successfully');
      } else {
        toast.warning('Please enter valid details');
      }
    }
  }, [contacUsData]);

  const RadioButtons = () => {
    return (
      <>
        {TypeOfUser.map((user) => (
          <div className="inline-flex items-center mr-10 mb-4 md:mb-0" key={uniqid()}>
            <input
              id="sample"
              name="sample"
              type="radio"
              className="focus:ring-dark-blue h-4 w-4 text-dark-blue-1 border-gray-300 border-2"
              onClick={() => setUser(user)}
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
      <form className="xl:pr-28 xl:pl-6 md:mb-8" onSubmit={submitDetails}>
        <div className="grid grid-cols-1 gap-y-6 xl:gap-y-8 gap-x-6 xl:gap-x-8 md:grid-cols-12 lg:grid-cols-12">
          <div className="relative col-span-12 md:col-span-6">
            <FormInput
              title="First Name"
              inputValue={name}
              setChange={setName}
              inputPlaceholder="Fill Your Name Here"
            />
          </div>
          <div className="relative col-span-12 md:col-span-6">
            <FormInput
              title="Email"
              inputValue={email}
              setChange={setEmail}
              inputPlaceholder="Fill Your Email Here"
            />
          </div>
        </div>

        <div className="font-Montserrat text-dark-blue font-h1 font-semibold mt-6 dark:text-white">
          Type Of User
        </div>
        <div className="mt-3">{RadioButtons()}</div>

        <div className="relative mt-6">
          <label className="absolute top-5 pl-4 font-semibold text-body-sm text-dark-blue font-Montserrat">
            Message
          </label>
          <textarea
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            className="mt-3 py-2 px-4 h-40 pt-7 rounded-lg appearance-none w-full border border-light-gray-border focus:border-light-gray-border bg-promo-input-bg text-black placeholder-contact-input-dark-grey text-base focus:outline-none focus:ring-0 focus:border-0 focus:ring-shadow-none font-Montserrat font-medium text-body-sm shadow-lg"
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
