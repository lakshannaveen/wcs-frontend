import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Subscriptionplans.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../config/subscriptionLanguages';

import dailyImage from '../images/IMG_6151.JPG';  
import weeklyImage from '../images/IMG_6152.JPG';  
import monthlyImage from '../images/IMG_6153.JPG';  
import oneTimeImage from '../images/IMG_6154.JPG';  

function CustomSubscription() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].subscription;

  return (
    <div className={`subscription-page ${theme}`}>
      <div className={`subscription-container ${theme}`}>
        <h1 className={`subscription-title ${theme}`}><strong>{t.title}</strong></h1>

        <div className="plans-wrapper">
          <div className={`plan daily ${theme}`}>
            <div className="plan-header">
              <img src={dailyImage} alt="Daily Collection" className="plan-image" />
            </div>
            <h2>{t.daily.title}</h2>
            <ul>
              {t.daily.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={`plan weekly ${theme}`}>
            <div className="plan-header">
              <img src={weeklyImage} alt="Weekly Collection" className="plan-image" />
            </div>
            <h2>{t.weekly.title}</h2>
            <ul>
              {t.weekly.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={`plan monthly ${theme}`}>
            <div className="plan-header">
              <img src={monthlyImage} alt="Monthly Collection" className="plan-image" />
            </div>
            <h2>{t.monthly.title}</h2>
            <ul>
              {t.monthly.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={`plan one-time ${theme}`}>
            <div className="plan-header">
              <img src={oneTimeImage} alt="One-Time Collection" className="plan-image" />
            </div>
            <h2>{t.oneTime.title}</h2>
            <ul>
              {t.oneTime.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className={`note ${theme}`}>
          <strong>Important:</strong> {t.note}
        </p>
      </div>
    </div>
  );
}

export default CustomSubscription;