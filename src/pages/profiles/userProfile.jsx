import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();

  console.log('User data in UserProfile:', user);  // Log to verify user data

  return (
    <div>
      <h1 className="title-pages">{t('titleSpaceUser')}</h1>
      <p>{t('email')}: {user.email}</p>
      <p>{t('id')}: {user.id}</p>

      <Link to={`/restaurants/${user.restaurant_id}/reservations`}>
        {t('viewReservations')}
      </Link>

      <Link to="/edit">
        <button>{t('editProfileButton')}</button>
      </Link>
    </div>
  );
}

export default UserProfile;
