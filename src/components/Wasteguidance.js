import React from "react";
import "./Wasteguidance.css";
import guidance1 from "../images/guidance1.jpg";
import guidance2 from "../images/guidance2.jpg";
import guidance3 from "../images/guidance3.jpg";
import { useLanguage } from '../contexts/LanguageContext';

function Wasteguidance() {
  const { language } = useLanguage();

 
  const translations = {
    en: {
      title: "Waste Separation Guidance",
      food: {
        title: "Food Waste",
        text: "It is mandatory to dispose of all organic food scraps separately in this bin for collection.",
        examples: "Examples: Fruit peels, vegetable trimmings, and leftover food.",
        important: "Important: Please ensure that food waste is separated from other waste before disposal."
      },
      degradable: {
        title: "Degradable Waste",
        text: "It is mandatory to dispose of all biodegradable items separately in this bin for collection.",
        examples: "Examples: Paper, cardboard, and garden waste like leaves and branches.",
        important: "Important: Please ensure that degradable waste is separated from other waste before disposal."
      },
      nonDegradable: {
        title: "Non-Degradable Waste",
        text: "It is mandatory to dispose of all non-recyclable items separately in this bin for collection.",
        examples: "Examples: Plastic wrappers, broken electronics, and ceramic items.",
        important: "Important: Please ensure that non-degradable waste is separated from other waste before disposal."
      },
      alert: {
        important: "Important:",
        text: "Proper waste segregation is mandatory. You must dispose of waste separately in the correct bin. If waste is not separated, we will not be able to collect it. This helps maintain an efficient and eco-friendly collection system for everyone."
      }
    },
    //Sinhala text
    si: {
      title: "අපද්‍රව්‍ය වෙන් කිරීමේ මාර්ගෝපදේශ",
      food: {
        title: "ආහාර අපද්‍රව්‍ය",
        text: "සියලුම කාබනික ආහාර අපද්‍රව්‍ය එකතු කිරීම සඳහා මෙම බඳුනේ වෙනම බැහැර කිරීම අනිවාර්යයි.",
        examples: "උදාහරණ: පළතුරු පොතු, එළවළු කැබලි, සහ ඉතුරු ආහාර කොටස්.",
        important: "වැදගත්: බැහැර කිරීමට පෙර ආහාර අපද්‍රව්‍ය, වෙනත් අපද්‍රව්‍යවලින් වෙන් කර ඇති බව සහතික කරන්න."
      },
      degradable: {
        title: "දිරාපත් වන අපද්‍රව්‍ය",
        text: "සියලුම ජෛව හායනයට ලක්වන අයිතම එකතු කිරීම සඳහා මෙම බඳුනේ වෙනම බැහැර කිරීම අනිවාර්යයි.",
        examples: "උදාහරණ: කඩදාසි, කාඩ්බෝඩ්, සහ ගස් කොළ සහ අතු වැනි උයන් අපද්‍රව්‍ය.",
        important: "වැදගත්: බැහැර කිරීමට පෙර දිරාපත් වන අපද්‍රව්‍ය, වෙනත් අපද්‍රව්‍යවලින් වෙන් කර ඇති බව සහතික කරන්න."
      },
      nonDegradable: {
        title: "දිරාපත් නොවන අපද්‍රව්‍ය",
        text: "සියලුම ප්‍රතිචක්‍රීකරණය කළ නොහැකි අයිතම එකතු කිරීම සඳහා මෙම බඳුනේ වෙනම බැහැර කිරීම අනිවාර්යයි.",
        examples: "උදාහරණ: ප්ලාස්ටික් ආවරණ, බිඳුණු ඉලෙක්ට්‍රොනික උපකරණ, සහ සෙරමික් අයිතම.",
        important: "වැදගත්: බැහැර කිරීමට පෙර දිරාපත් නොවන අපද්‍රව්‍ය,වෙනත් අපද්‍රව්‍යවලින් වෙන් කර ඇති බව සහතික කරන්න."
      },
      alert: {
        important: "වැදගත්:",
        text: "නිසි අපද්‍රව්‍ය වෙන් කිරීම අනිවාර්‍යයයි. ඔබ අපද්‍රව්‍ය නිවැරදි බඳුනේ වෙනම බැහැර කළ යුතුයි. අපද්‍රව්‍ය වෙන් කර නොමැති නම්, අපට එය එකතු කිරීමට නොහැකි වේ. මෙය සෑම කෙනෙකුටම කාර්යක්ෂම සහ පරිසර හිතකාමී සේවාවක් සැපයීමට උපකාරී වේ."
      }
    }
  };

  const t = translations[language];

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