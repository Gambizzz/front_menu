import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ky from 'ky';
import Cookies from 'js-cookie';
import CKEditorComponent from '../../components/CKEditorComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProfile = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState([]);
  const [editorData, setEditorData] = useState('');

  useEffect(() => {
    if (user.isLoggedIn) {
      fetchRestaurants();
    }
  });

  const fetchRestaurants = async () => {
    const token = Cookies.get('token');
    try {
      const response = await ky.get('http://localhost:3000/restaurants', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();

      const adminId = parseInt(user.id, 10); // Convert user.id to a number

      // Filter restaurants where admin_id matches the ID of the logged-in admin
      const adminRestaurants = response.filter(restaurant => parseInt(restaurant.admin_id, 10) === adminId);

      setRestaurants(adminRestaurants);
    } catch (error) {
      toast.error(t('errorFetchingRestaurants'));
      console.error('Erreur lors de la récupération des restaurants : ', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await ky.post('http://localhost:3000/api/save-text', {
        json: { text: editorData },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        toast.success(t('textSavedSuccessfully'));
      } else {
        const errorData = await response.json();
        toast.error(`${t('failedToSaveText')}: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error saving text:', error);
      toast.error(t('failedToSaveText'));
    }
  };

  const handleDelete = async (restaurantId) => {
    const token = Cookies.get('token');
    try {
      await ky.delete(`http://localhost:3000/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchRestaurants();
      toast.success(t('restaurantDeleted'));
    } catch (error) {
      console.error('Erreur lors de la suppression du restaurant : ', error);
      toast.error(t('deleteRestaurantError'));
    }
  };

  return (
    <div>
      <h1 className="title-pages">{t('titleSpaceAdmin')}</h1>

      <div className='admin-infos'>
        <p>{t('email')}: {user.email}</p>
        <p>{t('id')}: {user.id}</p>
      </div>

      <div>
        <Link to="/admin/edit-profile"> {t('editAdmin')} </Link>
      </div>

      <div className='link-create'>
        <Link to="/create-restaurant"> <button> {t('createRestau')} </button> </Link>
      </div>

      <CKEditorComponent data={editorData} onChange={setEditorData} />
      <button onClick={handleSave}>{t('saveButton')}</button>

      <div>
        <h2 className='your-restau'> {t('yourRestau')} </h2>
        <div className='cards-admin'>
          {restaurants.length > 0 ? (
            restaurants.map(restaurant => (
              <div key={restaurant.id} className='solo-card'>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
                <p>{restaurant.city}</p>
                <p>{restaurant.food}</p>
                <div className='btn-admin'>
                  <Link to={`/edit-restaurant/${restaurant.id}`}>
                    <button> {t('editR')} </button>
                  </Link>
                  <button onClick={() => handleDelete(restaurant.id)}> {t('delR')} </button>
                </div>
              </div>
            ))
          ) : (
            <p> {t('noRestau')} </p>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminProfile;