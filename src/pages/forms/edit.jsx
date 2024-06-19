import React from "react";
import { useTranslation } from "react-i18next";

const Edit = () => {
  const { t } = useTranslation();

  return (
      <h1> {t('editProfileForm')} </h1>
  )
}

export default Edit;