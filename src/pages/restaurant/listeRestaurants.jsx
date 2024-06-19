import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import ky from "ky";
import { Link, useParams } from "react-router-dom";

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
      let url = 'http://localhost:3000/restaurants';

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

      <div>
        <label>Sélectionner une ville :</label>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Toutes les villes</option>
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
        <label>Sélectionner un type de cuisine :</label>
        <select value={selectedFood} onChange={handleFoodChange}>
          <option value="">Toutes les cuisines</option>
          <option value="Italian">Italian</option>
          <option value="French">French</option>
          <option value="Japanese">Japanese</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Mexican">Mexican</option>
          <option value="Lebanese">Lebanese</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Thaï">Thaï</option>
          <option value="Korean">Korean</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Fast food">Fast food</option>
        </select>
      </div>

      <div className="card-restau">
        {restaurants.map((restaurant) => (
          <div className="restau" key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <h1> {restaurant.name} </h1>
              <p> {restaurant.description} </p>
              <p> {restaurant.city} </p>
              <p> {restaurant.food} </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Restaurants;

