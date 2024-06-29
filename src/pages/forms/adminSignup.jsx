import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import Cookies from 'js-cookie';
import ky from 'ky';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

function AdminSign() {
  const [, setUser] = useAtom(userAtom);
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
      const response = await ky.post(`${api_url}admins`, {
        json: {
          admin: {
            email,
            password,
            password_confirmation: confirmPassword,
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

      setEmail('');
      setPassword('');
      setConfirmPassword('');

      toast.success(t('sign'));

      setTimeout(() => {
        window.location.href = "/";
      }, 1000); 

    } catch (error) {
      toast.error(t('signErr'));
      console.error('Error during signup:', error);
    }
  };

  return (
    <div class="signup-form">
      <form class="form" onSubmit={handleSignup}>
        <p class="title"> {t('signupForm')} </p>
        <label>
          <input type="email" class="input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('placeEmail')} required />
        </label>
        <label>
          <input type="password" class="input" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('password')} required />
        </label>
        <label>
          <input type="password" class="input" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t('passConfirm')} required />
        </label>
        <button class="submit">{t('welcome')}</button>
        <p class="signin"> <a href="/admin/login" class="links">{t('seConnecter')}</a> | <a href="/" class="links">{t('home')}</a></p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AdminSign;





