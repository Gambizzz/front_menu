import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import ky from 'ky';
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReservationForm from "./ReservationForm";
import { FaHeart } from "react-icons/fa6";
import { IoTrashSharp } from "react-icons/io5";
import '../../index.scss';

const Details = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
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

    const fetchComments = async () => {
      try {
        const response = await ky.get(`http://localhost:3000/restaurants/${id}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires : ', error);
        toast.error(t('errorFetchComments'));
      }
    };

    fetchRestaurant();
    fetchComments();
  }, [id, user.token]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ky.post(`http://localhost:3000/restaurants/${id}/comments`, {
        json: { comment: { body: newComment } },
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('erreur lors de l\'ajout du commentaire : ', error);
      toast.error(t('errorAddComment'));
    }
  };

  const removeComment = async (commentId) => {
    try {
      await ky.delete(`http://localhost:3000/restaurants/${id}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setComments(comments.filter(comment => comment.id !== commentId));
      toast.success(t('commentRemoved'));
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire : ', error);
      toast.error(t('errorRemovingComm'));
    }
  };

  const addFavorite = async () => {
    try {
      await ky.post('http://localhost:3000/favorites', {
        json: { favorite: { restaurant_id: id } },
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      toast.success(t('favoriteAdded'));
    } catch (error) {
      console.error('Erreur lors de l\'ajout du favori : ', error);
      toast.error(t('errorAddingFavorite'));
    }
  };

  if (!restaurant) {
    return <div>{t('load')}</div>;
  }

  return (
    <div className="details-container">
      <ToastContainer />
      <div className="card-details">
        <img src={restaurant.image_url} alt={restaurant.name} />
        <div className="text-content">
          <h1 className="name-restau"> {restaurant.name} </h1>
          <p>{t('descriptR')} : {restaurant.description} </p>
          <p>{t('cityR')} : {restaurant.city} </p>
          <p>{t('foodR')} : {restaurant.food} </p>
          <button onClick={addFavorite} className="btn-fav">
            <FaHeart size={30} />
          </button>
        </div>
      </div>

      <div className="comments-section">
        <h2> {t("comments")} </h2>
        {comments.length === 0 ? (
          <p> {t('noComments')} </p>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <p> {t('client')} <strong> {comment.email} </strong> {t('hadComment')} {comment.body} </p>
              {user && comment.user_id === user.id && (
                <button onClick={() => removeComment(comment.id)} className="btn-comm">
                  <IoTrashSharp />
                </button>
              )}
              <hr />
            </div>
          ))
        )}
        {user.isLoggedIn ? (
          <form onSubmit={handleCommentSubmit} className="form-comm">
            <h2> {t("leaveComments")} </h2>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('addComment')}
            />
            <button type="submit"> <strong> {t('submitComment')} </strong> </button>
          </form>
        ) : (
          <p className="log-comm"> <strong> {t('loginToComment')} </strong> </p>
        )}
      </div>
      
      <div className="reservation-section">
        
        {user.isLoggedIn ? (
          <ReservationForm restaurantId={id} userToken={user.token} />
        ) : (
          <p> {t('noReservationForAdmin')} </p>
        )}
      </div>
    </div>
  );
};

export default Details;
