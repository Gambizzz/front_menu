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
import { api_url } from '../../App';
import { Tabs } from "antd";

const { TabPane } = Tabs;

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
        const response = await ky.get(`${api_url}restaurants/${id}`, {
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
        const response = await ky.get(`${api_url}restaurants/${id}/comments`);
        const data = await response.json();
        const enrichedComments = data.map(comment => ({
          ...comment,
          user_id: comment.email === user.email ? user.id : null
        }));
        setComments(enrichedComments);
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
      const response = await ky.post(`${api_url}restaurants/${id}/comments`, {
        json: { comment: { body: newComment } },
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      const newCommentData = { ...data, email: user.email, user_id: user.id };
      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire : ', error);
      toast.error(t('errorAddComment'));
    }
  };

  const removeComment = async (commentId) => {
    try {
      await ky.delete(`${api_url}restaurants/${id}/comments/${commentId}`, {
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
      await ky.post(`${api_url}favorites`, {
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
        <div className="menu-details">
          <img src={restaurant.image_url} alt={restaurant.name} />
        </div>
        <div className="text-content">
          <div className="card-content">
            <h1 className="name-restau"> <strong> {restaurant.name} </strong> </h1>
            <p>{t('descriptR')} : {restaurant.description} </p>
            <p>{t('cityR')} : {restaurant.city} </p>
            <p>{t('foodR')} : {restaurant.food} </p>
            <button onClick={addFavorite} className="btn-fav">
              <FaHeart size={20} />
            </button>
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="1" className="tabs">
        <TabPane tab={t('comments')} key="1" className="title-tabs">
          <div className="comments-section">
            {comments.length === 0 ? (
              <p> {t('noComments')} </p>
            ) : (
              comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <p> {t('client')} <strong> {comment.email} </strong> {t('hadComment')} {comment.body} </p>
                  {user && comment.user_id === user.id && (
                    <button onClick={() => removeComment(comment.id)} className="btn-comm">
                      <IoTrashSharp /></button>
                  )}
                </div>
              ))
            )}
            {user.isLoggedIn && !user.isAdmin ? (
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
              <p className="log-comm"> <strong> {user.isAdmin ? t('adminCannotComment') : t('loginToComment')} </strong> </p>
            )}
          </div>
        </TabPane>

        <TabPane tab={t('makeReservation')} key="2">
          <div className="reservation-section">
            {user.isLoggedIn && !user.isAdmin ? (
              <ReservationForm restaurantId={id} userToken={user.token} />
            ) : (
              <p> <strong> {user.isAdmin ? t('adminCannotReserve') : t('loginToReserve')} </strong> </p>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Details;
