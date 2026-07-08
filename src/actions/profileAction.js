'use server';

import authOptions from '@/libs/authOptions';
import connectdb from '@/libs/connectdb';
import uploadImage from '@/libs/uploadImage';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

// profile chenge
export const submitPrifile = async (preData, formData) => {
  const { token } = await getServerSession(authOptions);
  const id = token?.user?._id;

  const name = formData.get('name');
  const newEmail = formData.get('email');
  const file = formData.get('file');

  try {
    await connectdb();
    const curerntUser = await User.findOne({ _id: id });
    let imgUrl;
    if (file && file?.size > 0) {
      const res = await uploadImage(file);
      imgUrl = res.url;
    } else {
      imgUrl = curerntUser.image;
    }

    await User.findOneAndUpdate(
      { _id: id },
      { image: imgUrl, name: name, email: newEmail },
    );

    return {
      success: true,
      message: 'Profile successfully updated',
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'something went wrong! Please try again',
    };
  }
};

// chenge Password With Current Password
export const chengePasswordWithCurrentPassword = async (preData, formData) => {
  const { token } = await getServerSession(authOptions);
  const id = token?.user?._id;

  const currentPassword = formData.get('currentPassword');
  const password = formData.get('newPassword');
  const confirmpassword = formData.get('confirmPassword');

  try {
    // password check
    if (password !== confirmpassword) {
      return {
        success: false,
        message: "Password  and confirmpassword don't metch",
      };
    }
    await connectdb();
    const currentUser = await User.findOne({ _id: id });
    if (!currentUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const isMetch = await bcrypt.compare(currentPassword, currentUser.password);

    if (!isMetch) {
      return {
        success: false,
        message: "CurrentPassword Password don't metch",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ _id: id }, { password: hashedPassword });

    return {
      success: true,
      message: 'Password  successfully updated',
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'something went wrong! Please try again',
    };
  }
};
