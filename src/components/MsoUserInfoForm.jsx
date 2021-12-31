import React, { useState, useEffect } from 'react';
import { initial } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon, XIcon } from '@heroicons/react/solid';

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

  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const minDate = new Date(year - 100, month, day).toLocaleDateString('en-ca');
  const maxDate = new Date().toLocaleDateString('en-ca');

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

  const handleRemoveUser = (i = null) => {
    if (i === null) setUsers(users.slice(0, -1));
    else {
      const usersCopy = [...users];
      usersCopy.splice(i, 1);
      setUsers(usersCopy);
    }
  };

  // const validateUsers = (usersClone) => {
  //   const mainMember = usersClone.filter((f) => f.userType === 'Main Member').length;
  //   const spouse = usersClone.filter((f) => f.userType === 'Spouse').length;
  //   const dependent = usersClone.filter((f) => f.userType === 'Dependent').length;

  //   if (mainMember > 1) {
  //     setShowAlert(true);
  //     setAlertType('danger');
  //     setAlertText('Number of main members reach its maximum limit according to policy1');
  //     return false;
  //   }
  //   if (spouse > noOfSpouse) {
  //     setShowAlert(true);
  //     setAlertType('danger');
  //     setAlertText(`Number of spouses reach its maximum limit according to policy`);
  //     return false;
  //   }
  //   if (dependent > noOfDependent) {
  //     setShowAlert(true);
  //     setAlertType('danger');
  //     setAlertText(`Number of dependents reach its maximum limit according to policy`);
  //     return false;
  //   }
  //   return true;
  // };

  const handleUserFieldChange = (i, name, value) => {
    const usersClone = [...users];
    usersClone[i][name] = value;
    setUsers(usersClone);
    // if (validateUsers(usersClone)) setUsers(usersClone);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const isVerifiedDob = users.every((item) => new Date(item.dob) >= new Date(minDate));

    if (!isVerifiedDob) {
      setShowAlert(true);
      setAlertType('Warning!');
      return setAlertText('Please select valid DOB');
    }

    if (notRegistered) {
      setShowAlert(true);
      setAlertType('Warning!');
      return setAlertText("You're not registered.");
    }
    return handleBuyNow(users);
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
                className="pl-2 mt-1 text-body-md underline cursor-pointer disabled:cursor-default dark:text-white"
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
                className="pl-2 mt-1 text-body-md underline cursor-pointer disabled:cursor-default dark:text-white"
              >
                Verify OTP
              </button>
            </form>

            <div className="lg:col-span-2 col-span-12">
              <div className="flex items-center mt-4">
                <XCircleIcon className="w-6 h-6 text-red-500" />
                <div className="pl-1 text-h5 dark:text-white">Un-Verified</div>
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
          {/* <button
            type="button"
            className="ml-3 font-Montserrat inline-flex items-center md:px-4 px-2.5 py-3 shadow-lg md:text-body-md text-body-sm  leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg disabled:opacity-80"
            onClick={handleRemoveUser}
            disabled={users.length === 1 || notRegistered}
          >
            Remove
          </button> */}
        </div>
      </div>

      <form id="msp-checkout-form" onSubmit={handleSubmit}>
        <div className="w-full mb-8 overflow-x-auto rounded-lg shadow-lg px-0.5px">
          <table className="w-full">
            <thead>
              <tr className="font-Montserrat text-sm tracking-wide text-white bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 uppercase">
                <th className="p-2 font-medium">User type</th>
                <th className="p-2 font-medium">First Name</th>
                <th className="p-2 font-medium">Last Name</th>
                <th className="p-2 font-medium">Country</th>
                <th className="p-2 font-medium">DOB</th>
                <th className="p-2 font-medium">Identity</th>
                <th className="p-2 font-medium" />
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((user, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-1 text-ms font-semibold border min-w-40">
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
                  </td>
                  <td className="py-1 text-ms font-semibold border">
                    <CheckoutFormInput
                      pattern="[^0-9\?.()/<>[\]\\,':;\{\}+=_|\x22\*&\^%$#@!~`]+"
                      title="Only Alphabets are allowed"
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
                  </td>
                  <td className="py-1 text-ms font-semibold border">
                    <CheckoutFormInput
                      pattern="[^0-9\?.()/<>[\]\\,':;\{\}+=_|\x22\*&\^%$#@!~`]+"
                      title="Only Alphabets are allowed"
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
                  </td>
                  <td className="py-1 text-ms font-semibold border">
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
                  </td>
                  <td className="py-1 text-ms font-semibold border">
                    <CheckoutFormInput
                      type="date"
                      title="Date of Birth"
                      inputValue={user.dob}
                      id="dob"
                      name="dob"
                      fieldChange={handleUserFieldChange}
                      inputPlaceholder="Date of Birth"
                      min={minDate}
                      max={maxDate}
                      index={index}
                      disabled={notRegistered}
                      required
                    />
                  </td>
                  <td className="py-1 text-ms font-semibold border">
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
                  </td>
                  <td className="py-1 text-ms font-semibold border">
                    <button
                      type="button"
                      className="bg-transparent p-1 text-black disabled:text-gray-400"
                      disabled={users.length === 1 || notRegistered}
                      onClick={() => handleRemoveUser(index)}
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
