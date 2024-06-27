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
        <div className="container my-9">
          <div className="row">
            <div className="col-lg-6">
              <img
                src="/img_hero_1.png" 
                className="shadow"
                alt="Photo d'accueil"
              />
            </div>
            <div className="col-lg-6">
              <div className="p-5 text-hero">
                <p className="lead">IL N'A JAMAIS ÉTÉ AUSSI</p>
                <p className="lead-easier">FACILE</p>
                <p className="lead">DE TROUVER</p>
                <p className="lead">CE QUE VOUS ALLEZ</p>
                <p className="lead-eat">MANGER</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Section */}
      <div className="cities">
        <div className="container my-1">
          <div className="row">
            <div className="col-lg-6 text-cities">
              <div className="p-5 mt-4">
                <p className="lead">NOUS EXISTONS DÉJÀ</p>
                <p className="lead-cities">DANS ONZE VILLES...</p>
                <p className="lead">ET DANS BIEN D'AUTRES</p>
                <p className="lead-come">À VENIR</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title and Carousel Section */}
      <div className="container">
        <h1 className="home-title">{t('')}</h1>
        <div className="carousel-container">
          <Carousel>
            <div className="slide">
              <img src="/PARIS.jpeg" alt="PARIS" />
              <div className="slide-caption">PARIS</div>
            </div>
            <div className="slide">
              <img src="/MARSEILLE.jpg" alt="MARSEILLE" />
              <div className="slide-caption">MARSEILLE</div>
            </div>
            <div className="slide">
              <img src="/LYON.avif" alt="LYON" />
              <div className="slide-caption">LYON</div>
            </div>
            <div className="slide">
              <img src="/STRASBOURG.jpg" alt="STRASBOURG" />
              <div className="slide-caption">STRASBOURG</div>
            </div>
            <div className="slide">
              <img src="/MONTPEL.jpg" alt="MONTPELLIER" />
              <div className="slide-caption">MONTPELLIER</div>
            </div>
            <div className="slide">
              <img src="/LILLE.webp" alt="LILLE" />
              <div className="slide-caption">LILLE</div>
            </div>
            <div className="slide">
              <img src="/RENNES.jpeg" alt="RENNES" />
              <div className="slide-caption">RENNES</div>
            </div>
            <div className="slide">
              <img src="/BORDEAUX.jpg" alt="BORDEAUX" />
              <div className="slide-caption">BORDEAUX</div>
            </div>
            <div className="slide">
              <img src="/ROUEN.webp" alt="ROUEN" />
              <div className="slide-caption">ROUEN</div>
            </div>
            <div className="slide">
              <img src="/NICE.webp" alt="NICE" />
              <div className="slide-caption">NICE</div>
            </div>
            <div className="slide">
              <img src="/REIMS.avif" alt="REIMS" />
              <div className="slide-caption">REIMS</div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
