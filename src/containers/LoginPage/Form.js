/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from './actions';

const schema = yup.object().shape({
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
});

function FormLogin({ dispatch, setOpenForm }) {
  const [passwordShow, setPassWordShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  function onLoginSubmit(data) {
    dispatch(login(data));
    reset();
  }

  function handleOpenRegister() {
    setOpenForm(true);
  }

  function handlePasswordShow() {
    setPassWordShow(false);
  }

  function handlePasswordInvisible() {
    setPassWordShow(true);
  }
  return (
    <>
      <div className="mx-auto max-w-2xl flex-col items-center justify-center pt-20 pb-10">
        <div className="relative my-10">
          <form onSubmit={handleSubmit(onLoginSubmit)}>
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

            <div className="text-right text-primary">
              <a className="cursor-pointer" onClick={handleOpenRegister}>
                Create an account ?
              </a>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-red-500/50 shadow-xl w-full rounded-lg w-40 border-blue-gray-200 border mt-10 h-16 overflow-hidden"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

FormLogin.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(FormLogin);
