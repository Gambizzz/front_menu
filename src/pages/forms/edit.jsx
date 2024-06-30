import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import ky from "ky";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api_url } from '../../App';

const Edit = () => {
  const [user, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { t } = useTranslation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await ky.put(`${api_url}users/${user.id}`, {
        json: {
          user: {
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
        email: updatedUser.email,
      }));

      toast.success(t('profileUpdateSuccess'));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(t('profileUpdateError'));
    }

    setTimeout(() => {
      window.location.href = "/";
    }, 1000); 
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('confirmDeleteAccount'))) {
      try {
        await ky.delete(`${api_url}users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        localStorage.removeItem('user');

        // // Identifiez et supprimez les données spécifiques de l'utilisateur dans le localStorage
        // Object.keys(localStorage).forEach(key => {
        //   if (key.startsWith('user_')) {
        //     localStorage.removeItem(key);
        //   }
        // });

        // Clear cookies or local storage to ensure logout
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setUser(null);

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
    <div className='edit-profile-container'>
      <div className='edit-profile-form'>
        <form onSubmit={handleUpdate}>
          <h1 className="title-pages tit-pag"> {t('editProfileForm')} </h1>
          <div className='form-group'>
            <label htmlFor='email'> {t('placeEmail')} </label>
            <input type="email" className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label htmlFor='password'> {t('password')} </label>
            <input type="password" className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label htmlFor='passwordConfirmation'> {t('PassConfirm')} </label>
            <input type="password" className='form-control' id='passwordConfirmation' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
          </div>
          <div className='submit btn-sub'>
            <button type='submit'> {t('editR')} </button>
          </div>
        </form>

        <div className='btn-edit'>
          <button onClick={handleDeleteAccount} className='btn-del'> {t('delP')} </button>
        </div>

        <ToastContainer />
      </div>
    </div>

  );
};

export default Edit;
