import React, { useState, useEffect } from 'react';
import { initial } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from '@heroicons/react/solid';

import CheckoutFormInput from './common/CheckoutFormInput';
import FormInput from './FormInput';
import { setProfileDetails, verifyOTP } from '../redux/actions/Auth';
import { resetDeviceInsurance } from '../redux/actions/DeviceInsurance';
import Alert from './common/Alert';

const MsoUserInfoForm = (props) => {
  // remove default values from below object once response is in this format
  const {
    uuid,
    unique_id,
    userTypeOptions,
    noOfSpouse,
    noOfDependent,
    mainMemberParents,
    spouseParents,
    totalUsers,
    countries,
    handleBuyNow,
  } = props;
  const dispatch = useDispatch();

  const userObject = {
    userType: '',
    firstName: '',
    lastName: '',
    country: 'UAE',
    dob: '',
    identity: '',
    typeChangeable: true,
  };

  const authState = useSelector((state) => state.auth);
  const { showOTPScreen, showVerified, is_verified, loader, isFailed } = authState;
  const notRegistered = !is_verified;
  const [users, setUsers] = useState([
    { ...userObject, userType: 'Main Member', typeChangeable: true },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userOtp, setUserOtp] = useState('');

  useEffect(() => {
    dispatch(resetDeviceInsurance());
  }, []);

  useEffect(() => {
    if (emailSubmitted && showOTPScreen && isFailed && !loader) {
      setShowAlert(true);
      setAlertType('danger');
      return setAlertText("You've provided an invalid OTP");
    }
    if (emailSubmitted && showOTPScreen && !loader) {
      setShowAlert(true);
      setAlertType('success');
      return setAlertText('An OTP has been sent to your email');
    }
    if (emailSubmitted && showVerified && !loader) {
      setShowAlert(true);
      setAlertType('success');
      return setAlertText('Thank you! your email has been verified successfully');
    }
    return null;
  }, [showOTPScreen, showVerified, loader, isFailed, emailSubmitted]);

  const handleAddUser = () => {
    if (totalUsers > 0 && users.length === totalUsers) {
      setShowAlert(true);
      setAlertType('warning');
      return setAlertText(`Sorry! can't add more than ${totalUsers} member for the selected plan`);
    }
    return setUsers([...users, { ...userObject }]);
  };

  const handleRemoveUser = () => {
    setUsers(users.slice(0, -1));
  };

  const validateUsers = (usersClone) => {
    const mainMember = usersClone.filter((f) => f.userType === 'Main Member').length;
    const spouse = usersClone.filter((f) => f.userType === 'Spouse').length;
    const dependent = usersClone.filter((f) => f.userType === 'Dependent').length;

    if (mainMember > 1) {
      setShowAlert(true);
      setAlertType('danger');
      setAlertText('Number of main members reach its maximum limit according to policy1');
      return false;
    }
    if (spouse > noOfSpouse) {
      setShowAlert(true);
      setAlertType('danger');
      setAlertText(`Number of spouses reach its maximum limit according to policy`);
      return false;
    }
    if (dependent > noOfDependent) {
      setShowAlert(true);
      setAlertType('danger');
      setAlertText(`Number of dependents reach its maximum limit according to policy`);
      return false;
    }
    return true;
  };

  const handleUserFieldChange = (i, name, value) => {
    const usersClone = [...users];
    usersClone[i][name] = value;
    if (validateUsers(usersClone)) setUsers(usersClone);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    handleBuyNow(users);
  };

  const handleSubmitEmail = (e) => {
    if (e) e.preventDefault();
    setEmailSubmitted(true);
    dispatch(setProfileDetails({ email: userEmail }));
  };

  const handleSubmitOTP = async (e) => {
    if (e) e.preventDefault();
    await dispatch(verifyOTP({ otp: userOtp }));
  };

  return (
    <>
      {showAlert && (
        <div className="mb-4">
          <Alert type={alertType} text={alertText} onClose={() => setShowAlert(false)} />
        </div>
      )}
      {notRegistered && (
        <>
          <div className="mb-4 flex justify-between items-center">
            <h5 className="font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-body-md dark:text-white text-left">
              Registration Information
            </h5>
          </div>

          <div className="grid grid-cols-12 gap-6 w-full mb-8">
            <form className="lg:col-span-5 col-span-12" onSubmit={handleSubmitEmail}>
              <FormInput
                type="email"
                title="Email"
                inputValue={userEmail}
                setChange={setUserEmail}
                inputPlaceholder="Email"
                disabled={!notRegistered}
                required
              />
              <button
                type="submit"
                disabled={!notRegistered}
                className="pl-2 mt-1 text-body-md underline cursor-pointer disabled:cursor-default"
              >
                Send verification OTP
              </button>
            </form>

            <form className="lg:col-span-5 col-span-12" onSubmit={handleSubmitOTP}>
              <FormInput
                type="number"
                title="OTP"
                inputValue={userOtp}
                setChange={setUserOtp}
                inputPlaceholder="OTP"
                disabled={!showOTPScreen || !emailSubmitted || !notRegistered}
                required
              />
              <button
                type="submit"
                disabled={!showOTPScreen || !notRegistered}
                className="pl-2 mt-1 text-body-md underline cursor-pointer disabled:cursor-default"
              >
                Verify OTP
              </button>
            </form>

            <div className="lg:col-span-2 col-span-12">
              <div className="flex items-center mt-4">
                <XCircleIcon className="w-6 h-6 text-red-500" />
                <div className="pl-1 text-h5">Un-Verified</div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mb-4 flex justify-between items-center">
        <h5 className="font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-body-md dark:text-white text-left">
          Member(s) Information
        </h5>
        <div className="flex justify-center ml-4">
          <button
            type="button"
            disabled={notRegistered}
            onClick={handleAddUser}
            className="font-Montserrat inline-flex items-center md:px-4 px-2.5 py-3 shadow-lg md:text-body-md text-body-sm  leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg disabled:opacity-80"
          >
            Add
          </button>{' '}
          <button
            type="button"
            className="ml-3 font-Montserrat inline-flex items-center md:px-4 px-2.5 py-3 shadow-lg md:text-body-md text-body-sm  leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg disabled:opacity-80"
            onClick={handleRemoveUser}
            disabled={users.length === 1 || notRegistered}
          >
            Remove
          </button>
        </div>
      </div>

      <form id="msp-checkout-form" onSubmit={handleSubmit}>
        <div className="w-full mb-8">
          <div className="grid grid-cols-12 w-full text-center bg-gray-200">
            <div className="lg:col-span-2 col-span-12 border border-black">User type</div>
            <div className="lg:col-span-2 col-span-12 border border-black">First Name</div>
            <div className="lg:col-span-2 col-span-12 border border-black">Last Name</div>
            <div className="lg:col-span-2 col-span-12 border border-black">Country</div>
            <div className="lg:col-span-2 col-span-12 border border-black">DOB</div>
            <div className="lg:col-span-2 col-span-12 border border-black">Identity</div>
          </div>

          {users.map((user, index) => (
            <div key={index} className="grid grid-cols-12 w-full">
              <div className="lg:col-span-2 col-span-12 border border-black">
                <CheckoutFormInput
                  title="Type of user"
                  id="userType"
                  name="userType"
                  inputValue={user.userType}
                  fieldChange={handleUserFieldChange}
                  inputPlaceholder="Type of user"
                  index={index}
                  disabled={!user.typeChangeable || notRegistered}
                  required
                  isDropdown
                  dropdownOptions={[
                    { label: 'Select user type', value: '' },
                    ...userTypeOptions.map((m) => ({ label: m, value: m })),
                  ]}
                />
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black">
                <CheckoutFormInput
                  title="First Name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  inputValue={user.firstName}
                  inputPlaceholder="First Name"
                  fieldChange={handleUserFieldChange}
                  index={index}
                  disabled={notRegistered}
                  required
                />
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black">
                <CheckoutFormInput
                  title="Last Name"
                  type="text"
                  id="lastName"
                  name="lastName"
                  inputValue={user.lastName}
                  inputPlaceholder="Last Name"
                  fieldChange={handleUserFieldChange}
                  index={index}
                  disabled={notRegistered}
                  required
                />
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black">
                <CheckoutFormInput
                  title="Country of residence"
                  inputValue={user.country}
                  id="country"
                  name="country"
                  fieldChange={handleUserFieldChange}
                  inputPlaceholder="Country of residence"
                  index={index}
                  disabled={notRegistered}
                  required
                  isDropdown
                  dropdownOptions={initial(countries)}
                />
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black">
                <CheckoutFormInput
                  type="date"
                  title="Date of Birth"
                  inputValue={user.dob}
                  id="dob"
                  name="dob"
                  fieldChange={handleUserFieldChange}
                  inputPlaceholder="Date of Birth"
                  max={new Date().toLocaleDateString('en-ca')}
                  index={index}
                  disabled={notRegistered}
                  required
                />
              </div>
              <div className="lg:col-span-2 col-span-12 border border-black">
                <CheckoutFormInput
                  title="Identity"
                  type="text"
                  id="identity"
                  name="identity"
                  inputValue={user.identity}
                  inputPlaceholder="Aadhar or passport"
                  fieldChange={handleUserFieldChange}
                  index={index}
                  disabled={notRegistered}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <div>
            <input
              required
              id="terms"
              type="checkbox"
              className="form-checkbox rounded-sm text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
            />
            <label
              htmlFor="terms"
              className="ml-2 font-Montserrat font-medium md:text-body-md text-body-xs  text-dark-blue dark:text-white group-hover:text-white"
            >
              I have read and agree to the{' '}
              <a className="underline" target="_blank" href="https://google.com" rel="noreferrer">
                terms and conditions
              </a>{' '}
              *
            </label>
          </div>
          <button
            type="submit"
            className="ml-3 py-3 md:px-5 px-4 text-white font-Montserrat md:text-body-md text-body-sm md:rounded-2xl rounded-xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            Proceed to Pay
          </button>
        </div>
      </form>
    </>
  );
};
export default MsoUserInfoForm;
