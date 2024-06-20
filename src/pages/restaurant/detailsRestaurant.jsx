import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import ky from 'ky';
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [text, setText] = useState('');
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

    const fetchText = async () => {
      try {
        const response = await ky.get("http://localhost:3000/api/latest-text", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch text");
        }

        const data = await response.json();
        setText(data.text);
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };

    fetchRestaurant();
    fetchText();
  }, [id, user.token]);

  if (!restaurant) {
    return <div> {t('load')} </div>;
  }

  return (
    <div>
      <ToastContainer />

      <div>
        <h1 className="name-restau">{restaurant.name}</h1>
        <p> {t('descriptR')} : {restaurant.description}</p>
        <p> {t('cityR')} : {restaurant.city}</p>
        <p> {t('foodR')} : {restaurant.food}</p>
      </div>

      <div>
        <h2> {t('ourMenu')} </h2>
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </div>
  );
};

export default Details;

