import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { nightModeAtom, dyslexicModeAtom } from '../atoms';
import '../index.scss';

const Sidebar = ({ toggleDyslexic }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { t } = useTranslation();
  const [isDyslexicMode, setIsDyslexicMode] = useAtom(dyslexicModeAtom);
  const [isNightMode] = useAtom(nightModeAtom);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${showSidebar ? 'active' : ''} ${isNightMode ? 'nuit' : ''}`}>
        <button className="close-btn" onClick={closeSidebar}>✖</button>
        <button onClick={toggleDyslexic} className='dys-text'> {t('opendys')} </button>
      </div>
      <button onClick={toggleSidebar} className={`toggle-btn ${isNightMode ? 'nuit' : ''} ${isDyslexicMode ? 'dyslexic' : ''}`}>
        {t('access')}
      </button>
    </div>
  );
};

export default Sidebar;

