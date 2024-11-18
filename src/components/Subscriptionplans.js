import React from 'react';
import './Subscriptionplans.css';

function CustomSubscription() {
  return (
    <body>
      <div className="subscription-container">
        <h1 className="subscription-title">SUBSCRIPTION PLANS</h1><br></br><br></br>

        <div className="plans-wrapper">
          
          <div className="plan daily">
            <h2><strong>Daily Collection Plan</strong></h2>
            <ul>
              <li>• Daily waste collection.</li>
              <li>• On-demand pickups within service hours.</li>
              <li>• Access to a limited recycling and waste reporting dashboard.</li>
              <li>• Ideal for temporary or high-demand situations.</li>
            </ul>
          </div>

         
          <div className="plan weekly">
            <h2><strong>Weekly Collection Plan</strong></h2>
            <ul>
              <li>• Scheduled weekly waste collection.</li>
              <li>• Priority scheduling for additional pickups.</li>
              <li>• Great for small businesses or residential communities.</li>
            </ul>
          </div>

          
          <div className="plan monthly">
            <h2><strong>Monthly Collection Plan</strong></h2>
            <ul>
              <li>• Multiple collections per month.</li>
              <li>• Priority customer support.</li>
              <li>• Detailed waste and recycling reports, accessible monthly.</li>
              <li>• Best for small waste volumes and long-term savings.</li>
            </ul>
          </div>
        </div>
        <p className="note">
          • All these subscription plans are valid for 3 months only. Also,the pick up date can be given on a day of your choice. The pickup time can be in the morning, evening, or afternoon.
        </p>
      </div>
    </body>
  );
}

export default CustomSubscription; 