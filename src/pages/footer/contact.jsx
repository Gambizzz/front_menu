import React from "react";
import { useTranslation } from "react-i18next";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


const Contact = () => {
  const { t } = useTranslation();

    return(
      <>
      <div className="contact-page-container">
        <div className="page-header">
          <h1 className="title-pages"> {t('contactTitle')} </h1>
          <h2 className="subtitle"> {t('contact-slogan')} </h2>
        </div>
    
        <div className="full-contact">
          <div className="contact-form">
            <form className="form-contact">
              <div className="flex-contact">
                <div className="form-group">
                  <label>
                    <input required type="text" />
                    <span> {t('firstName')} </span>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input required type="text" />
                    <span> {t('lastName')} </span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>
                  <input required type="email" />
                  <span> {t('emailForm')} </span>
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input required type="tel" />
                  <span> {t('number')} </span>
                </label>
              </div>
              <div className="form-group">
                <label>
                  <textarea required rows="3"></textarea>
                  <span> {t('textArea')} </span>
                </label>
              </div>
              <div className="submit btn-sub">
                <button type="submit"> {t('sendForm')} </button>
              </div>
            </form>
          </div>
    
          <div className="coord-contact">
            <p> {t('textContact')} </p>
            <div className="ref-contact">
              <p>
                <PiBuildingOfficeFill size={35} className="icon" /> {t('address')}
              </p>
              <p>
                <FaPhone size={35} className="icon" /> {t('phone')}
              </p>
              <p>
                <MdEmail size={35} className="icon" /> {t('mail')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
    
    )
}

export default Contact;