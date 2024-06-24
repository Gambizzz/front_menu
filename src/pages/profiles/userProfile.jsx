import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ky from 'ky';

const UserProfile = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchUserReservations = async () => {

      if (!user.id) {
        console.error('Erreur: user.id est vide ou non défini.');
        return;
      }
      
      try {
        const response = await ky.get(`http://localhost:3000/users/${user.id}/reservations`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          throw new Error('erreur du fetch reservations');
        }
      } catch (error) {
        console.error('erreur fetch reservations:', error);
      }
    };

    fetchUserReservations();
  }, [user.id, user.token]);

  return (
    <div>
      <h1 className="title-pages">{t('titleSpaceUser')}</h1>
      <p>{t('email')}: {user.email}</p>
      <p>{t('id')}: {user.id}</p>

      <h2>{t('reservations')}</h2>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            {t('reservationNumber')}: {reservation.number}, {t('reservationDate')}: {reservation.date}, {t('reservationTime')}: {reservation.time}
          </li>
        ))}
      </ul>

      <Link to="/edit">
        <button>{t('editProfileButton')}</button>
      </Link>
    </div>
  );
};

export default UserProfile;
