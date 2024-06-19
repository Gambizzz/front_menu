import React from "react";
import { useTranslation } from "react-i18next";



const Concept = () => {
  const { t } = useTranslation();

    return(
        <>
          <div className="page-header">
            <h1 className="title-pages"> {t('conceptTitle')} </h1>
            <h2> {t('sloganConcept')} </h2>
          </div>

          <div className="concept-cards">
            <div className="card-concept">
              <div className="card-inner-concept">
                <div className="card-front-concept">
                  <p> {t('curious')} </p>
                </div>
                <div className="card-back-concept">
                  <p> {t('text-curious')} </p>
                </div>
              </div>
            </div>

            <div className="card-concept">
              <div className="card-inner-concept">
                <div className="card-front-concept">
                  <p> {t('starving')} </p>
                </div>
                <div className="card-back-concept">
                  <p> {t('text-starving')} </p>
                </div>
              </div>
            </div>

            <div className="card-concept">
              <div className="card-inner-concept">
                <div className="card-front-concept">
                  <p> {t('satisfied')} </p>
                </div>
                <div className="card-back-concept">
                  <p> {t('text-satisfied')} </p>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default Concept;