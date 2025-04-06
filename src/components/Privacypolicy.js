import React from 'react';
import './Privacypolicy.css';
import { useLanguage } from '../contexts/LanguageContext';

const CustomPrivacypolicy = () => {
  const { language } = useLanguage();
  
  return (
    <div className="terms-container">
    <h1 className="text-center">
      {language === 'en' ? 'Privacy Policy' : 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය'}
    </h1>
    <p className="text-muted text-center">
      {language === 'en'
        ? '(Last updated: 8th October 2024)'
        : '(අවසන් යාවත්කාලීන කිරීම: 2024 ඔක්තෝබර් 8)'}
    </p>

    <section className="terms-content">
      <h3>{language === 'en' ? 'Information we collect' : 'අපි රැස් කරන තොරතුරු'}</h3>
      <p>
        {language === 'en'
          ? 'We collect the following information from you:'
          : 'අපි ඔබගෙන් පහත තොරතුරු රැස් කරමු:'}
      </p>
      <ul>
        <li>
          {language === 'en'
            ? 'Personal Information: Name, email address, phone number, and address when you register for a waste collection plan or contact us.'
            : 'පුද්ගලික තොරතුරු: නම, විද්‍යුත් තැපැල් ලිපිනය, දුරකථන අංකය සහ ලිපිනය - ඔබ අපද්‍රව්‍ය එකතු කිරීමේ සැලැස්මකට ලියාපදිංචි වන විට හෝ අපව සම්බන්ධ කරන විට.'}
        </li>
        <li>
          {language === 'en'
            ? 'Payment Information: Payment details are collected when you purchase our services.'
            : 'ගෙවීම් තොරතුරු: ඔබ අපගේ සේවාවන් මිලදී ගන්නා විට ගෙවීම් විස්තර රැස් කරනු ලැබේ.'}
        </li>
        <li>
          {language === 'en'
            ? 'Automatically Collected Information: IP address, browser type, and usage (via cookies) when you visit our website.'
            : 'ස්වයංක්‍රීයව රැස් කළ තොරතුරු: ඔබ අපගේ වෙබ්අඩවියට පිවිසෙන විට, IP ලිපිනය, බ්‍රවුසරය, සහ භාවිතය (කුකීස් මඟින්).'}
        </li>
      </ul>
    </section>

    <section className="terms-content">
      <h3>{language === 'en' ? 'How We Use Your Information' : 'ඔබේ තොරතුරු භාවිතා කිරීමේ ක්‍රමය'}</h3>
      <ul>
        <li>
          {language === 'en'
            ? 'Provide and manage waste collection services.'
            : 'අපද්‍රව්‍ය එකතු කිරීමේ සේවා සපයන්න සහ කළමනාකරණය කරන්න.'}
        </li>
        <li>
          {language === 'en'
            ? 'Process your payments and send invoices.'
            : 'ඔබගේ ගෙවීම් සකස් කරන්න සහ ඉන්වොයිසි එවන්න.'}
        </li>
        <li>
          {language === 'en'
            ? 'Communicate with you regarding service updates or changes.'
            : 'සේවා යාවත්කාලීන කිරීම් හෝ වෙනස්කම් සම්බන්ධයෙන් ඔබ සමඟ සන්නිවේදනය කරන්න.'}
        </li>
        <li>
          {language === 'en'
            ? 'Improve our website and services based on user behavior.'
            : 'පරිශීලක හැසිරීම් මත පදනම්ව අපගේ වෙබ්අඩවිය සහ සේවාවන් වර්ධනය කරන්න.'}
        </li>
        <li>
          {language === 'en'
            ? 'Comply with legal requirements.'
            : 'නීතිමය අවශ්‍යතා වලට අනුකූල වන්න.'}
        </li>
      </ul>
    </section>

    <section className="terms-content">
      <h3>{language === 'en' ? 'Data Sharing' : 'දත්ත බෙදාගැනීම'}</h3>
      <p>
        {language === 'en'
          ? 'We do not sell or share your personal information with third parties, except:'
          : 'අපි ඔබේ පුද්ගලික තොරතුරු තෙවන පාර්ශවයන්ට විකුණන්නේ හෝ බෙදාගන්නේ නැත, තවදුරටත් පහත වැරදින්නක් නොමැතිනම්:'}
      </p>
      <ul>
        <li>
          {language === 'en'
            ? 'Service Providers: Third-party providers like payment processors.'
            : 'සේවා සපයන්නන්: ගෙවීම් සැකසුම් වැනි තෙවන පාර්ශව සපයන්නන්.'}
        </li>
        <li>
          {language === 'en'
            ? 'Legal Compliance: If required by law, we may share your information.'
            : 'නීතිමය අනුකූලතාව: නීතියක් අනුව අපි ඔබේ තොරතුරු බෙදාගත හැකිය.'}
        </li>
      </ul>
    </section>

    <section className="terms-content">
      <h3>{language === 'en' ? 'Data Security' : 'දත්ත ආරක්ෂාව'}</h3>
      <p>
        {language === 'en'
          ? 'We implement reasonable security measures to protect your personal information. However, no online system is 100% secure.'
          : 'අපි ඔබේ පුද්ගලික තොරතුරු ආරක්ෂා කිරීමට තෘප්තිමත් ආරක්ෂක ක්‍රියාමාර්ග ගනිමු. නමුත් කිසිදු මෘදුකාංග පද්ධතියක් 100% ආරක්ෂිත නොවේ.'}
      </p>
    </section>

    <section className="terms-content">
      <h3>{language === 'en' ? 'Your Rights' : 'ඔබේ හිමිකම්'}</h3>
      <ul>
        <li>
          {language === 'en'
            ? 'Access the personal information we hold about you.'
            : 'අපි ඔබ ගැන තබාගෙන ඇති පුද්ගලික තොරතුරු බලන්න.'}
        </li>
        <li>
          {language === 'en'
            ? 'Request corrections to inaccurate information.'
            : 'වැරදි තොරතුරු නිවැරදි කිරීමට ඉල්ලීම් කරන්න.'}
        </li>
        <li>
          {language === 'en'
            ? 'Request the deletion of your data, subject to legal requirements.'
            : 'නීතිමය සීමාවන් යටතේ ඔබේ දත්ත මකා දැමීමට ඉල්ලීමක් කරන්න.'}
        </li>
      </ul>
    </section>

    <section className="terms-content">
      <h3>{language === 'en' ? 'Changes to This Policy' : 'මෙම ප්‍රතිපත්තියේ වෙනස්කම්'}</h3>
      <p>
        {language === 'en'
          ? 'We may update this Privacy Policy from time to time. Please review it periodically.'
          : 'අපි මෙම පෞද්ගලිකත්ව ප්‍රතිපත්තිය අවස්ථාවකින් අවස්ථාවට යාවත්කාලීන කළ හැක. කරුණාකර නිතරම ඒක පරීක්ෂා කරන්න.'}
      </p>
    </section>

    <p className="text-center mt-4">
      {language === 'en'
        ? 'If you have any questions or concerns, please contact us via our '
        : 'ඔබට කිසියම් ප්‍රශ්නයක් හෝ අවුලක් තිබේ නම්, කරුණාකර '}
      <a href="/contact">{language === 'en' ? 'Contact Us' : 'අපව සම්බන්ධ කරන්න'}</a>{' '}
      {language === 'en' ? ' page.' : ' පිටුව හරහා අපව සම්බන්ධ කරන්න.'}
    </p>
  </div>
);
};

export default CustomPrivacypolicy;