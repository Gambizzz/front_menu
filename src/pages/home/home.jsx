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
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-6">
              <img
                src="/img_hero_1.png"  // Assurez-vous que le chemin vers votre image est correct
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
        <div className="container my-1"> {/* Réduction de la marge de 5 à 3 */}
          <div className="row">
            <div className="col-lg-6 text-cities">
              <div className="p-5 mt-4">
                <p className="lead">NOUS EXISTONS DÉJÀ</p>
                <p className="lead-cities">DANS TROIS VILLES...</p>
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
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="Slide 1"
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
              alt="Slide 2"
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="Slide 3"
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="Slide 4"
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="Slide 5"
            />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;

