import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Subscriptionplans.css';

import dailyImage from '../images/IMG_6151.JPG';  
import weeklyImage from '../images/IMG_6152.JPG';  
import monthlyImage from '../images/IMG_6153.JPG';  
import oneTimeImage from '../images/IMG_6154.JPG';  

function CustomSubscription() {
  const { theme } = useTheme();

  return (
    <div className={`subscription-page ${theme}`}>
      <div className={`subscription-container ${theme}`}>
        <h1 className={`subscription-title ${theme}`}><strong>Subscription Plans</strong></h1>

        <div className="plans-wrapper">
          <div className={`plan daily ${theme}`}>
            <div className="plan-header">
              <img src={dailyImage} alt="Daily Collection" className="plan-image" />
            </div>
            <h2>Daily Collection</h2>
            <ul>
              <li>Daily waste collection at a specific time of your choosing (up to 10 kg per day).</li>
              <li>On-demand pickups within service hours.</li>
              <li>Ideal for temporary or high-demand situations, valid for 3 months from the order date.</li>
              <li>You can cancel your order at any time.</li>
              <li>You can change the collection time to your preferred time after placing the order.</li>
            </ul>
          </div>

          <div className={`plan weekly ${theme}`}>
            <div className="plan-header">
              <img src={weeklyImage} alt="Weekly Collection" className="plan-image" />
            </div>
            <h2>Weekly Collection</h2>
            <ul>
              <li>Scheduled weekly waste collection (up to 20 kg per week) on your chosen day and time, valid for 3 months.</li>
              <li>On-demand pickups within service hours.</li>
              <li>Great for small businesses or residential communities.</li>
              <li>Ideal for those who need consistent weekly service.</li>
              <li>You can cancel your order at any time.</li>
              <li>You can change the collection time to your preferred time after placing the order.</li>
            </ul>
          </div>

          <div className={`plan monthly ${theme}`}>
            <div className="plan-header">
              <img src={monthlyImage} alt="Monthly Collection" className="plan-image" />
            </div>
            <h2>Monthly Collection</h2>
            <ul>
              <li>One-time collection per month (up to 50 kg per month), valid for 3 months.</li>
              <li>Priority customer support.</li>
              <li>Ideal for small waste volumes, providing long-term savings.</li>
              <li>You can cancel your order at any time.</li>
              <li>You can change the collection time to your preferred time after placing the order.</li>
            </ul>
          </div>

          <div className={`plan one-time ${theme}`}>
            <div className="plan-header">
              <img src={oneTimeImage} alt="One-Time Collection" className="plan-image" />
            </div>
            <h2>One-Time Collection</h2>
            <ul>
              <li>Single waste collection (up to 10 kg) without a subscription.</li>
              <li>Strictly no collection if the weight exceeds 10 kg.</li>
              <li>Waste must be separated into Food, Degradable, and Non-Degradable.</li>
              <li>Ideal for occasional clean-ups or minimal waste disposal.</li>
            </ul>
          </div>
        </div>

        <p className={`note ${theme}`}>
          <strong>Important:</strong> Daily Weekly Monthly subscription plans are valid for 3 months only. The pick-up date can be chosen on a day of your choice. <br />
          The pick-up time can be scheduled in the <span className="highlight">morning</span>, <span className="highlight">afternoon</span>, or <span className="highlight">evening</span>. You can select your subscription plan at <span className="highlight">map selection</span>. <br />
          Additionally, you can choose your preferred time (<span className="highlight">morning</span>, <span className="highlight">afternoon</span>, or <span className="highlight">evening</span>) for waste collection during <span className="highlight">checkout</span>.
        </p>
      </div>
    </div>
  );
}

export default CustomSubscription;