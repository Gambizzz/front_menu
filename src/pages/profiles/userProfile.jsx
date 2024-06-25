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
  const [restaurants, setRestaurants] = useState({});

  useEffect(() => {
    const fetchUserReservations = async () => {
      if (!user.id) {
        console.error('Erreur: user.id est vide ou non défini.');
        return;
      }

      try {

        const reservationsResponse = await ky.get(`http://localhost:3000/users/${user.id}/reservations`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }).json();


        setReservations(reservationsResponse);


        const restaurantIds = reservationsResponse.map(reservation => reservation.restaurant_id).join(',');
        const restaurantsResponse = await ky.get(`http://localhost:3000/restaurants`, {
          searchParams: {
            ids: restaurantIds,
          },
        }).json();

        const restaurants = {};
        restaurantsResponse.forEach(restaurant => {
          restaurants[restaurant.id] = restaurant.name;
        });

        setRestaurants(restaurants);
      } catch (error) {
        console.error('Erreur lors du fetch des réservations:', error);
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
            {t('reservationNumber')}: {reservation.number}, {t('reservationDate')}: {reservation.date}, {t('reservationTime')}: {reservation.time},
            {restaurants[reservation.restaurant_id] && (
              <span>{t('restaurantName')}: {restaurants[reservation.restaurant_id]}</span>
            )}
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
