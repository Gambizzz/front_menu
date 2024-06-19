import React from "react";
import { useTranslation } from "react-i18next";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


const Contact = () => {
  const { t } = useTranslation();

    return(
        <>
          <div className="page-header">
            <h1 className="title-pages"> {t('contactTitle')} </h1>
            <h2> {t('contact-slogan')} </h2>
          </div>

          <div className="full-contact">
            <div className="contact-form">
              <form className="form-contact">
                <div className="flex-contact">
                    <label>
                        <input required="" placeholder="" type="text"/>
                        <span> {t('firstName')} </span>
                    </label>
                    <label>
                        <input required="" placeholder="" type="text"/>
                        <span> {t('lastName')} </span>
                    </label>
                </div>
                <label>
                    <input required="" placeholder="" type="email"/>
                    <span> {t('emailForm')} </span>
                </label> 
                <label>
                    <input required="" type="tel" placeholder=""/>
                    <span> {t('number')} </span>
                </label>
                <label>
                    <textarea required="" rows="3" placeholder=""></textarea>
                    <span> {t('textArea')} </span>
                </label>
                <button> {t('sendForm')} </button>
              </form>
            </div>

            <div className="coord-contact">
              <p> {t('textContact')} </p>
              <div className="ref-contact">
                <p> <PiBuildingOfficeFill size={35} className="icon"/> {t('address')} </p>
                <p> <FaPhone size={35} className="icon"/> {t('phone')} </p>
                <p> <MdEmail size={35} className="icon"/> {t('mail')} </p>
              </div>
            </div>
          </div>
        </>
    )
}

export default Contact;