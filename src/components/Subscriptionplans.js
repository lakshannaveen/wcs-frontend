import React from 'react';
import './Subscriptionplans.css';


import dailyImage from '../images/IMG_6151.JPG';  
import weeklyImage from '../images/IMG_6152.JPG';  
import monthlyImage from '../images/IMG_6153.JPG';  

function CustomSubscription() {
  return (
    <div className="subscription-container">
     
      <h1 className="subscription-title">Subscription Plans</h1>

      
      <div className="plans-wrapper">
        
        
        <div className="plan daily">
          <div className="plan-header">
            <img
              src={dailyImage}  
              alt="Daily Collection"
              className="plan-image"
            />
          </div>
          <h2>Daily Collection</h2>
          <ul>
            <li>Daily waste collection.</li>
            <li>On-demand pickups within service hours.</li>
            <li>Access to a limited recycling and waste reporting dashboard.</li>
            <li>Ideal for temporary or high-demand situations.</li>
          </ul>
        </div>

        
        <div className="plan weekly">
          <div className="plan-header">
            <img
              src={weeklyImage}  
              alt="Weekly Collection"
              className="plan-image"
            />
          </div>
          <h2>Weekly Collection</h2>
          <ul>
            <li>Scheduled weekly waste collection.</li>
            <li>Priority scheduling for additional pickups.</li>
            <li>Great for small businesses or residential communities.</li>
          </ul>
        </div>

        
        <div className="plan monthly">
          <div className="plan-header">
            <img
              src={monthlyImage} 
              alt="Monthly Collection"
              className="plan-image"
            />
          </div>
          <h2>Monthly Collection</h2>
          <ul>
            <li>Multiple collections per month.</li>
            <li>Priority customer support.</li>
            <li>Detailed waste and recycling reports, accessible monthly.</li>
            <li>Best for small waste volumes, long-term savings.</li>
          </ul>
        </div>
      </div>

      
      <p className="note">
        <strong>Important:</strong> All these subscription plans are valid for 3 months only. The pick-up date can be chosen on a day of your choice. <br />
        The pick-up time can be scheduled in the morning, evening, or afternoon. You can select your subscription plan at checkout.
      </p>
    </div>
  );
}

export default CustomSubscription;
