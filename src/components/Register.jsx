import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfileDetails, resendVerificationEmail, verifyOTP } from '../redux/actions/Auth';

const Register = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { showOTPScreen, loader, isFailed } = authState;

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (showOTPScreen && isFailed && !loader) return toast.error("You've provided an invalid OTP");
    if (showOTPScreen && !loader) return toast.success('An OTP has been sent to your email');
    return null;
  }, [showOTPScreen, loader, isFailed]);

  const handleRegister = (e) => {
    if (e) e.preventDefault();
    const data = {
      email,
      first_name: 'Danish',
      last_name: 'Ejaz',
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
      <div className="grid grid-cols-12">
        <div className="grid col-span-12">
          {!showOTPScreen ? (
            <form onSubmit={handleRegister}>
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
                  className="underline dark:text-white text-black md:text-body-md px-12 md:px-2"
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
export default Register;
