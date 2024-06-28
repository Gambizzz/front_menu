import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ky from 'ky';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeartBroken } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { api_url } from '../../App';

const UserProfile = () => {
  const [user] = useAtom(userAtom);
  const { t, i18n } = useTranslation();
  const [reservations, setReservations] = useState([]);
  const [restaurants, setRestaurants] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserReservations = async () => {
      if (!user.id) {
        console.error('Erreur: user.id est vide ou non défini.');
        return;
      }

      try {
        const reservationsResponse = await ky.get(`${api_url}users/${user.id}/reservations`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }).json();

        setReservations(reservationsResponse);

        const restaurantIds = reservationsResponse.map(reservation => reservation.restaurant_id).join(',');
        const restaurantsResponse = await ky.get(`${api_url}restaurants`, {
          searchParams: {
            ids: restaurantIds,
          },
        }).json();

        const restaurantsMap = {};
        restaurantsResponse.forEach(restaurant => {
          restaurantsMap[restaurant.id] = restaurant.name;
        });

        setRestaurants(restaurantsMap);
      } catch (error) {
        console.error('Erreur lors du fetch des réservations:', error);
      }
    };

    fetchUserReservations();
  }, [user.id, user.token]);

  const handleDelete = async (reservationId) => {
    try {
      const response = await ky.delete(`${api_url}restaurants/${user.id}/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        setReservations(reservations.filter(reservation => reservation.id !== reservationId));
        alert('Réservation supprimée avec succès!');
      } else {
        throw new Error('Failed to delete reservation');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation : ', error);
      alert('Erreur lors de la suppression de la réservation');
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await ky.get(`${api_url}favorites`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris : ', error);
        toast.error(t('errorFetchFav'));
      }
    };

    fetchFavorites();
  }, [user.token, t]);

  const removeFavorite = async (favoriteId) => {
    try {
      await ky.delete(`${api_url}favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      toast.success(t('favoriteRemoved'));
    } catch (error) {
      console.error('Erreur lors de la suppression du favori : ', error);
      toast.error(t('errorRemovingFav'));
    }
  };

  const formatDate = (date) => {
    const locale = i18n.language === 'fr' ? fr : enUS;
    return `${format(new Date(date), 'PPPP', { locale })}`;
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const locale = i18n.language === 'fr' ? fr : enUS;
    return format(date, 'HH:mm', { locale });
  };

  return (
    <div>
      <h1 className="title-pages"> {t('titleSpaceUser')} </h1>
      <p>{t('email')}: {user.email}</p>
      <p>{t('id')}: {user.id}</p>

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
