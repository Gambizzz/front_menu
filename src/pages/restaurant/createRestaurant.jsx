import React, { useState } from 'react';
import ky from 'ky';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRestaurant = () => {
  const { t } = useTranslation('');
  const [user] = useAtom(userAtom);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [food, setFood] = useState('');

  const cities = ['Paris', 'Marseille', 'Toulouse', 'Lyon', 'Bordeaux', 'Lille', 'Montpellier', 'Nice', 'Rennes', 'Rouen', 'Strasbourg', 'Reims'];
  const foods = ['Chinese', 'Japanese', 'Italian', 'French', 'Lebanese', 'Mediterranean', 'Greek', 'Mexican', 'Indian', 'Thaï', 'Korean', 'Vegetarian', 'Fast food'];

  const handleSelection = (e) => {
    const { name, value } = e.target;
    if (name === 'city') {
      setCity(value);
    } else if (name === 'food') {
      setFood(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = user.token;

      const response = await ky.post('http://localhost:3000/restaurants', {
        json: {
          name: name,
          description: description,
          admin_id: user.id,
          city: city,
          food: food,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();

      toast.success(t('successR'));
      console.log('Restaurant créé', response);

      setName('');
      setDescription('');
      setCity('');
      setFood('');

      setTimeout(() => {
        window.location.href = "/";
      }, 1000); 

    } catch (error) {
      console.error('Erreur lors de la création du restaurant : ', error);
      toast.error(t('errorR'));
    }
  };

  return (
    <>
      <h1 className="title-pages"> {t('addR')} </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label> {t('nameR')} </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label> {t('descriptR')} </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label> {t('cityR')} </label>
          <select name="city" value={city} onChange={handleSelection} required>
            <option value=''> {t('selectedCities')} </option>
            {cities.map((city, index) => (
              <option key={index} value={city}> {city} </option>
            ))}
          </select>
        </div>
        <div>
          <label> {t('foodR')} </label>
          <select name="food" value={food} onChange={handleSelection} required>
            <option value=''> {t('selectFood')} </option>
            {foods.map((food, index) => (
              <option key={index} value={food}> {food} </option>
            ))}
          </select>
        </div>
        <button type="submit"> {t('createR')}</button>
      </form>

      <ToastContainer />
    </>
  );
};

export default CreateRestaurant;



