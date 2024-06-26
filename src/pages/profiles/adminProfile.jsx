import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ky from 'ky';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProfile = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (user.isLoggedIn) {
      fetchRestaurants();
    }
  }, [user.isLoggedIn]);

  const fetchRestaurants = async () => {
    const token = Cookies.get('adminToken'); 

    if (!token) {
      toast.error('Token is missing');
      return;
    }

    try {
      const response = await ky.get('http://localhost:3000/restaurants', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();

      const adminId = parseInt(user.id, 10);
      const adminRestaurants = response.filter(restaurant => parseInt(restaurant.admin_id, 10) === adminId);

      setRestaurants(adminRestaurants);

      adminRestaurants.forEach(async (restaurant) => {
        const reservationsResponse = await ky.get(`http://localhost:3000/restaurants/${restaurant.id}/reservations`, {
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
    console.log('Delete Token:', token);

    if (!token) {
      toast.error('Token is missing');
      return;
    }

    try {
      await ky.delete(`http://localhost:3000/restaurants/${restaurantId}`, {
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
      await ky.delete(`http://localhost:3000/restaurants/${restaurant_id}/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success(t('reservation supprimé'));
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation : ', error);
      toast.error(t('deleteReservationError'));
    }
  };

  return (
    <div>
      <h1 className="title-pages">{t('titleSpaceAdmin')}</h1>

      <div className='admin-infos'>
        <p>{t('email')}: {user.email}</p>
        <p>{t('id')}: {user.id}</p>
      </div>

      <div>
        <Link to="/admin/edit-profile" className='btn-edit-user'> {t('editAdmin')} </Link>
      </div>

      <div className='link-create'>
        <Link to="/create-restaurant"> <button> {t('createRestau')} </button> </Link>
      </div>

      <div>
        <h2 className='your-restau'> {t('yourRestau')} </h2>
        <div className='cards-admin'>
          {restaurants.length > 0 ? (
            restaurants.map(restaurant => (
              <div key={restaurant.id} className='solo-card'>
                <h3>{restaurant.name}</h3>
                <img src={restaurant.image_url} />
                <p>{restaurant.description}</p>
                <p>{restaurant.city}</p>
                <p>{restaurant.food}</p>
                <p>{t('numberOfReservations')} : {reservations[restaurant.id]?.length || 0}</p>
                <div className='btn-admin'>
                  <Link to={`/edit-restaurant/${restaurant.id}`}>
                    <button> {t('editR')} </button>
                  </Link>
                  <button onClick={() => handleDelete(restaurant.id)}> {t('delR')} </button>
                </div>
                <div>
                <h4>{t('reservations')}:</h4>
                  {reservations[restaurant.id]?.length > 0 ? (
                    reservations[restaurant.id].map(reservation => (
                      <div key={reservation.id}>
                        <p>{t('reservationId')}: {reservation.id}</p>
                        <p>{t('reservationDate')}: {reservation.date}</p>
                        <p>{t('reservationTime')}: {reservation.time}</p>
                        <p>{t('reservationEmail')}: {reservation.email}</p>
                        <p>{t('reservationEmail')}: {reservation.user_id}</p>
                        <button onClick={() => handleDeleteReservation(restaurant.id, reservation.id)}>{t('delR')}</button>
                      </div>
                    ))
                  ) : (
                    <p>{t('noReservations')}</p>
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
