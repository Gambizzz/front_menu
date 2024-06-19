import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import ky from 'ky';
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";

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
        console.error('Erreur lors de la récupération de l\'annonce : ', error);
      }
    };
    fetchRestaurant();
  }, [id, user.token]);

  if (!restaurant) {
    return <div> Loading... </div>;
  }
  
    return (
      <>
        <div key={restaurant.id}>
          <h1 className="name-restau"> {restaurant.name} </h1>
          <p> Description : {restaurant.description} </p>
          <p> Ville : {restaurant.city} </p>
          <p> Type de nourriture : {restaurant.food} </p>
        </div>
      </>
    )
}

export default Details;