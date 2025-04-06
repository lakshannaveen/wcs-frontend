import React from 'react';
import './Terms.css';
import { useLanguage } from '../contexts/LanguageContext';

function CustomTerms() {
  const { language } = useLanguage();

  return (
    <div className="terms-container">
      <h1 className="text-center"> {language === 'en' ? 'Terms & Conditions' : 'නියම හා කොන්දේසි'}</h1>
      <p className="text-muted text-center">{ language === 'en' ? '(Last updated: 8th October 2024)' : '(අවසන් යාවත්කාලීන කිරීම: 2024 ඔක්තොම්බර් මස 8 වන දින)' }</p>

      <div className="terms-content">
        <h3>{language === 'en' ?'Introduction' : 'හැදින්වීම'} </h3>
        <p>{language === 'en' ? 'Welcome to WCS! By using our services, you agree to these terms and conditions. Please read them carefully' : ' WCS වෙත ඔබව සාදරයෙන් පිළිගනිමු ! අපගේ සේවා භාවිතයෙන්, ඔබ මෙම නියමයන් පිළිගනිමින් සිටී. කරුණාකර ඒවා නිවැරදිව කියවන්න.'}
        </p>

        <h3>{language === 'en' ? 'Service Usage' : 'සේවාව භාවිතා කිරීම'}</h3>
        <ul>
          <li> {language === 'en'
              ? 'Users can modify their waste collection schedule up to two times per day.'
              : 'පරිශීලකයින්ට දිනයකට වර දෙකක් අපද්‍රව්‍ය එකතු කිරීමේ කාලසටහන වෙනස් කළ හැක.'}</li>
          <li>{language === 'en'
              ? 'Waste must be separated into degradable, non-degradable, and food waste. If not properly separated, collection will not occur.'
              : 'අපද්‍රව්‍ය ජීවගත, අජීවගත සහ ආහාර අපද්‍රව්‍ය ලෙස වෙන් කළ යුතුය. සුදුසු ලෙස වෙන් කර නොමැති නම්, එකතු කිරීම සිදු නොවේ.'}
          </li>
          <li> {language === 'en'
              ? 'Users must ensure that the waste provided adheres to the weight limit of their subscription plan.'
              : 'පරිශීලකයින් ඔවුන්ගේ දායකත්ව සැලැස්මට අදාළ බර සීමාවන්ට අනුකූලව අපද්‍රව්‍යය සපයන බව තහවුරු කළ යුතුය.'}</li>
        </ul>

 
        <h3>{language === 'en' ? 'Payment Terms' : 'ගෙවීම් කොන්දේසි'}</h3>
        <ul>
          <li>
            {language === 'en'
              ? 'All payments must be made in advance.'
              : 'සියලු ගෙවීම් පෙරින්ම සිදු කළ යුතුය.'}
          </li>
          <li>
            {language === 'en'
              ? 'If selecting cash on delivery (COD), the first collection must be paid upfront.'
              : 'භාණ්ඩ බෙදාදීමේදී මුදල් (COD) තෝරාගන්නා විට, පළමු එකතුව සඳහා මුදල මුලින්ම ගෙවිය යුතුය.'}
          </li>
        </ul>

        <h3>{language === 'en' ? 'Cancellation Policy' : 'අවලංගු කිරීමේ ප්‍රතිපත්තිය'}</h3>
        <ul>
          <li>
            {language === 'en'
              ? 'Users may cancel their collection at any time if the waste has not yet been collected.'
              : 'අපද්‍රව්‍ය තවමත් එකතු කර නොමැතිනම්, පරිශීලකයින්ට එකතු කිරීම කිසිඳු වේලාවකම අවලංගු කළ හැක.'}
          </li>
          <li>
            {language === 'en'
              ? 'If at least one collection has taken place, no refunds will be issued for canceled orders.'
              : 'අවම වශයෙන් එකතුවක් සිදු වී ඇත්නම්, අවලංගු කරන ලද ඇණවුම් සඳහා මුදල් ආපසු නොදෙනු ලැබේ.'}
          </li>
        </ul>

        <h3>{language === 'en' ? 'Amendments' : 'වෙනස්කම්'}</h3>
        <p>
          {language === 'en'
            ? 'We may update these terms from time to time. Continued use of the service implies acceptance of any changes.'
            : 'අපි මේ නියමයන් අවස්ථාවකින් අවස්ථාවට යාවත්කාලීන කළ හැක. සේවාව භාවිතා කරවීමේ දී එවැනි වෙනස්කම් පිළිගැනීමක් ලෙස සැලකේ.'}
        </p>

        <h3>{language === 'en' ? 'Contact Us' : 'අපව සම්බන්ධ කරන්න'}</h3>
        <p>
          {language === 'en'
            ? 'For any inquiries, please reach out via our' : 'ඕනෑම විමසීමක් සඳහා, කරුණාකර අපගේ'} <a href="/contact">Contact Us</a> 
            {language === 'en'? ' page.':' පිටුව හරහා සම්බන්ධ වන්න.'}
        </p>
      </div>
    </div>
  );
}

export default CustomTerms;

