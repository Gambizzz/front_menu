import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ky from 'ky';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

function AdminLog() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await ky.post(`${api_url}admins/sign_in`, {
        json: {
          admin: {
            email,
            password,
          }
        }
      }).json();

      const { admin, token } = response;
      setUser({
        email: admin.email,
        id: admin.id,
        token: token,
        isLoggedIn: true,
        isAdmin: true,
      });

      Cookies.set('adminToken', token);
      Cookies.set('adminId', admin.id);
      Cookies.set('adminEmail', admin.email);

      toast.success(t('log')); 

      setTimeout(() => {
        window.location.href = "/";
      }, 1000); 

    } catch (error) {
      toast.error(t('logError'));
    }
  };

  return (
    <div className='login-form-container'>
      <div className='login-form'>
        <form onSubmit={handleLogin}>
          <h1 className="title-pages tit-pag"> {t('seCo')} </h1>
          <div className='form-group'>
            <label htmlFor='email'> {t('Email')} </label>
            <input type='email' className='form-control' id='email' placeholder={t('placeEmail')} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label htmlFor='password'> {t('Password')} </label>
            <input type='password' className='form-control' id='password' placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='submit btn-sub'>
            <button type='submit'> {t('connexion')} </button>
          </div>
          <p className='log-links'>
            <Link to="/signup" className='links'> {t('signup')} </Link> |
            <Link to="/forgot-password-admin" className='links'> {t('forgotPassword')} </Link> |
            <Link to="/" className='links'> {t('home')} </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AdminLog;


