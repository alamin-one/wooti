'use client';

import { useRef, useState } from 'react';

const useVerifyInput = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputref = useRef([]);
  // set opt and foucs next
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    } else {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);
      if (value && index < otp.length - 1) {
        inputref.current[index + 1]?.focus();
      }
    }
  };

  // click backspace  => remove curent and foucs current - 1
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputref.current[index - 1].focus();
    }
  };

  return { otp, setOtp, inputref, handleChange, handleKeyDown };
};

export default useVerifyInput;
