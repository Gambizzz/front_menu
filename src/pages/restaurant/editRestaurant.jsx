import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url } from '../../App';

const EditRestaurant = () => {
  const { id } = useParams();
  const { t } = useTranslation('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [food, setFood] = useState('');
  const [photo, setPhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [user] = useAtom(userAtom);

  const cities = ['Paris', 'Marseille', 'Toulouse', 'Lyon', 'Bordeaux', 'Lille', 'Montpellier', 'Nice', 'Rennes', 'Rouen', 'Strasbourg', 'Reims'];
  const foods = ['Chinese', 'Japanese', 'Italian', 'French', 'Lebanese', 'Mediterranean', 'Greek', 'Mexican', 'Indian', 'Thaï', 'Korean', 'Vegetarian', 'Fast food'];

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const token = user.token;
      const response = await ky.get(`${api_url}restaurants/${id}`, {
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

  const handleSelection = (e) => {
    const { name, value } = e.target;
    if (name === 'city') {
      setCity(value);
    } else if (name === 'food') {
      setFood(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'description') {
      setDescription(value);
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
      formData.append('restaurant[city]', city);
      formData.append('restaurant[food]', food);
      if (photo) {
        formData.append('restaurant[photo]', photo);
      }
      formData.append('restaurant[cover_photo]', coverPhoto);

      const token = user.token;

      const response = await ky.put(`${api_url}restaurants/${id}`, {
        body: formData,
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
    <div className='edit-form-container'>
      <div className='edit-form'>
        <form onSubmit={handleSubmit}>
          <h1 className="title-pages tit-pag"> {t('editR')} </h1>
          <div className='form-group'>
            <label> {t('nameR')} </label>
            <input type="text" name="name" value={name} onChange={handleSelection} />
          </div>
          <div className='form-group'>
            <label> {t('descriptR')} </label>
            <textarea
              name="description"
              value={description}
              onChange={handleSelection}
            />
          </div>
          <div className='form-group'>
            <label> {t('cityR')} </label>
            <select name="city" value={city} onChange={handleSelection} required>
              <option value=''> {t('selectedCities')} </option>
              {cities.map((city, index) => (
                <option key={index} value={city}> {city} </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label> {t('foodR')} </label>
            <select name="food" value={food} onChange={handleSelection} required>
              <option value=''> {t('selectFood')} </option>
              {foods.map((food, index) => (
                <option key={index} value={food}> {food} </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label> {t('picture')} </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <div className='form-group'>
            <label> {t('coverPicture')} </label>
            <input
              type="file"
              onChange={handleCoverFileChange}
              accept="image/*"
              required
            />
          </div>
          <div className='submit btn-sub'>
            <button type="submit"> {t('updateR')} </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>  
  );
};

export default EditRestaurant;
