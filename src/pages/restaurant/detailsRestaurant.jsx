import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import ky from 'ky';
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReservationForm from "./ReservationForm";
import { FaHeart } from "react-icons/fa6";

const Details = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await ky.get(`http://localhost:3000/restaurants/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du restaurant : ', error);
        toast.error(t('errorFetchingRestaurants'));
      }
    };

    fetchRestaurant();
  }, [id, user.token]);

  const addFavorite = async () => {
    try {
      await ky.post('http://localhost:3000/favorites', {
        json: { favorite: { restaurant_id: id } },
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      toast.success(t('favoriteAdded'));
    } catch (error) {
      console.error('Erreur lors de l\'ajout du favori : ', error);
      toast.error(t('errorAddingFavorite'));
    }
  };

  if (!restaurant) {
    return <div>{t('load')}</div>;
  }

  return (
    <div>
      <ToastContainer />

      <div className="card-details">
        <h1 className="name-restau">{restaurant.name}</h1>
        <p>{t('descriptR')}: {restaurant.description}</p>
        <p>{t('cityR')}: {restaurant.city}</p>
        <p>{t('foodR')}: {restaurant.food}</p>
        <div className="menu-details">
          <h2>{t('ourMenu')}</h2>
          <img src={restaurant.image_url} alt={restaurant.name} />
        </div>
        <button onClick={addFavorite} className="btn-fav">
          <FaHeart size={30} />
        </button>
      </div>

      <div className="resa-details">
        <h2>{t("makeReservation")}</h2>
        <ReservationForm restaurantId={id} userToken={user.token} />
      </div>
    </div>
  );
};

export default Details;

