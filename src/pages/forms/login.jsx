import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ky from 'ky';

function Log() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

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
      });

      Cookies.set('token', token);
      Cookies.set('id', user.id);
      
      window.location.href = "/";
    } catch (error) {
      setError('Identifiants invalides ou erreur');
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleLogin} id='new_user_session'>
        <h1 className="title-pages"> {t('seCo')} </h1>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor='email'> Email </label>
          <input type='email' id='email' placeholder={t('placeEmail')} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='password'> {t('Password')} </label>
          <input type='password' id='password' placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <button type='submit'> {t('connexion')} </button>
        </div>
        <Link to="/signup" className='links'> {t('sinscrire')} </Link> | <Link to="/forgot-password" className='links'> {t('forgotPassword')} </Link> | <Link to="/" className='links'> {t('home')} </Link>
      </form>
    </div>
  );
}

export default Log;

