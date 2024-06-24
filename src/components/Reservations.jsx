import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ky from 'ky';

const Reservations = () => {
  const { t } = useTranslation();
  const { restaurantId } = useParams();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await ky.get(`http://localhost:3000/restaurants/${restaurantId}/reservations`);
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations : ', error);
        // Gérer l'erreur ici, par exemple :
        // setReservations([]); // Réinitialiser les réservations à une liste vide
      }
    };

    fetchReservations();
  }, [restaurantId]);

  return (
    <div>
      <h1>{t('reservationsTitle')}</h1>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            <p>{t('reservationNumber')}: {reservation.number}</p>
            <p>{t('reservationDate')}: {reservation.date}</p>
            <p>{t('reservationTime')}: {reservation.time}</p>
            <button>{t('cancelReservation')}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
