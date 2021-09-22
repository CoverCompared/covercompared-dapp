import React, { useState, useContext } from 'react';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';

const CheckoutForm = (props) => {
  // remove default values from below object once response is in this format
  const {
    totalUsers = 4,
    userTypeOptions = ['Main Member', 'Spouse', 'Dependent'],
    noOfSpouse = 1,
    noOfDependent = 2,
    mainMemberParents = 0,
    spouseParents = 0,
  } = props;

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

  console.log('users :>> ', users);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={handleAddUser}
          disabled={totalUsers > 0 && users.length === totalUsers}
        >
          Add
        </button>{' '}
        <button type="button" onClick={handleRemoveUser} disabled={users.length === 1}>
          Remove
        </button>
      </div>

      <form onSubmit={() => {}}>
        {users.map((user, index) => (
          <div key={uniqueId()}>
            <select
              name="userType"
              value={user.userType}
              placeholder="User Type"
              disabled={!user.typeChangeable}
              onChange={(e) => handleUserFieldChange(e, index)}
            >
              <option value="">select type</option>
              {userTypeOptions.map((m) => (
                <option key={uniqueId()} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              placeholder="First Name"
              onChange={(e) => handleUserFieldChange(e, index)}
            />
            <input
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
              placeholder="Aadhar and passports"
              onChange={(e) => handleUserFieldChange(e, index)}
            />
          </div>
        ))}
      </form>
    </>
  );
};
export default CheckoutForm;
