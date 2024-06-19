import React from 'react';
import '../index.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { nightModeAtom } from '../atoms';
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SiAppstore } from "react-icons/si";
import { RiGooglePlayLine } from "react-icons/ri";
import logoFootJour from '../../src/assets/images/logo-footer-jour.svg';
import logoFootNuit from '../../src/assets/images/logo-footer-nuit.svg';

const Footer = () => {
  const { t } = useTranslation();
  const [isNightMode] = useAtom(nightModeAtom);

  return (
    <div className='footer'>
      <div className='top-footer'>
        <img src={isNightMode ? logoFootNuit : logoFootJour} alt='Logo navbar' className='logo-footer'></img>
        <Link to="/" className='link-form-footer gold'>RESTAURATEURS ?</Link>
      </div>
      <div className='pages-footer'>
        <Link to="/concept">{t('concept')}</Link>
        <Link to="/team">{t('team')}</Link>
        <Link to="/contact">{t('contact')}</Link>
      </div>
      <div className='links-footer'>
        <a href='https://www.instagram.com/' className='social-icons gold'><FaInstagram /></a>
        <a href='https://www.facebook.com/' className='social-icons gold'><FiFacebook /></a>
        <a href='https://x.com/?lang=fr' className='social-icons gold'><FaXTwitter /></a>
        <a href='https://www.apple.com/fr/app-store/' className='social-icons gold'><SiAppstore /></a>
        <a href='https://play.google.com/store/games?hl=fr' className='social-icons gold'><RiGooglePlayLine /></a>
      </div>
      <p>MENU © THP - {t('hiver')} 2024.</p>
    </div>
  )
}

export default Footer;
