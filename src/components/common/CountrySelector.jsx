import React, { useState, useEffect } from 'react';
import ReactFlagsSelect from 'react-flags-select';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { setProfileDetails, resendVerificationEmail, verifyOTP } from '../../redux/actions/Auth';

const Register = ({ country, setCountry, notExist, setNotExist, setIsModalOpen, countries }) => {
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
          countries={countries}
          disabled={notExist}
          selected={country}
          onSelect={setCountry}
          id="flags-select"
          className="bg-white"
        />
        <button
          type="submit"
          disabled={!country}
          onClick={() => setIsModalOpen(false)}
          className="py-3 px-8 mt-8 disabled:opacity-60 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};
export default Register;
