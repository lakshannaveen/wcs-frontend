import React from "react";
import "./Wasteguidance.css";
import guidance1 from "../images/guidance1.jpg";
import guidance2 from "../images/guidance2.jpg";
import guidance3 from "../images/guidance3.jpg";
import { useLanguage } from '../contexts/LanguageContext';
import { wasteGuidanceTranslations } from '../translations/wasteGuidanceTranslations';

function Wasteguidance() {
  const { language } = useLanguage();
  const t = wasteGuidanceTranslations[language];
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">{t.title}</h2>
      <div className="row gy-4">
        <div className="col-md-4 col-sm-12">
          <div className="card shadow-sm h-100">
            <img src={guidance1} alt={t.food.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{t.food.title}</h5>
              <p className="card-text">{t.food.text}</p>
              <p className="card-text"><strong>{t.food.examples}</strong></p>
              <p className="card-text text-danger"><strong>{t.food.important}</strong></p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card shadow-sm h-100">
            <img src={guidance2} alt={t.degradable.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{t.degradable.title}</h5>
              <p className="card-text">{t.degradable.text}</p>
              <p className="card-text"><strong>{t.degradable.examples}</strong></p>
              <p className="card-text text-danger"><strong>{t.degradable.important}</strong></p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card shadow-sm h-100">
            <img src={guidance3} alt={t.nonDegradable.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{t.nonDegradable.title}</h5>
              <p className="card-text">{t.nonDegradable.text}</p>
              <p className="card-text"><strong>{t.nonDegradable.examples}</strong></p>
              <p className="card-text text-danger"><strong>{t.nonDegradable.important}</strong></p>
            </div>
          </div>
        </div>
      </div>
      <div className="alert alert-warning mt-4" role="alert">
        <strong>{t.alert.important}</strong> {t.alert.text}
      </div>
    </div>
  );
}

export default Wasteguidance;