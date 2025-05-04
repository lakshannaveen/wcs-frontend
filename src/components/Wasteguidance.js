import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from '../config/guidenceLanguages';
import "./Wasteguidance.css";

// Importing images
import guidance1 from "../images/guidance1.jpg";
import guidance2 from "../images/guidance2.jpg";
import guidance3 from "../images/guidance3.jpg";

function Wasteguidance() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Get translations for the current language
  const t = translations[language].wasteGuidance || translations.en.wasteGuidance;

  return (
    <div className={`waste-guidance-page ${theme}`}>
      <div className={`container my-4 ${theme}`}>
        <h2 className={`text-center mb-4 ${theme}`}>{t.title}</h2>
        <div className="row gy-4">
          <div className="col-md-4 col-sm-12">
            <div className={`card shadow-sm h-100 ${theme}`}>
              <img
                src={guidance1}
                alt={t.foodWasteAlt}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className={`card-title ${theme}`}>{t.foodWaste}</h5>
                <p className={`card-text ${theme}`}>
                  {t.foodWasteDesc} <br />
                  <strong>{t.examples}:</strong> {t.foodExamples}
                </p>
                <p className={`card-text text-danger ${theme}`}>
                  <strong>{t.important}:</strong> {t.foodImportant}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className={`card shadow-sm h-100 ${theme}`}>
              <img
                src={guidance2}
                alt={t.degradableAlt}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className={`card-title ${theme}`}>{t.degradable}</h5>
                <p className={`card-text ${theme}`}>
                  {t.degradableDesc} <br />
                  <strong>{t.examples}:</strong> {t.degradableExamples}
                </p>
                <p className={`card-text text-danger ${theme}`}>
                  <strong>{t.important}:</strong> {t.degradableImportant}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className={`card shadow-sm h-100 ${theme}`}>
              <img
                src={guidance3}
                alt={t.nonDegradableAlt}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className={`card-title ${theme}`}>{t.nonDegradable}</h5>
                <p className={`card-text ${theme}`}>
                  {t.nonDegradableDesc} <br />
                  <strong>{t.examples}:</strong> {t.nonDegradableExamples}
                </p>
                <p className={`card-text text-danger ${theme}`}>
                  <strong>{t.important}:</strong> {t.nonDegradableImportant}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`alert alert-warning mt-4 ${theme}`} role="alert">
          <strong>{t.important}:</strong> {t.alertText} <br />
          {t.alertText2}
        </div>
      </div>
    </div>
  );
}

export default Wasteguidance;