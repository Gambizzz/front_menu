import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ky from 'ky';

const ReservationForm = ({ restaurantId, userToken }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await ky.post(`http://localhost:3000/restaurants/${restaurantId}/reservations`, {
        json: { reservation: { date, time } },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Réservation créée avec succès!');
        // Réinitialiser le formulaire ou effectuer d'autres actions après la réservation
      } else {
        throw new Error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la réservation : ', error);
      alert('Erreur lors de la création de la réservation');
    }
  };

  return (
    <form onSubmit={handleReservation}>
      <label>
        {t("reservationDate")}:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        {t("reservationTime")}:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <button type="submit">{t("makeReservation")}</button>
    </form>
  );
};

export default ReservationForm;
