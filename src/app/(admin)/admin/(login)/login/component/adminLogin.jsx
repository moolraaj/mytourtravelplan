'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '@/app/assets/home_images/logo.png';
import { toast } from 'react-toastify';

function AdminLoginPage() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    let valid = true;
    let errorFields = {};
    if (!data.email) {
      valid = false;
      errorFields.email = 'Email is required';
    }
    if (!data.password) {
      valid = false;
      errorFields.password = 'Password is required';
    }
    setErrors(errorFields);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateInputs()) {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (result.error) {
          toast.error(result.error);
        } else if (result.ok) {
          window.location.href = '/admin/dashboard';
        }
      } catch (err) {
        console.log('Error:', err);
        toast.error('An error occurred during login.');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin_login_logo">
        <img src={logo.src} alt="admin_login_logo" />
      </div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="example@gmail.com"
          />
          {errors.email && <span className='admin_login_error'>{errors.email}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password*</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Password"
            />
            <span onClick={togglePasswordVisibility} className="password-toggle">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span className='admin_login_error'>{errors.password}</span>}
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </>
  );
}

export default AdminLoginPage;
