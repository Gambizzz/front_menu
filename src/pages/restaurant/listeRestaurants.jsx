import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import ky from "ky";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../index.scss';
import { api_url } from '../../App';

const Restaurants = () => {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState([]);
  const [user] = useAtom(userAtom);
  const { city, food } = useParams(); 
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  

  useEffect(() => {
    fetchRestaurants();
  }, [selectedCity, selectedFood]);

  const fetchRestaurants = async () => {
    try {
      const token = user.token;
      // let url = 'http://localhost:3000/restaurants'; 

      const queryParams = {};
      if (selectedCity) queryParams.city = selectedCity;
      if (selectedFood) queryParams.food = selectedFood;

      const queryString = new URLSearchParams(queryParams).toString();

      const response = await ky.get(`${api_url}restaurants?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();

      setRestaurants(response);
    } catch (error) {
      toast.error(t('errorFetchingRestaurants'));
      console.error('Erreur lors de la récupération des restaurants : ', error);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleFoodChange = (e) => {
    setSelectedFood(e.target.value);
  };

  return (
    <>
      <center><h1 className="title-pages">{t('titleRestau')}</h1></center>

      <div className="form-wrapper">
        <div>
          <label className="label">{t('selectedCities')}</label>
          <select className="select" value={selectedCity} onChange={handleCityChange}>
            <option value="">{t('allCities')}</option>
            <option value="Paris">Paris</option>
            <option value="Marseille">Marseille</option>
            <option value="Lyon">Lyon</option>
            <option value="Bordeaux">Bordeaux</option>
            <option value="Lille">Lille</option>
            <option value="Montpellier">Montpellier</option>
            <option value="Nice">Nice</option>
            <option value="Rennes">Rennes</option>
            <option value="Rouen">Rouen</option>
            <option value="Strasbourg">Strasbourg</option>
            <option value="Reims">Reims</option>
          </select>
        </div>

        <div>
          <label className="label">{t('selectFood')}</label>
          <select className="select" value={selectedFood} onChange={handleFoodChange}>
            <option value="">{t('allFood')}</option>
            <option value="Italian">{t('italian')}</option>
            <option value="French">{t('french')}</option>
            <option value="Japanese">{t('japanese')}</option>
            <option value="Chinese">{t('chinese')}</option>
            <option value="Indian">{t('indian')}</option>
            <option value="Mexican">{t('mexican')}</option>
            <option value="Lebanese">{t('lebanese')}</option>
            <option value="Mediterranean">{t('medit')}</option>
            <option value="Thai">{t('thai')}</option>
            <option value="Korean">{t('korean')}</option>
            <option value="Vegetarian">{t('veggie')}</option>
            <option value="Fast food">{t('fast')}</option>
          </select>
        </div>
      </div>

      <div className="card-container">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <img className="restaurant-image" src={restaurant.cover_image_url || restaurant.image_url} alt={restaurant.name} />
              <div className="restaurant-content">
                <h5 className="restaurant-title">{restaurant.name}</h5>
                <p className="restaurant-description">{restaurant.description}</p>
                <p className="restaurant-city">{restaurant.city}</p>
                <p className="restaurant-food">{restaurant.food}</p>
                <div className="restaurant-link-wrapper">
                  <span className="restaurant-link-text">
                    {t('menuLink')}
                  </span>
                  <svg className="restaurant-link-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <ToastContainer />
    </>
  );
};

export default Restaurants;
