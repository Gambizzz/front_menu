import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ky from 'ky';

function Sign() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await ky.post('http://localhost:3000/users', {
        json: {
          user: {
            email,
            password,
            password_confirmation
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

      setEmail('');
      setPassword('');
      setPasswordConfirmation('');

      window.location.href = "/";
    } catch (error) {
      setError('Erreur durant l\'inscription. Veuillez recommencer.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login-form' id='new_user'>
      <h1 className="title-pages"> {t('signupForm')} </h1>
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
        <label htmlFor='password_confirmation'> {t('PassConfirm')} </label>
        <input type='password' id='password_confirmation' placeholder={t('passConfirm')} value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
      </div>
      <div>
        <button type='submit'> {t('welcome')} </button>
      </div>
      <Link to="/login" className='links'> {t('seConnecter')} </Link> | <Link to="/" className='links'> {t('home')} </Link>
    </form>
  );
}

export default Sign;