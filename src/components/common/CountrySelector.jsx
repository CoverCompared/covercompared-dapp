import React, { useState, useEffect } from 'react';
import ReactFlagsSelect from 'react-flags-select';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { setProfileDetails, resendVerificationEmail, verifyOTP } from '../../redux/actions/Auth';

const Register = ({ country, setCountry, notExist, setNotExist }) => {
  // const dispatch = useDispatch();
  // const authState = useSelector((state) => state.auth);
  // const { showOTPScreen, showVerified, loader, isFailed } = authState;

  console.log('country :>> ', country);

  return (
    <div className="grid grid-cols-12">
      <div className="grid col-span-8 col-start-3">
        <ReactFlagsSelect
          ariea
          fullWidth
          searchable
          disabled={notExist}
          selected={country}
          onSelect={setCountry}
          id="flags-select"
          className="bg-white"
        />
      </div>
    </div>
  );
};
export default Register;
