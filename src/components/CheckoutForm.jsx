import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateCartItem } from '../redux/actions/AppActions';
import CheckoutFormInput from './common/CheckoutFormInput';
import FormInput from './FormInput';
import EditIcon from '../assets/img/Edit.svg';

const CheckoutForm = (props) => {
  // remove default values from below object once response is in this format
  const {
    uuid,
    formData,
    unique_id,
    userTypeOptions,
    noOfSpouse,
    noOfDependent,
    mainMemberParents,
    spouseParents,
    totalUsers,
    directCheckout,
    setIsModalOpen,
  } = props;
  const dispatch = useDispatch();

  const userObject = {
    userType: '',
    firstName: '',
    lastName: '',
    identity: '',
    typeChangeable: true,
  };
  const [users, setUsers] = useState(
    formData?.users || [{ ...userObject, userType: 'Main Member', typeChangeable: false }],
  );
  const [email, setEmail] = useState(formData?.email || '');
  const [dob, setDob] = useState(formData?.dob || '');
  const [country, setCountry] = useState(formData?.country || '');
  const [saveDetails, setSaveDetails] = useState(formData?.saveDetails || false);

  const handleAddUser = () => {
    if (totalUsers > 0 && users.length === totalUsers) {
      return toast.warning(`Sorry! can't add more than ${totalUsers} member for the selected plan`);
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
      toast.error('Main members cannot be more than 1');
      return false;
    }
    if (spouse > noOfSpouse) {
      toast.error(`Spouses cannot be more than ${noOfSpouse}`);
      return false;
    }
    if (dependent > noOfDependent) {
      toast.error(`Dependents cannot be more than ${noOfDependent}`);
      return false;
    }
    return true;
  };

  const handleUserFieldChange = (i, name, value) => {
    const usersClone = [...users];
    usersClone[i][name] = value;
    if (validateUsers(usersClone)) setUsers(usersClone);
  };

  const handleSubmit = () => {
    if (!directCheckout) {
      dispatch(
        updateCartItem({
          uuid,
          formData: {
            users,
            email,
            dob,
            country,
            saveDetails,
          },
        }),
      );
    }
    setIsModalOpen(false);
    toast.success(
      `${directCheckout ? 'Membership bought' : 'Form information saved'} successfully`,
    );
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h5 className="font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-h6 dark:text-white">
          Add/Remove Family Members
        </h5>
        <div>
          <button
            type="button"
            onClick={handleAddUser}
            className="font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
          >
            Add
          </button>{' '}
          <button
            type="button"
            className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
            onClick={handleRemoveUser}
            disabled={users.length === 1}
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
                <div className="py-2 px-3 w-full bg-promo-input-bg rounded-lg shadow-lg border border-light-gray-border">
                  <div className="font-semibold text-body-xs text-dark-blue font-Montserrat text-left">
                    Type of user
                  </div>
                  <select
                    className="w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 p-0 text-black font-Montserrat font-medium text-body-sm"
                    name="userType"
                    value={user.userType}
                    placeholder="Type of user"
                    onChange={(e) => handleUserFieldChange(index, e.target.name, e.target.value)}
                    disabled={!user.typeChangeable}
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
                  required
                />
              </div>
            </React.Fragment>
          ))}
          <div className="col-span-12 lg:col-span-3">
            <FormInput
              type="date"
              title="Date of Birth"
              inputValue={dob}
              setChange={setDob}
              inputPlaceholder="Date of Birth"
              required
              noPenIcon
            />
          </div>
          <div className="lg:col-span-3 col-span-12">
            <FormInput
              type="email"
              title="Email"
              inputValue={email}
              setChange={setEmail}
              inputPlaceholder="Email"
              required
            />
          </div>
          <div className="lg:col-span-3 col-span-12">
            <FormInput
              title="Country where based"
              inputValue={country}
              setChange={setCountry}
              inputPlaceholder="Country where based"
              required
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
            <span className="ml-2 font-Montserrat font-medium text-body-md text-dark-blue dark:text-white group-hover:text-white">
              Save for future purposes
            </span>
          </div>
          <button
            type="submit"
            className="py-3 px-8 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            {directCheckout ? 'Buy' : 'Save'}
          </button>
        </div>
      </form>
    </>
  );
};
export default CheckoutForm;
