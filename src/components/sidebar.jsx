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

 

  return (
    <div className="app-container">
      <div className={`sidebar ${showSidebar ? 'active' : ''} ${isNightMode ? 'nuit' : ''}`}>
        <ul>
          <li> <button onClick={toggleDyslexic}> {t('opendys')} </button> </li>
          <li> {t('colorBlind')} </li>
        </ul>
      </div>
      <button onClick={toggleSidebar} className={`toggle-btn ${isNightMode ? 'nuit' : ''} ${isDyslexicMode ? 'dyslexic' : ''}`}>
        {t('access')}
      </button>
    </div>
  );
};

export default Sidebar;

