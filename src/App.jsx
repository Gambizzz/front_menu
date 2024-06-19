import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { nightModeAtom, dyslexicModeAtom, userAtom } from './atoms';
import Cookies from 'js-cookie';
import './index.scss';
import Log from './pages/forms/login';
import Sign from './pages/forms/signup';
import Edit from './pages/forms/edit';
import Logout from './components/logout';
import ResetPassword from './pages/forms/resetPassword';
import ForgotPassword from './pages/forms/forgotPassword';
import Home from './pages/home/home';
import Nav from './components/navbar';
import Sidebar from './components/sidebar';
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

function App() {
  const [isNightMode, setIsNightMode] = useAtom(nightModeAtom);
  const [isDyslexicMode, setIsDyslexicMode] = useAtom(dyslexicModeAtom);
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

  const toggleDyslexic = () => {
    setIsDyslexicMode(!isDyslexicMode);
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('dyslexic');
  };

  return (
    <BrowserRouter>
      <Sidebar isNightMode={isNightMode} isDyslexicMode={isDyslexicMode} toggleDyslexic={toggleDyslexic} />

      <header>
        <Nav isNightMode={isNightMode} toggleTheme={toggleTheme} toggleDyslexic={toggleDyslexic} />
      </header>

      <Routes>
        {/* routes pour le USER */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Log />} />
        <Route path='/signup' element={<Sign />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        {/* Routes pour l'ADMIN */}
        <Route path='/admin/login' element={<AdminLog />} />
        <Route path='/admin/signup' element={<AdminSign />} />
        <Route path='/admin/logout' element={<AdminLogout />} />
        {/* routes FOOTER */}
        <Route path='/concept' element={<Concept />} />
        <Route path='/team' element={<Team />} />
        <Route path='/contact' element={<Contact />} />
        {/* routes RESTAURANTS */}
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/restaurant/:id' element={<Details />} />
        <Route path='/create-restaurant' element={<CreateRestaurant />} />
        {/* route EDIT PROFILE */}
        <Route path='/edit' element={<Edit />} />
        {/* route Profil USER */}
        <Route path='/profile' element={<UserProfile />} />
        {/* route Profil ADMIN */}
        <Route path='/admin/profile' element={<AdminProfile />} />
      </Routes>

      <footer>
        <Footer isNightMode={isNightMode} />
      </footer>
    </BrowserRouter>
  );
}

export default App;


