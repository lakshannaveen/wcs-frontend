import React from 'react';
import './Privacypolicy.css';
import { useLanguage } from '../contexts/LanguageContext';
import { privacyPolicyTranslations as t } from '../translations/privacyPolicyTranslations';

const CustomPrivacypolicy = () => {
  const { language } = useLanguage();
  
  return (
    <div className="terms-container">
    <h1 className="text-center">{t.heading[language]}</h1>
    <p className="text-muted text-center">{t.lastUpdated[language]}</p>

    <section className="terms-content">
      <h3>{t.infoWeCollect[language]}</h3>
      <p>{t.infoWeCollectIntro[language]}</p>
      <ul>
        <li>{t.personalInfo[language]}</li>
        <li>{t.paymentInfo[language]}</li>
        <li>{t.autoInfo[language]}</li>
      </ul>
    </section>

    <section className="terms-content">
      <h3>{t.useOfInfo[language]}</h3>
      <ul>
        <li>{t.provideService[language]}</li>
        <li>{t.processPayments[language]}</li>
        <li>{t.communicate[language]}</li>
        <li>{t.improve[language]}</li>
        <li>{t.legal[language]}</li>
      </ul>
    </section>

    <section className="terms-content">
      <h3>{t.dataSharing[language]}</h3>
      <p>{t.dataSharingIntro[language]}</p>
      <ul>
        <li>{t.serviceProviders[language]}</li>
        <li>{t.legalCompliance[language]}</li>
      </ul>
    </section>

    <section className="terms-content">
      <h3>{t.dataSecurity[language]}</h3>
      <p>{t.securityText[language]}</p>
    </section>

    <section className="terms-content">
      <h3>{t.yourRights[language]}</h3>
      <ul>
        <li>{t.accessInfo[language]}</li>
        <li>{t.correctInfo[language]}</li>
        <li>{t.deleteInfo[language]}</li>
      </ul>
    </section>

    <section className="terms-content">
      <h3>{t.policyChanges[language]}</h3>
      <p>{t.changesText[language]}</p>
    </section>

    <p className="text-center mt-4">
      {t.contactNote[language]}
      <a href="/contact">{t.contactLink[language]}</a>
      {t.contactEnd[language]}
    </p>
  </div>
);
};

export default CustomPrivacypolicy;