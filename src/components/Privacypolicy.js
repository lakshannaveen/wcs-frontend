import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../config/languages';
import './Privacypolicy.css';

const CustomPrivacypolicy = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].privacyPolicy;

  return (
    <div className={`privacy-page ${theme}`}>
      <div className={`privacy-container ${theme}`}>
        <div className="privacy-content-wrapper">
          <h1>{t.title}</h1>
          <p className="last-updated">{t.lastUpdated}</p>

          <section className="privacy-section">
            <h2>{t.sections.informationWeCollect.title}</h2>
            <p>{t.sections.informationWeCollect.intro}</p>
            <ul>
              {t.sections.informationWeCollect.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t.sections.howWeUse.title}</h2>
            <p>{t.sections.howWeUse.intro}</p>
            <ul>
              {t.sections.howWeUse.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t.sections.dataSharing.title}</h2>
            <p>{t.sections.dataSharing.intro}</p>
            <ul>
              {t.sections.dataSharing.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t.sections.dataSecurity.title}</h2>
            <p>{t.sections.dataSecurity.content}</p>
          </section>

          <section className="privacy-section">
            <h2>{t.sections.yourRights.title}</h2>
            <p>{t.sections.yourRights.intro}</p>
            <ul>
              {t.sections.yourRights.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t.sections.changes.title}</h2>
            <p>{t.sections.changes.content}</p>
          </section>

          <div className="contact-info">
            <p>{t.sections.contactInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPrivacypolicy;