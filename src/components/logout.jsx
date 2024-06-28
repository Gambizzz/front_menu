import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const Logout = () => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    setUser({
      email: "",
      id: "",
      token: "",
      isLoggedIn: false,
      isAdmin: false,
    });

    Cookies.remove('userToken');
    Cookies.remove('userId');

    window.location.href = "/";
  }, [setUser]);

  return null;
};

export default Logout;