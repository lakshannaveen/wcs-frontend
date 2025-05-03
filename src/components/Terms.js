import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../config/languages';
import './Terms.css';

function CustomTerms() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].terms;

  return (
    <div className={`terms-page ${theme}`}>
      <div className={`terms-container ${theme}`}>
        <h1>{t.title}</h1>
        <p className="last-updated">{t.lastUpdated}</p>

        <div className="terms-content">
          <section className="terms-section">
            <h2>{t.sections.introduction.title}</h2>
            <p>{t.sections.introduction.content}</p>
          </section>

          <section className="terms-section">
            <h2>{t.sections.serviceUsage.title}</h2>
            <ul>
              {t.sections.serviceUsage.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section">
            <h2>{t.sections.paymentTerms.title}</h2>
            <ul>
              {t.sections.paymentTerms.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section">
            <h2>{t.sections.cancellationPolicy.title}</h2>
            <ul>
              {t.sections.cancellationPolicy.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section">
            <h2>{t.sections.amendments.title}</h2>
            <p>{t.sections.amendments.content}</p>
          </section>

          <div className="contact-info">
            <p>{t.sections.contactInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomTerms;