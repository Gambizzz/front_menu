import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ky from 'ky';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

function Sign() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await ky.post(`${api_url}users`, {
        json: {
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation
          }
        }
      }).json();

      const { user, token } = response;
      setUser({
        email: user.email,
        id: user.id,
        token: token,
        isLoggedIn: true,
      });
      Cookies.set('token', token);
      Cookies.set('id', user.id);

      toast.success(t('sign'));

      setEmail('');
      setPassword('');
      setPasswordConfirmation('');

      setTimeout(() => {
        window.location.href = "/";
      }, 1000); 

    } catch (error) {
      console.error('Signup error:', error);
      toast.error(t('signErr'));
    }
  };

  return (
    <div class="signup-form">
      <form class="form" onSubmit={handleSubmit}>
        <p class="title">{t('signupForm')}</p>
        <label>
          <input type="email" class="input" id="email" placeholder={t('placeEmail')} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          <input type="password" class="input" id="password" placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          <input type="password" class="input" id="passwordConfirmation" placeholder={t('passConfirm')} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
        </label>
        <button class="submit">{t('welcome')}</button>
        <p class="signin"> <a href="/login" class="links">{t('seConnecter')}</a> | <a href="/" class="links">{t('home')}</a></p>
      </form>

      <ToastContainer />
      </div>
  );
}

export default Sign;
