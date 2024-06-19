import React, { useState } from 'react';
import ky from 'ky';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';

const CreateRestaurant = () => {
  const [user] = useAtom(userAtom);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [food, setFood] = useState('');

  const cities = ['Paris', 'Marseille', 'Toulouse', 'Lyon', 'Bordeaux', 'Lille', 'Montpellier', 'Nice', 'Rennes', 'Rouen', 'Strasbourg', 'Reims'];
  const foods = ['Chinese', 'Japanese', 'Italian', 'French', 'Lebanese', 'Mediterranean', 'Greek', 'Mexican', 'Indian', 'Thaï', 'Korean', 'Vegetarian', 'Fast food'];

  const handleSelection = (e) => {
    setCity(e.target.value);
    setFood(e.target.value);
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

      console.log('Restaurant created', response);

      setName('');
      setDescription('');
      
      // window.location.href = "/";

    } catch (error) {
      console.error('There was an error creating the restaurant!', error);
    }
  };

  return (
    <>
      <h1> Ajouter un restaurant </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Nom : </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label> Description : </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label> Ville : </label>
          <select value={city} onChange={handleSelection}>
            <option value=''> Sélectionner une ville </option>
            {cities.map((city, index) => (
              <option key={index} value={city}> {city} </option>
            ))}
          </select>
        </div>
        <div>
          <label> Type de nourriture : </label>
          <select value={food} onChange={handleSelection}>
            <option value=''> Sélectionner un type </option>
            {foods.map((food, index) => (
              <option key={index} value={food}> {food} </option>
            ))}
          </select>
        </div>
        <button type="submit"> Créer </button>
      </form>
    </>
  );
};

export default CreateRestaurant;


