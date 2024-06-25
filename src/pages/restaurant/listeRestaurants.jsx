import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import ky from "ky";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      let url = 'https://menu-v2-0bd45fb14757.herokuapp.com/restaurants';

      const queryParams = {};
      if (selectedCity) queryParams.city = selectedCity;
      if (selectedFood) queryParams.food = selectedFood;

      const queryString = new URLSearchParams(queryParams).toString();

      const response = await ky.get(`${url}?${queryString}`, {
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
      <h1 className="title-pages">{t('titleRestau')}</h1>

      <div className="drop-cities">
        <label> {t('selectedCities')} </label>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value=""> {t('allCities')} </option>
          <option value="Paris"> Paris </option>
          <option value="Marseille"> Marseille </option>
          <option value="Toulouse"> Toulouse </option>
          <option value="Lyon"> Lyon </option>
          <option value="Bordeaux"> Bordeaux </option>
          <option value="Lille"> Lille </option>
          <option value="Montpellier"> Montpellier </option>
          <option value="Nice"> Nice </option>
          <option value="Rennes"> Rennes </option>
          <option value="Rouen"> Rouen </option>
          <option value="Strasbourg"> Strasbourg </option>
          <option value="Reims"> Reims </option>
        </select>
      </div>

      <div className="drop-food">
        <label> {t('selectFood')} </label>
        <select value={selectedFood} onChange={handleFoodChange}>
          <option value=""> {t('allFood')} </option>
          <option value="Italian"> {t('italian')} </option>
          <option value="French"> {t('french')} </option>
          <option value="Japanese"> {t('japanese')} </option>
          <option value="Chinese"> {t('chinese')} </option>
          <option value="Indian"> {t('indian')} </option>
          <option value="Mexican"> {t('mexican')} </option>
          <option value="Lebanese"> {t('lebanese')} </option>
          <option value="Mediterranean"> {t('medit')} </option>
          <option value="Thaï"> {t('thai')} </option>
          <option value="Korean"> {t('korean')} </option>
          <option value="Vegetarian"> {t('veggie')} </option>
          <option value="Fast food"> {t('fast')} </option>
        </select>
      </div>

      <div className="card-restau">
        {restaurants.map((restaurant) => (
          <div className="restau" key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <img src={restaurant.image_url} alt={restaurant.title} />
              <h1> {restaurant.name} </h1>
              <p> {restaurant.description} </p>
              <p> {restaurant.city} </p>
              <p> {restaurant.food} </p>
            </Link>
          </div>
        ))}
      </div>

      <ToastContainer />
    </>
  );
};

export default Restaurants;

