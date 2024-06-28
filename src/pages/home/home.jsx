import React from "react";
import { useTranslation } from "react-i18next";
import { Carousel } from "flowbite-react";

import "../../index.scss";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-index">
        <div className="div-pic">
          <img
            src="public/pic_menu.png" 
            className="hero-pic"
            alt="Photo d'accueil"
          />
          </div>
          <div className="text-hero">
            <p className="lead"> {t('th1')} </p>
            <p className="lead-easier"> {t('th2')} </p>
            <p className="lead"> {t('th3')} </p>
            <p className="lead"> {t('th4')} </p>
            <p className="lead-eat"> {t('th5')} </p>
          </div>
        </div>

        {/* Cities Section */}
        <div className="text-cities">
          <div className="text1">
            <span className="lead"> {t('th6')} </span>
            <span className="lead-cities"> {t('th7')} </span>
          </div>
          <div className="text2">
            <span className="lead"> {t('th8')} </span>
            <span className="lead-come"> {t('th9')} </span>
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel-container">
          <Carousel>
            <div className="slide">
              <img src="public/PARIS.jpeg" alt="PARIS" />
              <div className="slide-caption"> PARIS </div>
            </div>
            <div className="slide">
              <img src="public/MARSEILLE.jpg" alt="MARSEILLE" />
              <div className="slide-caption"> MARSEILLE </div>
            </div>
            <div className="slide">
              <img src="public/TOULOUSE.jpg" alt="TOULOUSE" />
              <div className="slide-caption"> TOULOUSE </div>
            </div>
            <div className="slide">
              <img src="public/LYON.avif" alt="LYON" />
              <div className="slide-caption"> LYON </div>
            </div>
            <div className="slide">
              <img src="public/STRASBOURG.jpg" alt="STRASBOURG" />
              <div className="slide-caption">STRASBOURG</div>
            </div>
            <div className="slide">
              <img src="public/MONTPEL.jpg" alt="MONTPELLIER" />
              <div className="slide-caption"> MONTPELLIER </div>
            </div>
            <div className="slide">
              <img src="public/LILLE.webp" alt="LILLE" />
              <div className="slide-caption"> LILLE </div>
            </div>
            <div className="slide">
              <img src="public/RENNES.jpeg" alt="RENNES" />
              <div className="slide-caption"> RENNES </div>
            </div>
            <div className="slide">
              <img src="public/BORDEAUX.jpg" alt="BORDEAUX" />
              <div className="slide-caption"> BORDEAUX </div>
            </div>
            <div className="slide">
              <img src="public/ROUEN.webp" alt="ROUEN" />
              <div className="slide-caption"> ROUEN </div>
            </div>
            <div className="slide">
              <img src="public/NICE.webp" alt="NICE" />
              <div className="slide-caption"> NICE </div>
            </div>
            <div className="slide">
              <img src="public/REIMS.avif" alt="REIMS" />
              <div className="slide-caption"> REIMS </div>
            </div>
          </Carousel>
        </div>
      </div>

  );
};

export default Home;
