import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import ky from "ky";
import { useTranslation } from "react-i18next";

const Edit = () => {
  const [user, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { t } = useTranslation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await ky.put(`http://localhost:3000/users/${user.id}`, {
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

      alert(t('profileUpdateSuccess'));
    } catch (error) {
      alert(t('profileUpdateError'));
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('confirmDeleteAccount'))) {
      try {
        await ky.delete(`http://localhost:3000/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setUser(null);

        // Effacer les cookies ou stockage local pour assurer la déconnexion
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.href = '/';

        alert(t('compte supprimer'));
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
          <label>{t('password')}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>{t('passwordConfirmation')}</label>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </div>
        <button type="submit">{t('updateProfileButton')}</button>
      </form>

      {/* Bouton pour supprimer le compte */}
      <button onClick={handleDeleteAccount}>{t('deleteAccountButton')}</button>
    </div>
  );
};

export default Edit;
