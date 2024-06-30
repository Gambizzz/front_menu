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
    <div className='logout-form-container'>
      <div className='logout-form'>
        <h1 className='title-pages tit-pag'> {t('déco')} </h1>
        <div className='submit btn-sub'>
          <button onClick={handleLogout}> {t('btn-déco')} </button>
        </div>
      </div>
    </div>
  
  );
}

export default Logout;