import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ky from 'ky';

const AdminProfile = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="title-pages"> {t('titleSpaceAdmin')} </h1>
      <p>{t('email')} : {user.email} </p>
      <p>{t('id')} : {user.id}</p>

      <Link to="/create-restaurant"> Créer un restaurant </Link>
    </div>
  );
};

export default AdminProfile;


