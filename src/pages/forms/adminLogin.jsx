import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ky from 'ky';

function AdminLog() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await ky.post('http://localhost:3000/admins/sign_in', {
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
      
      window.location.href = "/";
    } catch (error) {
      setError('Identifiants invalides ou erreur');
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleLogin} id='new_admin_session'>
        <h2>{t('connexionAdmin')}</h2>
        <div className='form-group'>
          <input type='email' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} required />
        </div>
        <div className='form-group'>
          <input type='password' className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('motDePasse')} required />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <button type='submit' className='btn btn-primary'>{t('seConnecter')}</button>
        <p><Link to="/forgot-password">{t('motDePasseOublie')}</Link></p>
      </form>
    </div>
  );
}

export default AdminLog;

