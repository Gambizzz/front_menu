import React, { useState } from 'react';
import ky from 'ky';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

const CreateRestaurant = () => {
  const { t } = useTranslation('');
  const [user] = useAtom(userAtom);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [food, setFood] = useState('');
  const [photo, setPhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

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

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCoverFileChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('restaurant[name]', name);
      formData.append('restaurant[description]', description);
      formData.append('restaurant[admin_id]', user.id);
      formData.append('restaurant[city]', city);
      formData.append('restaurant[food]', food);
      formData.append('restaurant[photo]', photo);
      formData.append('restaurant[cover_photo]', coverPhoto);

      const token = user.token;

      const response = await ky.post(`${api_url}restaurants`, {
        body: formData,
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
      setPhoto(null);
      setCoverPhoto(null);

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
      <form onSubmit={handleSubmit} className='create-form'>
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
        <div>
          <label> {t('picture')} </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div>
          <label> {t('coverPicture')} </label>
          <input
            type="file"
            onChange={handleCoverFileChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit"> {t('createR')} </button>
      </form>

      <ToastContainer />
    </>
  );
};

export default CreateRestaurant;
