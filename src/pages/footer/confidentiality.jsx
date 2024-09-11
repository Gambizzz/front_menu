import React from "react";
import { useTranslation } from "react-i18next";

const Politics = () => {
  const { t } = useTranslation();

  return(
    <>
      <div className="page-header">
        <h1 className="title-pages"> {t('politicsTitle')} </h1>
        <h2> {t('sloganPolitics')} </h2>
      </div>

      <div className="politics">
        <p>{t('politics1')}</p>
        <p>{t('politics2')}</p>
        <strong><p>{t('politics3')}</p></strong>
        <p>{t('politics4')}</p>
        <strong><p>{t('politics5')}</p></strong>
        <p>{t('politics6')}</p>
        <p>{t('politics7')}</p>
        <p>{t('politics8')}</p>
        <p>{t('politics9')}</p>
        <p>{t('politics10')}</p>
        <p>{t('politics11')}</p>
        <strong><p>{t('politics12')}</p></strong>
        <p>{t('politics13')}</p>
        <p>{t('politics14')}</p>
        <p>{t('politics15')}</p>
        <p>{t('politics16')}</p>
        <p>{t('politics17')}</p>
        <p>{t('politics18')}</p>
        <strong><p>{t('politics19')}</p></strong>
        <p>{t('politics20')}</p>
        <p>{t('politics21')}</p>
        <p>{t('politics22')}</p>
        <p>{t('politics23')}</p>
        <p>{t('politics24')}</p>
        <p>{t('politics25')}</p>
        <p>{t('politics26')}</p>
        <p>{t('politics27')}</p>
        <p>{t('politics28')}</p>
        <strong><p>{t('politics29')}</p></strong>
        <p>{t('politics30')}</p>
        <p>{t('politics31')}</p>
        <p>{t('politics32')}</p>
        <p>{t('politics33')}</p>
        <strong><p>{t('politics34')}</p></strong>
        <p>{t('politics35')}</p>
        <strong><p>{t('politics36')}</p></strong>
        <p>{t('politics37')}</p>
        <strong><p>{t('politics38')}</p></strong>
        <p>{t('politics39')}</p>
        <p>{t('politics40')}</p>
        <p>{t('politics41')}</p>
        <p>{t('politics42')}</p>
        <p>{t('politics43')}</p>
        <p>{t('politics44')}</p>
        <strong><p>{t('politics45')}</p></strong>
        <p>{t('politics46')}</p>
        <p>{t('politics47')}</p>
        <p>{t('politics48')}</p>
        <p>{t('politics49')}</p>
        <strong><p>{t('politics50')}</p></strong>
        <p>{t('politics51')}</p>
        <strong><p>{t('politics52')}</p></strong>
        <p>{t('politics53')}</p>
      </div>
    </>
  )
}

export default Politics;