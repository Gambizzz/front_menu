import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import ky from 'ky';

const EditAdmin = () => {
  const [user, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { t } = useTranslation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await ky.put(`http://localhost:3000/admins/${user.id}`, {
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
        email: updatedUser.email,
      }));

      alert(t('profileMODIFIER!!!!!!'));
    } catch (error) {
      alert(t('profileUpdateError'));
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('voulez vous supprimez le compte ?'))) {
      try {
        await ky.delete(`http://localhost:3000/admins/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setUser(null);

        // Effacer les cookies ou stockage local pour assurer la déconnexion
        document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "adminId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


        window.location.href = '/';

        alert(t('compte supprimé'));
      } catch (error) {
        console.error(error);
        alert(t('deleteAccountError'));
      }
    }
  };

  return (
    <div>
      <h1>{t('editProfileForm')}</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>{t('email')}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>{t('mot de passe')}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>{t('Confirmation du mot de passe')}</label>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </div>
        <button type="submit">{t('édité le profil')}</button>
      </form>

      <button onClick={handleDeleteAccount}>{t('supprimé le profil')}</button>
    </div>
  );
};

export default EditAdmin;