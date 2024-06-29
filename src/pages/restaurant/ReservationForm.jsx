import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ky from 'ky';
import { api_url } from '../../App';
import { InputNumber, DatePicker, Space } from 'antd';


const ReservationForm = ({ restaurantId, userToken }) => {
  const { t } = useTranslation();
  const [number, setNumber] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await ky.post(`${api_url}restaurants/${restaurantId}/reservations`, {
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

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <form onSubmit={handleReservation} className="resa-form">
      <label>
        <div>
          {t("reservationNumber")}
        </div>
        <InputNumber min={1} max={10} defaultValue={1} onChange={handleNumberChange} className="input-number" />
      </label>
      <label>
        <div>
          {t("reservationDate")}
        </div>
        <Space direction="vertical">
          <DatePicker onChange={handleDateChange} className="input-number"/>
        </Space>
      </label>
      <label>
        <div>
          {t("reservationTime")}
        </div>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="input-time" />
      </label>

      <div className="btn-resa">
        <button type="submit"> {t("makeResa")} </button>
      </div>
    </form>
  );
};

export default ReservationForm;
