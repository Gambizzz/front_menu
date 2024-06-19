import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import Cookies from 'js-cookie';

const AdminLogout = () => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    setUser({
      email: "",
      id: "",
      token: "",
      isLoggedIn: false,
      isAdmin: false,
    });

    Cookies.remove('adminToken');
    Cookies.remove('adminId');

    window.location.href = "/";
  }, [setUser]);

  return null;
};

export default AdminLogout;
