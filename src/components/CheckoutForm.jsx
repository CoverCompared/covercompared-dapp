import React, { useState, useContext } from 'react';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';
import FormInput from './FormInput';
import EditIcon from '../assets/img/Edit.svg';

const CheckoutForm = (props) => {
  // remove default values from below object once response is in this format
  const {
    unique_id,
    userTypeOptions,
    noOfSpouse,
    noOfDependent,
    mainMemberParents,
    spouseParents,
    totalUsers,
  } = props;

  console.log(props);
  const userObject = {
    userType: '',
    firstName: '',
    lastName: '',
    identity: '',
    typeChangeable: true,
  };
  const [users, setUsers] = useState([
    { ...userObject, userType: 'Main Member', typeChangeable: false },
  ]);

  const handleAddUser = () => {
    console.log('object1');
    setUsers([...users, { ...userObject }]);
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
  const handleUserFieldChange = (e, i) => {
    const usersClone = [...users];
    usersClone[i][e.target.name] = e.target.value;
    if (validateUsers(usersClone)) setUsers(usersClone);
  };

  const submit = () => console.log('asd');

  // console.log('users :>> ', users);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleAddUser}
          className="font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
          disabled={totalUsers > 0 && users.length === totalUsers}
        >
          + Add
        </button>{' '}
        <button
          type="button"
          className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
          onClick={handleRemoveUser}
          disabled={users.length === 1}
        >
          - Remove
        </button>
      </div>

      <form onSubmit={() => {}}>
        {users.map((user, index) => (
          <div key={uniqueId()}>
            <div className="grid grid-cols-12 gap-4 gap-y-6 w-full">
              <div className="col-span-3">
                <div className="py-2 pl-3 pr-10 w-full bg-promo-input-bg rounded-lg shadow-lg relative border border-light-gray-border">
                  <div className="font-semibold text-body-xs text-dark-blue font-Montserrat">
                    User Type
                  </div>
                  <select
                    className="h-3 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 pl-0 text-black font-Montserrat font-medium text-body-xs"
                    name="userType"
                    value={user.userType}
                    placeholder="User Type"
                    onChange={(e) => handleUserFieldChange(e, index)}
                    disabled={!user.typeChangeable}
                  >
                    <option value="">select type</option>
                    {userTypeOptions.map((m) => (
                      <option key={uniqueId()} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-3">
                <div className="py-2 pl-3 pr-10 w-full bg-promo-input-bg rounded-lg shadow-lg relative border border-light-gray-border">
                  <div className="font-semibold text-body-xs text-dark-blue font-Montserrat">
                    First Name
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    placeholder="First Name"
                    onChange={(e) => handleUserFieldChange(e, index)}
                    className="h-3 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 pl-0 text-black font-Montserrat font-medium text-body-xs"
                  />
                  <img src={EditIcon} alt="Edit" className="absolute right-4 top-4" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="py-2 pl-3 pr-10 w-full bg-promo-input-bg rounded-lg shadow-lg relative border border-light-gray-border">
                  <div className="font-semibold text-body-xs text-dark-blue font-Montserrat">
                    Last Name
                  </div>
                  <input
                    type="text"
                    name="lasttName"
                    value={user.lasttName}
                    placeholder="Last Name"
                    onChange={(e) => handleUserFieldChange(e, index)}
                    className="h-3 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 pl-0 text-black font-Montserrat font-medium text-body-xs"
                  />
                  <img src={EditIcon} alt="Edit" className="absolute right-4 top-4" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="py-2 pl-3 pr-10 w-full bg-promo-input-bg rounded-lg shadow-lg relative border border-light-gray-border">
                  <div className="font-semibold text-body-xs text-dark-blue font-Montserrat">
                    Identity
                  </div>
                  <input
                    type="text"
                    name="identity"
                    value={user.identity}
                    placeholder="Aadhar or passport"
                    onChange={(e) => handleUserFieldChange(e, index)}
                    className="h-3 w-full border-0 outline-none bg-transparent placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 pl-0 text-black font-Montserrat font-medium text-body-xs"
                  />
                  <img src={EditIcon} alt="Edit" className="absolute right-4 top-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="py-3 px-8 mt-8 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            Submit
          </button>
        </div>
      </form>
      {/* <input
            type="text"
            name="lastName"
            value={user.lastName}
            placeholder="Last Name"
            onChange={(e) => handleUserFieldChange(e, index)}
          />
          <input
            type="text"
            name="identity"
            value={user.identity}
            placeholder="Aadhar or passports"
            onChange={(e) => handleUserFieldChange(e, index)}
          /> */}
    </>
  );
};
export default CheckoutForm;
