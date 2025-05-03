import React from 'react';
import './Subscriptionplans.css';
import dailyImage from '../images/IMG_6151.JPG';  
import weeklyImage from '../images/IMG_6152.JPG';  
import monthlyImage from '../images/IMG_6153.JPG';  
import oneTimeImage from '../images/IMG_6154.JPG';  
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../translations/subscriptionTranslations';

function CustomSubscription() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="subscription-container">
      <h1 className="subscription-title"><strong>{t.title}</strong></h1>

      <div className="plans-wrapper">
        <div className="plan daily">
          <div className="plan-header">
            <img src={dailyImage} alt={t.daily.title} className="plan-image" />
          </div>
          <h2>{t.daily.title}</h2>
          <ul>
            {t.daily.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="plan weekly">
          <div className="plan-header">
            <img src={weeklyImage} alt={t.weekly.title} className="plan-image" />
          </div>
          <h2>{t.weekly.title}</h2>
          <ul>
            {t.weekly.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="plan monthly">
          <div className="plan-header">
            <img src={monthlyImage} alt={t.monthly.title} className="plan-image" />
          </div>
          <h2>{t.monthly.title}</h2>
          <ul>
            {t.monthly.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="plan one-time">
          <div className="plan-header">
            <img src={oneTimeImage} alt={t.oneTime.title} className="plan-image" />
          </div>
          <h2>{t.oneTime.title}</h2>
          <ul>
            {t.oneTime.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="note">
        <strong>{t.note.important}</strong> {t.note.text}
      </p>
    </div>
  );
}

export default CustomSubscription;