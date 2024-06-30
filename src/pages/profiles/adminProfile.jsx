import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ky from 'ky';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoTrashSharp } from "react-icons/io5";
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { api_url } from '../../App';

const AdminProfile = () => {
  const [user] = useAtom(userAtom);
  const { t, i18n } = useTranslation();
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState({});
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    if (user.isLoggedIn) {
      fetchRestaurants();
    }
  }, [user.isLoggedIn, refreshFlag]);

  const fetchRestaurants = async () => {
    const token = Cookies.get('adminToken'); 

    if (!token) {
      toast.error('Token is missing');
      return;
    }

    try {
      const response = await ky.get(`${api_url}restaurants`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();

      const adminId = parseInt(user.id, 10);
      const adminRestaurants = response.filter(restaurant => parseInt(restaurant.admin_id, 10) === adminId);

      setRestaurants(adminRestaurants);

      adminRestaurants.forEach(async (restaurant) => {
        const reservationsResponse = await ky.get(`${api_url}restaurants/${restaurant.id}/reservations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).json();
        setReservations(prev => ({ ...prev, [restaurant.id]: reservationsResponse }));
      });
    } catch (error) {
      toast.error(t('errorFetchingRestaurants'));
      console.error('Erreur lors de la récupération des restaurants : ', error);
    }
  };

  const handleDelete = async (restaurantId) => {
    const token = Cookies.get('adminToken'); 

    if (!token) {
      toast.error('Token is missing');
      return;
    }

    try {
      await ky.delete(`${api_url}restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchRestaurants();
      toast.success(t('restaurantDeleted'));
    } catch (error) {
      console.error('Erreur lors de la suppression du restaurant : ', error);
      toast.error(t('deleteRestaurantError'));
    }
  };

  const handleDeleteReservation = async (restaurant_id, reservationId) => {
    const token = Cookies.get('adminToken');

    if (!token) {
      toast.error('Token is missing');
      return;
    }

    try {
      await ky.delete(`${api_url}restaurants/${restaurant_id}/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success(t('delRes'));
      setRefreshFlag(prev => !prev);
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation : ', error);
      toast.error(t('deleteReservationError'));
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
      <h1 className="title-pages">{t('titleSpaceAdmin')}</h1>

      <div className="button-card-container">
        <div className="button-card">
          <div className="button-wrapper">
            <Link to="/admin/edit-profile" className="btn-edit-user"> 
              {t('editAdmin')} 
            </Link>
          </div>
          <div className="button-wrapper">
            <Link to="/create-restaurant">
              <button className="btn-create-restau"> 
                {t('createRestau')} 
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h1 className='your-restau'> {t('yourRestau')} </h1>
        <div className='card-container admin-cards'>
          {restaurants.length > 0 ? (
            restaurants.map(restaurant => (
              <div key={restaurant.id} className='restaurant-card'>
                <img src={restaurant.cover_image_url || restaurant.image_url} alt={restaurant.name} className='img-restau-admin' />
                <div className="restaurant-content">
                  <h3 className='restaurant-title'> <strong> {restaurant.name} </strong> </h3>
                  <p> {t('descriptR')} : {restaurant.description} </p>
                  <p> {t('cityR')} : {restaurant.city} </p>
                  <p> {t('foodR')} : {restaurant.food} </p>
                  <p> {t('numberOfReservations')} : {reservations[restaurant.id]?.length || 0} </p>
                </div>

                <div className='btn-admin'>
                  <div>
                    <Link to={`/edit-restaurant/${restaurant.id}`}>
                      <button> {t('editR')} </button>
                    </Link>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(restaurant.id)}> {t('delR')} </button>
                  </div>
                </div>

                <div className='reserv-admin'>
                  <h3 className='title-resa'> {t('reservations')} </h3>
                  {reservations[restaurant.id]?.length > 0 ? (
                    reservations[restaurant.id].map(reservation => (
                      <div key={reservation.id} className='div-resa'>
                        <p>{t('client')} {reservation.user?.email} {t('hadReserv')} {reservation.number} {t('pers')} {t('on')} {formatDate(reservation.date)} {t('at')} {formatTime(reservation.time)} </p>
                        <button onClick={() => handleDeleteReservation(restaurant.id, reservation.id)} className="btn-comm"> <IoTrashSharp /> </button>
                      </div>
                    ))
                  ) : (
                    <p> {t('noReservations')} </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p> {t('noRestau')} </p>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminProfile;
