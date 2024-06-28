import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import ky from 'ky';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

const EditAdmin = () => {
  const [user, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { t } = useTranslation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedAdmin = await ky.put(`${api_url}admins/${user.id}`, {
        json: {
          admin: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).json();

      setUser((prevUser) => ({
        ...prevUser,
        email: updatedAdmin.email,
      }));

      toast.success(t('profileUpdateSuccess'));

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(t('profileUpdateError'));
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('confirmDeleteAccount'))) {
      try {
        await ky.delete(`${api_url}admins/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setUser(null);

        // Clear cookies or local storage to ensure logout
        document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "adminId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        toast.success(t('accountDeleted'));

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error(t('deleteAccountError'));
      }
    }
  };

  return (
    <div>
      <h1 className="title-pages"> {t('editProfileForm')} </h1>
      <form onSubmit={handleUpdate} className='edit-profile-form'>
        <div>
          <label> {t('placeEmail')} </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label> {t('password')} </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label> {t('PassConfirm')} </label>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </div>
      </form>

      <div className='btn-edit'>
        <button type="submit"> {t('editR')} </button> | 
        <button onClick={handleDeleteAccount} className='btn-del'> {t('delP')} </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditAdmin;
