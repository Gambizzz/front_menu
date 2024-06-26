import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ky from 'ky';


  return (
    <div>
      <h1 className="title-pages"> {t('titleSpaceUser')} </h1>
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
        <button className='btn-edit-user'> {t('editProfileButton')} </button>
      </Link>

      <div className='res-us'>
        <h2> {t('resaUser')} </h2>
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.id}>
              <div className='user-resa'>
                <p> {t('resaText')} {reservation.number} {t('pers')}, {t('on')} {formatDate(reservation.date)} {t('at')} {formatTime(reservation.time)} {t('at')}
                {restaurants[reservation.restaurant_id] && (
                  <span> {restaurants[reservation.restaurant_id]} </span>
                )}
                <button onClick={() => handleDelete(reservation.id)} className="btn-comm"> <IoTrashSharp /> </button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className='favs'>
      <h2>{t('myFav')}</h2>
        {favorites.map(favorite => (
          <div key={favorite.id} className='restau-fav'>
            {favorite.restaurant.name}
            <button onClick={() => removeFavorite(favorite.id)} className="btn-fav">
              <FaHeartBroken />
            </button>
          </div>
        ))}
      </div>

      <ToastContainer/>
    </div>
  );
};

export default UserProfile;
