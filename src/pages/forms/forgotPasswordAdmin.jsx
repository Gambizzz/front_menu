import React, { useState } from 'react';
import ky from 'ky';
import { useTranslation } from 'react-i18next';

const ForgotPasswordAdmin = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending email:', email);

      // Sending email in the correct structure
      const response = await ky.post('http://localhost:3000/admins/password', {
        json: {
          admin: { email: email } 
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).json();

      setMessage('Un email de réinitialisation du mot de passe a été envoyé.');
      console.log(response);
    } catch (error) {
      if (error.response) {
        const errorData = await error.response.json();
        const errorMessage = Array.isArray(errorData.error) ? errorData.error.join(', ') : errorData.error;
        setMessage(`Erreur lors de l'envoi de l'email de réinitialisation: ${errorMessage}`);
        console.error('There was an error sending the reset password email!', errorData);
      } else {
        setMessage('Erreur lors de l\'envoi de l\'email de réinitialisation.');
        console.error('There was an error sending the reset password email!', error);
      }
    }
  };

  return (
    <div className='forgot-pass'>
      <h1 className="title-pages"> {t('forgotPass')} </h1>
      <form onSubmit={handleSubmit} className='forgot-form'>
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className='btn-forgot'> {t('sendEmail')} </button>

      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPasswordAdmin;