import React from 'react'
import './Subscriptionplans.css';

function CustomSubscription() {
  return (
    <body>
  <div class="special-offers">
    <h1>Special Offers</h1>
    <div class="offers-container">
      <div class="offer" id="steel-offer">
        <h2>Steel</h2>
        <ul>
          <li><strong>25% Off</strong> First time clients and new registrant we offer a 25% discount.</li>
          <li><strong>10% Off </strong> Monthly Subscription for Steel Recycling: Reduced monthly prices on collections of steel waste by 10% for those who agree to make annual requests.</li>
          <li><strong>Save 15%</strong> Bulk Collection Discount- Save 15% on 5+ Pickups : Suitable for clients who often require several steel collections at different periods. Free discounts when you schedule more than five steel pickups in a given month by enjoying a 15% discount.</li>
        </ul>
        
      </div>
      <div class="offer" id="plastic-offer">
        <h2>Plastic</h2>
        <ul>
          <li><strong>25% Off</strong> Plastic Collection for New Customers: First-time clients and new registrants for the plastic waste collection service are offered a discount of 25%.</li>
          <li><strong>20% Off</strong> on Annual Plastic Collection Subscription: Cut your costs by 20% and sign up for our yearly service concerning the removal of plastic waste.</li>
          <li><strong>5% Off</strong> for Recycled Plastic Producers: However, for every pickup of the delivered plastic, you get a further 5% of the material’s cost if it is repurposed or if you recycle it.</li>
        </ul>
        
      </div>
      <div class="offer" id="glass-offer">
        <h2>Glass</h2>
        <ul>
          <li><strong>15% Off</strong> Commercial Glass Recycling: Actual weekly pickups can also be reduced by 15% for restaurants, bars, and hotels by sorting their glass material for recycling.</li>
          <li><strong>10% Off</strong> Household Glass Collection Service: This also reminds homeowners that they can avail 10% discount for a monthly subscription to ensure the sustainable disposal of glass waste.</li>
          <li><strong>20% Off</strong> for Large Volume Glass Waste: Large companies receive a 20% off for regular glass waste collection for businesses which generate a lot of glass waste.</li>
        </ul>
       
      </div>
      <div class="offer" id="food-waste-offer">
        <h2>Food </h2>
        <ul>
          <li><strong>30% Off</strong> First-Time Food Waste Pickup: An excellent deal for restaurants, cafes, or food producers who want to give our food waste service a shot.</li>
          <li><strong>10% Off</strong> for Weekly Food Waste Collections: Order pickups less frequently and cut your food waste in half, plus receive 10% off.</li>
          <li><strong>15% Off</strong> Seasonal Promotions for Food Waste Collections: You can also gain a seasonal promotional price for the food waste collection, especially during rush hours such as holidays.</li>
        </ul>
      </div>
    </div>
  </div>
</body>

  )
}

export default CustomSubscription
