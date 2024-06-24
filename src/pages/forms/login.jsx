import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ky from 'ky';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Log() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await ky.post('http://localhost:3000/users/sign_in', {
        json: {
          user: {
            email,
            password,
          }
        }
      }).json();

      const { user, token } = response;
      setUser({
        email: user.email,
        id: user.id,
        token: token,
        isLoggedIn: true,
        isAdmin: user.isAdmin
      });

      Cookies.set('adminToken', token); // Changement du nom du cookie à 'adminToken'
      Cookies.set('adminId', user.id); // Changement du nom du cookie à 'adminId'

      toast.success(t('log')); 

      setTimeout(() => {
        window.location.href = "/";
      }, 1000); 

    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('logError'));
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleLogin}>
        <h1 className="title-pages"> {t('seCo')} </h1>
        <div>
          <label htmlFor='email'> {t('Email')} </label>
          <input type='email' id='email' placeholder={t('placeEmail')} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='password'> {t('Password')} </label>
          <input type='password' id='password' placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <button type='submit'> {t('connexion')} </button>
        </div>
        <p>
          <Link to="/signup" className='links'> {t('signup')} </Link> | 
          <Link to="/forgot-password" className='links'> {t('forgotPassword')} </Link> | 
          <Link to="/" className='links'> {t('home')} </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Log;
