import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ky from 'ky';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

function AdminSign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useTranslation();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t('mismatchPass'));
      return;
    }

    try {
      await ky.post(`${api_url}admins`, {
        json: {
          admin: {
            email,
            password,
            password_confirmation: confirmPassword,
          }
        }
      }).json();

      toast.success(t('sign'));

      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 1000);

    } catch (error) {
      toast.error(t('signErr'));
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-form">
      <form className="form" onSubmit={handleSignup}>
        <p className="title"> {t('signupForm')} </p>
        <label>
          <input type="email" className="input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('placeEmail')} required />
        </label>
        <label>
          <input type="password" className="input" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('password')} required />
        </label>
        <label>
          <input type="password" className="input" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t('passConfirm')} required />
        </label>
        <button className="submit">{t('welcome')}</button>
        <p className="signin"> <a href="/admin/login" className="links">{t('seConnecter')}</a> | <a href="/" className="links">{t('home')}</a></p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AdminSign;






