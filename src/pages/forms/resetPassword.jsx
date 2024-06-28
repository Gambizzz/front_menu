import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ky from 'ky';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function checkTokenValidity() {
      try {
        await ky.get(`${api_url}password/reset/${token}`);
        setTokenValid(true);
      } catch (error) {
        setTokenValid(false);
        toast.error('passLink');
      }
    }
    checkTokenValidity();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ky.post(`${api_url}users/password`, {
        json: { 
          user: { 
            email: '', 
            password: password,
            password_confirmation: passwordConfirmation
          },
          reset_password_token: token
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).json();
      toast.success(t('passOK'));
      console.log(response);
    } catch (error) {
      if (error.response) {
        const errorData = await error.response.json();
        const errorMessage = Array.isArray(errorData.error) ? errorData.error.join(', ') : errorData.error;
        toast.error(`(t('errorReset')); ${errorMessage}`);
        console.error('There was an error resetting the password!', errorData);
      } else {
        toast.error(t('errorReset'));
        console.error('There was an error resetting the password!', error);
      }
    }
  };

  if (!tokenValid) {
    return (
      <div>
        <h2> (t('invalidToken')) </h2>
        <p>
          <Link to="/signup"> {t('sinscrire')} </Link> | <Link to="/login"> {t('seConnecter')} </Link> | <Link to="/"> {t('home')} </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="title-pages"> {t('resetPassword')} </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password"> {t('newPassword')} </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirmation"> {t('confirmNewPass')} </label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn-reset'> {t('reset')} </button>
      </form>
      <p>
        <Link to="/signup" className='links'> {t('signup')} </Link> | <Link to="/login" className='links'> {t('seConnecter')} </Link> | <Link to="/" className='links'> {t('home')} </Link>
      </p>

      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
