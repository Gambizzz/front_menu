import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ky from 'ky';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await ky.post(`${api_url}users`, {
        json: {
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation
          }
        }
      }).json();

      toast.success(t('sign'));

      setEmail('');
      setPassword('');
      setPasswordConfirmation('');

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

    } catch (error) {
      console.error('Signup error:', error);
      toast.error(t('signErr'));
    }
  };

  return (
    <div className="signup-form">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">{t('signupForm')}</p>
        <label>
          <input type="email" className="input" id="email" placeholder={t('placeEmail')} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          <input type="password" className="input" id="password" placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          <input type="password" className="input" id="passwordConfirmation" placeholder={t('passConfirm')} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
        </label>
        <button className="submit">{t('welcome')}</button>
        <p className="signin"> <a href="/login" className="links">{t('seConnecter')}</a> | <a href="/" className="links">{t('home')}</a></p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Sign;
