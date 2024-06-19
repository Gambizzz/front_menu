import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import Cookies from 'js-cookie';
import ky from 'ky';

function AdminSign() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await ky.post('http://localhost:3000/admins', {
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

      window.location.href = "/";
    } catch (error) {
      setError('Erreur lors de l\'inscription');
    }
  };

  return (
    <div className='signup-form'>
      <form onSubmit={handleSignup} id='new_admin'>
        <h2>{t('sinscrireAdmin')}</h2>
        <div className='form-group'>
          <input type='email' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} required />
        </div>
        <div className='form-group'>
          <input type='password' className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('motDePasse')} required />
        </div>
        <div className='form-group'>
          <input type='password' className='form-control' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t('confirmezMotDePasse')} required />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <button type='submit' className='btn btn-primary'>{t('sinscrire')}</button>
      </form>
    </div>
  );
}

export default AdminSign;


