import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import ky from "ky";

const Restaurants = () => {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState([]);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const token = user.token;
      const response = await ky.get('http://localhost:3000/restaurants', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();
      setRestaurants(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des restaurants : ', error);
    }
  };
  
    return(
        <>
        <h1 className="title-pages"> {t('titleRestau')} </h1>
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
            <h1> {restaurant.name} </h1>
            <p> {restaurant.description} </p>
          </Link>
        ))}
        </>
    )
}

export default Restaurants;