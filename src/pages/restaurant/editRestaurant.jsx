import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRestaurant = () => {
  const { id } = useParams();
  const { t } = useTranslation('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [food, setFood] = useState('');
  const [user] = useAtom(userAtom);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const token = user.token;
      const response = await ky.get(`http://localhost:3000/restaurants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();
      setName(response.name);
      setDescription(response.description);
      setCity(response.city);
      setFood(response.food);
    } catch (error) {
      console.error('Erreur lors de la récupération du restaurant : ', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'food':
        setFood(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = user.token;
      const restaurant = {
        name,
        description,
        city,
        food
      };
      
      const response = await ky.put(`http://localhost:3000/restaurants/${id}`, {
        json: restaurant,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();

      toast.success(t('majRestaurant'));
      console.log('Réponse de mise à jour:', response);
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1000); 

    } catch (error) {
      console.error('Erreur lors de la mise à jour du restaurant : ', error);
      toast.error(t('errorMajRestaurant'));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label> {t('nameR')} </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> {t('descriptR')} </label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> {t('cityR')} </label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> {t('foodR')} </label>
          <input
            type="text"
            name="food"
            value={food}
            onChange={handleChange}
          />
        </div>
        <button type="submit"> {t('updateR')} </button>
      </form>

      <ToastContainer />
    </>
  );
};

export default EditRestaurant;










