import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ky from 'ky';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeartBroken } from "react-icons/fa";

const UserProfile = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await ky.get('http://localhost:3000/favorites', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris : ', error);
        toast.error(t('errorFetchFav'));
      }
    };

    fetchFavorites();
  }, [user.token, t]);

  const removeFavorite = async (favoriteId) => {
    try {
      await ky.delete(`http://localhost:3000/favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      toast.success(t('favoriteRemoved'));
    } catch (error) {
      console.error('Erreur lors de la suppression du favori : ', error);
      toast.error(t('errorRemovingFav'));
    }
  };

  return (
    <div>
      <h1 className="title-pages"> {t('titleSpaceUser')} </h1>
      <p>{t('email')}: {user.email}</p>
      <p>{t('id')}: {user.id}</p>

      <Link to="/edit">
        <button className='btn-edit-user'> {t('editProfileButton')} </button>
      </Link>

      <div className='favs'>
      <h2>{t('myFav')}</h2>
        {favorites.map(favorite => (
          <div key={favorite.id} className='restau-fav'>
            {favorite.restaurant.name}
            <button onClick={() => removeFavorite(favorite.id)} className="btn-fav">
              <FaHeartBroken />
            </button>
          </div>
        ))}
      </div>

      <ToastContainer/>
    </div>
  );
}

export default UserProfile;