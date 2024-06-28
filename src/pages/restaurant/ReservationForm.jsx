import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ky from 'ky';
import '../../index.scss';

const ReservationForm = ({ restaurantId, userToken }) => {
  const { t } = useTranslation();
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await ky.post(`http://localhost:3000/restaurants/${restaurantId}/reservations`, {
        json: {
          reservation: {
            number,
            date,
            time
          }
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Réservation créée avec succès!');
      } else {
        throw new Error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la réservation : ', error);
      alert('Erreur lors de la création de la réservation');
    }
  };

  return (
    <form onSubmit={handleReservation} className="resa-form">
      <label>
        {t("reservationNumber")} :
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="people" required />
      </label>
      <label>
        {t("reservationDate")} :
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        {t("reservationTime")} :
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>

      <div className="btn-resa">
        <button type="submit">{t("makeResa")}</button>
      </div>
    </form>
  );
};

export default ReservationForm;

