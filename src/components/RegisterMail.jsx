import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileDetails } from '../redux/actions/CoverList';

const RegisterMail = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const { mailModalVisible } = useSelector((state) => state.app);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // useEffect(() => {
  //   if (!isModalOpen && mailModalVisible) setIsModalOpen(true);
  //   if (isModalOpen && !mailModalVisible) setIsModalOpen(false);
  // }, [mailModalVisible]);

  const registerEmail = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
    };
    dispatch(setProfileDetails(data));
  };

  return (
    <>
      <div className="grid grid-cols-11">
        <div className="grid col-span-5 col-start-4">
          <div className="font-Montserrat text-h5 font-semibold text-dark-blue mb-6 text-center w-full dark:text-white">
            Log In with Email
          </div>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
          />

          <button
            type="button"
            onClick={registerEmail}
            className="hover:text-login-button-text text-black rounded-xl font-semibold text-body-md w-full h-12 border-none outline-none shadow-md active:shadow-none bg-login-button-bg  duration-200"
          >
            Register
          </button>
        </div>
        {/* <div className="font-Montserrat text-sm font-medium text-dark-blue mb-6 text-center w-full my-4 dark:text-white">
          or log in with
        </div>
        <button
          type="button"
          className="hover:text-login-button-text text-black flex justify-center items-center rounded-xl font-semibold text-body-md w-full h-12 border-none outline-none bg-white shadow-md active:shadow-none focus:bg-login-button-bg hover:bg-login-button-bg duration-200"
        >
          <img src={GoogleIcon} alt="" className="mr-3" />
          Google
        </button> */}
      </div>
    </>
  );
};
export default RegisterMail;
