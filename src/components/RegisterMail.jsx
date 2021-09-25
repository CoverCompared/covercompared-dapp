import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfileDetails, resendVerificationEmail, verifyOTP } from '../redux/actions/Auth';

const RegisterMail = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { userDetailsModalOpen, isOTPPending, loader, isFailed } = authState;

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (isOTPPending && isFailed && !loader) return toast.error("You've provided an invalid OTP");
    if (isOTPPending && !loader) return toast.success('An OTP has been sent to your email');
    return null;
  }, [isOTPPending, loader, isFailed]);

  const handleRegister = (e) => {
    if (e) e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
    };
    dispatch(setProfileDetails(data));
  };

  const handleVerifyOTP = (e) => {
    if (e) e.preventDefault();
    dispatch(verifyOTP({ otp }));
  };

  const handleResendOTP = () => {
    dispatch(resendVerificationEmail({ email }));
  };

  return (
    <>
      <div className="grid grid-cols-11">
        <div className="grid md:col-span-5 col-span-12 md:col-start-4">
          {!isOTPPending ? (
            <form onSubmit={handleRegister}>
              <input
                required
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
              <input
                required
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />

              <button
                type="submit"
                className="w-full hover:text-login-button-text text-black rounded-xl font-semibold text-body-md  h-12 border-none outline-none shadow-md active:shadow-none bg-login-button-bg  duration-200"
              >
                Register
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <input
                required
                type="number"
                max={999999}
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
              <button
                type="submit"
                className="block w-full hover:text-login-button-text text-black rounded-xl font-semibold text-body-md  h-12 border-none outline-none shadow-md active:shadow-none bg-login-button-bg  duration-200"
              >
                Verify
              </button>
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="underline text-white md:text-body-md px-12 md:px-2 hover:text-contact-input-grey"
                >
                  Didn&apos;t received OTP email? click to resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
export default RegisterMail;
