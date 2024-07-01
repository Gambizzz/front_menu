import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { nightModeAtom, userAtom } from './atoms';
import Cookies from 'js-cookie';
import './index.scss';
import Log from './pages/forms/login';
import Sign from './pages/forms/signup';
import Edit from './pages/forms/edit';
import Logout from './components/logout';
import ResetPassword from './pages/forms/resetPassword';
import ResetPasswordAdmin from './pages/forms/resetPasswordAdmin';
import ForgotPassword from './pages/forms/forgotPassword';
import ForgotPasswordAdmin from './pages/forms/forgotPasswordAdmin';
import Home from './pages/home/home';
import Nav from './components/navbar';
import Footer from './components/footer';
import Concept from './pages/footer/concept';
import Team from './pages/footer/team';
import Contact from './pages/footer/contact';
import Restaurants from './pages/restaurant/listeRestaurants';
import Details from './pages/restaurant/detailsRestaurant';
import AdminLog from './pages/forms/adminLogin';
import AdminSign from './pages/forms/adminSignup';
import AdminLogout from './components/adminLogout';
import UserProfile from './pages/profiles/userProfile';
import AdminProfile from './pages/profiles/adminProfile';
import CreateRestaurant from './pages/restaurant/createRestaurant';
import EditRestaurant from './pages/restaurant/editRestaurant';
import EditAdmin from './pages/forms/editAdmin';

export const api_url = import.meta.env.VITE_BACK_API_URL;

function App() {
  const [isNightMode, setIsNightMode] = useAtom(nightModeAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token') || Cookies.get('adminToken');
    const userId = Cookies.get('id') || Cookies.get('adminId');
    const isAdmin = !!Cookies.get('adminToken');


    if (token && userId) {
      setUser({
        email: "",
        id: userId,
        token: token,
        isLoggedIn: true,
        isAdmin: isAdmin,
      });
    }
  }, [setUser]);

  const toggleTheme = () => {
    setIsNightMode(!isNightMode);
    const html = document.getElementsByTagName('html')[0];
    html.classList.toggle('nuit');
  };

  return (
    <Router>
      <header>
        <Nav isNightMode={isNightMode} toggleTheme={toggleTheme} />
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        {/* Routes pour le USER */}
        <Route path='/login' element={<Log />} />
        <Route path='/signup' element={<Sign />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        {/* Routes pour l'ADMIN */}
        <Route path='/admin/login' element={<AdminLog />} />
        <Route path='/admin/signup' element={<AdminSign />} />
        <Route path='/admin/logout' element={<AdminLogout />} />
        <Route path='/forgot-password-admin' element={<ForgotPasswordAdmin />} />
        <Route path='/reset-password-admin/:token' element={<ResetPasswordAdmin />} />
        {/* Routes FOOTER */}
        <Route path='/concept' element={<Concept />} />
        <Route path='/team' element={<Team />} />
        <Route path='/contact' element={<Contact />} />
        {/* Routes RESTAURANTS */}
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/restaurant/:id' element={<Details />} />
        <Route path='/create-restaurant' element={<CreateRestaurant />} />
        <Route path='/edit-restaurant/:id' element={<EditRestaurant />} />
        {/* Routes Profil USER */}
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
        <Route path="/admin/edit-profile" element={<EditAdmin />} />
      </Routes> 

      <footer>
        <Footer isNightMode={isNightMode} />
      </footer>
    </Router>
  );
}

export default App;
