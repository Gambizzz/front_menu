import React, { useState } from 'react';
import ky from 'ky';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

const ForgotPasswordAdmin = () => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending email:', email);

      const response = await ky.post(`${api_url}admins/password`, {
        json: {
          admin: { email: email } 
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).json();

      toast.success(t('resetMail'));
      console.log(response);
    } catch (error) {
      if (error.response) {
        const errorData = await error.response.json();
        const errorMessage = Array.isArray(errorData.error) ? errorData.error.join(', ') : errorData.error;
        toast.error(`(t('errorMail')); ${errorMessage}`);
        console.error('There was an error sending the reset password email!', errorData);
      } else {
        toast.error(t('errorMail'));
        console.error('There was an error sending the reset password email!', error);
      }
    }
  };

  return (
    <div className='forgot-pass'>
      <h1 className="title-pages"> {t('forgotPass')} </h1>
      <form onSubmit={handleSubmit} className='forgot-form'>
        <label htmlFor="email"> {t('placeEmail')} </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className='btn-forgot'> {t('sendEmail')} </button>

      </form>

      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordAdmin;
