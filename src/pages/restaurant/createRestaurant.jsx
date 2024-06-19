import React, { useState } from 'react';
import ky from 'ky';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';

const CreateRestaurant = () => {
  const [user] = useAtom(userAtom);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = user.token;

      const response = await ky.post('http://localhost:3000/restaurants', {
        json: {
          name: name,
          description: description,
          admin_id: user.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();

      console.log('Restaurant created', response);

      setName('');
      setDescription('');

      window.location.href = "/";
    } catch (error) {
      console.error('There was an error creating the restaurant!', error);
    }
  };

  return (
    <>
      <h1> Créer un Restaurant </h1>
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
        <button type="submit"> Créer </button>
      </form>
    </>
  );
};

export default CreateRestaurant;

