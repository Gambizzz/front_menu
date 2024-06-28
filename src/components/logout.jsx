import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

function Logout() {
  const [, setUser] = useAtom(userAtom);
  const { t } = useTranslation();

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });

    Cookies.remove('token');
    Cookies.remove('id');
    window.location.href = "/";
  };

  return (
    <div className='logout-form'>
      <h1> {t('déco')} </h1>
      <button onClick={handleLogout}> {t('btn-déco')} </button>
    </div>
  );
}

export default Logout;