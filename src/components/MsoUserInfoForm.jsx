import React, { useState, useEffect } from 'react';
import { initial } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

import CheckoutFormInput from './common/CheckoutFormInput';
import { classNames } from '../functions/utils';
import FormInput from './FormInput';
import { setProfileDetails, resendVerificationEmail, verifyOTP } from '../redux/actions/Auth';
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
    setIsModalOpen,
    countries,
  } = props;
  const dispatch = useDispatch();

  const userObject = {
    userType: '',
    firstName: '',
    lastName: '',
    identity: '',
    typeChangeable: true,
  };

  const authState = useSelector((state) => state.auth);
  const { showOTPScreen, showVerified, is_verified, loader, isFailed } = authState;
  const notRegistered = !is_verified;
  const [users, setUsers] = useState([
    { ...userObject, userType: 'Main Member', typeChangeable: false },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userOtp, setUserOtp] = useState('');

  const [email, setEmail] = useState(authState.email || '');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState(props.country?.value || '');
  const [saveDetails, setSaveDetails] = useState(false);

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
      setAlertText('Main members cannot be more than 1');
      return false;
    }
    if (spouse > noOfSpouse) {
      setShowAlert(true);
      setAlertType('danger');
      setAlertText(`Spouses cannot be more than ${noOfSpouse}`);
      return false;
    }
    if (dependent > noOfDependent) {
      setShowAlert(true);
      setAlertType('danger');
      setAlertText(`Dependents cannot be more than ${noOfDependent}`);
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
    setIsModalOpen(false);
    toast.success('Policy bought successfully');
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
      {!!showAlert && (
        <div className="mb-4">
          <Alert type={alertType} text={alertText} onClose={() => setShowAlert(false)} />
        </div>
      )}
      {(userEmail || notRegistered) && (
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
                className="pl-2 mt-1 text-body-md underline cursor-pointer"
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
                className="pl-2 mt-1 text-body-md underline cursor-pointer"
              >
                Verify OTP
              </button>
            </form>

            <div className="lg:col-span-2 col-span-12">
              {notRegistered ? (
                <div className="flex items-center mt-4">
                  <XCircleIcon className="w-6 h-6 text-red-500" />
                  <div className="pl-1 text-h5">Un-Verified</div>
                </div>
              ) : (
                <div className="flex items-center mt-4">
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  <div className="pl-1 text-h5">Verified</div>
                </div>
              )}
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
        <div className="grid grid-cols-12 gap-4 w-full mb-8">
          {users.map((user, index) => (
            <React.Fragment key={index}>
              <div className="lg:col-span-3 col-span-12">
                <div
                  className={classNames(
                    notRegistered ? 'bg-promo-input-disabled-bg' : 'bg-promo-input-bg',
                    'py-2 px-3 w-full rounded-lg shadow-lg relative border border-light-gray-border',
                  )}
                >
                  <div className="font-semibold text-body-sm text-dark-blue font-Montserrat text-left">
                    Type of user
                  </div>
                  <select
                    className={classNames(
                      notRegistered ? 'text-gray-500' : 'text-black',
                      'w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 p-0 font-Montserrat font-medium text-body-sm',
                    )}
                    name="userType"
                    value={user.userType}
                    placeholder="Type of user"
                    onChange={(e) => handleUserFieldChange(index, e.target.name, e.target.value)}
                    disabled={!user.typeChangeable || notRegistered}
                    required
                  >
                    <option value="">Select user type</option>
                    {userTypeOptions?.map((m, i) => (
                      <option key={i} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="lg:col-span-3 col-span-12">
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
              <div className="lg:col-span-3 col-span-12">
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
              <div className="lg:col-span-3 col-span-12">
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
            </React.Fragment>
          ))}

          <h5 className="col-span-12 mt-5 font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-body-md dark:text-white text-left">
            Personal Details
          </h5>
          <div className="col-span-12 lg:col-span-3">
            <FormInput
              type="date"
              title="Date of Birth"
              inputValue={dob}
              setChange={setDob}
              inputPlaceholder="Date of Birth"
              max={new Date().toLocaleDateString('en-ca')}
              disabled={notRegistered}
              required
              noPenIcon
            />
          </div>
          <div className="lg:col-span-3 col-span-12">
            <FormInput
              title="Country where based"
              inputValue={country}
              setChange={setCountry}
              inputPlaceholder="Country where based"
              disabled={notRegistered}
              required
              isDropdown
              dropdownOptions={initial(countries)}
            />
          </div>
          <div className="lg:col-span-3 col-span-12">
            <FormInput
              type="email"
              title="Email"
              inputValue={userEmail && !notRegistered ? userEmail : email}
              setChange={setEmail}
              inputPlaceholder="Email"
              required
              disabled
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div>
            <input
              type="checkbox"
              name="saveDetails"
              className="form-checkbox rounded-sm text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
              checked={saveDetails}
              onChange={() => setSaveDetails(!saveDetails)}
            />
            <span className="ml-2 font-Montserrat font-medium md:text-body-md text-body-xs  text-dark-blue dark:text-white group-hover:text-white">
              Save for future purposes
            </span>
          </div>
          <button
            type="submit"
            className="py-3 px-8 ml-3 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            Buy
          </button>
        </div>
      </form>
    </>
  );
};
export default MsoUserInfoForm;
