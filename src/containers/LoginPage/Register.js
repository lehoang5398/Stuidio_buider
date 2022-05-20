/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as yup from 'yup';
import { signup } from './actions';

const schema = yup.object().shape({
  name: yup.string().required('First Name should be required please !'),
  email: yup.string().email().required('Please enter your email !'),
  password: yup
    .string()
    .min(8)
    .max(15)
    .required('Please enter your password !')
    .matches(
      '(?=.*[0-9])(?=.*?[A-Z])',
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case CharacterPassword should include at least one uppercase, one numeric value !',
    ),
  confirmPwd: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function RegisterPage({ setOpenForm, dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [passwordShow, setPassWordShow] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);

  function onLoginSubmit(data) {
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(signup(newData));
    reset();
    setOpenForm(false);
  }

  function handleCancel() {
    setOpenForm(false);
  }

  function handlePasswordShow() {
    setPassWordShow(false);
  }

  function handlePasswordInvisible() {
    setPassWordShow(true);
  }

  function handleConfirmShow() {
    setConfirmPass(false);
  }

  function handleConfirmPasswordInvisible() {
    setConfirmPass(true);
  }
  return (
    <div className="overlay fixed top-0 bottom-0 right-0 left-0 bg-opacity-40 bg-black">
      <div className="mx-auto max-w-2xl flex-col items-center justify-center pt-10 pb-10">
        <div className="relative my-10 z-10 bg-white rounded-md py-10 px-10 transition-transform">
          <div className="absolute right-10 top-5">
            <TiDeleteOutline
              className="text-3xl cursor-pointer"
              onClick={() => handleCancel()}
            />
          </div>
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <div className="pl-3 pb-5">
              <label>* Name:</label>
            </div>
            <div className="shadow-xl w-full rounded-lg h-16 border border-blue-gray-200 relative overflow-hidden">
              <input
                className="bg-white outline-none border-none w-full h-full pl-5"
                type="text"
                name="name"
                placeholder="Enter name..."
                {...register('name')}
              />
            </div>

            <span className="text-red-500/100 ml-3">
              {errors.name && errors.name.message}
            </span>

            <div className="pl-3 pb-5">
              <label>* Email:</label>
            </div>
            <div className="shadow-xl w-full rounded-lg h-16 border border-blue-gray-200 relative overflow-hidden">
              <input
                className="bg-white outline-none border-none w-full h-full pl-5"
                type="email"
                name="email"
                placeholder="Enter email..."
                {...register('email')}
              />
            </div>

            <span className="text-red-500/100 ml-3">
              {errors.email && errors.email.message}
            </span>

            <div className="pt-5 pl-3 pb-5">
              <label>* Password:</label>
            </div>
            <div className="shadow-xl w-full rounded-lg h-16 border border-blue-gray-200 relative overflow-hidden">
              {!passwordShow ? (
                <div
                  onClick={handlePasswordInvisible}
                  className="absolute cursor-pointer right-0 h-full w-16 bg-blue-gray-200 flex items-center justify-center"
                >
                  <AiFillEyeInvisible className="text-gray-500 w-8 h-8" />
                </div>
              ) : (
                <div
                  onClick={handlePasswordShow}
                  className="absolute cursor-pointer right-0 h-full w-16 bg-blue-gray-200 flex items-center justify-center"
                >
                  <AiFillEye className="text-gray-500 w-8 h-8" />
                </div>
              )}
              <input
                name="password"
                type={passwordShow ? 'text' : 'password'}
                placeholder="Enter password..."
                className="bg-white outline-none border-none w-full h-full pl-5"
                {...register('password')}
              />
            </div>

            <span className="text-red-500/100 ml-3">
              {errors.password && errors.password.message}
            </span>

            <div className="pt-5 pl-3 pb-5">
              <label>* Confirm password:</label>
            </div>

            <div className="shadow-xl w-full rounded-lg h-16 border border-blue-gray-200 relative overflow-hidden">
              {!confirmPass ? (
                <div
                  onClick={handleConfirmPasswordInvisible}
                  className="absolute cursor-pointer right-0 h-full w-16 bg-blue-gray-200 flex items-center justify-center"
                >
                  <AiFillEyeInvisible className="text-gray-500 w-8 h-8" />
                </div>
              ) : (
                <div
                  onClick={handleConfirmShow}
                  className="absolute cursor-pointer right-0 h-full w-16 bg-blue-gray-200 flex items-center justify-center"
                >
                  <AiFillEye className="text-gray-500 w-8 h-8" />
                </div>
              )}
              <input
                name="confirmPwd"
                type={confirmPass ? 'text' : 'password'}
                placeholder="Enter password..."
                className="bg-white outline-none border-none w-full h-full pl-5"
                {...register('confirmPwd')}
              />
            </div>
            <span className="text-red-500/100 ml-3">
              {errors.confirmPwd && errors.confirmPwd.message}
            </span>
            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-red-500/50 shadow-xl w-full rounded-lg w-40 border-blue-gray-200 border mt-10 h-16 overflow-hidden"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(RegisterPage);
