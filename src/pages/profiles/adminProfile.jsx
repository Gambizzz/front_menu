import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CKEditorComponent from '../../components/CKEditorComponent';
import ky from 'ky';

const AdminProfile = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  const [editorData, setEditorData] = useState('');

  const handleSave = async () => {
    try {
      const response = await ky.post('http://localhost:3000/api/save-text', {
        json: { text: editorData },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        alert(t('textSavedSuccessfully'));
      } else {
        const errorData = await response.json();
        alert(`${t('failedToSaveText')}: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error saving text:', error);
      alert(t('failedToSaveTextPleaseTryAgain'));
    }
  };

  return (
    <div>
      <h1 className="title-pages">{t('titleSpaceAdmin')}</h1>
      <p>{t('email')}: {user.email}</p>
      <p>{t('id')}: {user.id}</p>

      <Link to="/create-restaurant">{t('createRestaurant')}</Link>
      
      <div>
      <Link to="/admin/edit-profile"> Modifier le profil admin </Link>
      </div>
      
      <h2>{t('adminPageTitle')}</h2>
      <CKEditorComponent
        data={editorData}
        onChange={setEditorData}
      />
      <button onClick={handleSave}>{t('saveButton')}</button>
    </div>
  );
};

export default AdminProfile;
