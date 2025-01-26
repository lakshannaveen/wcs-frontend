import React from "react";
import "./Wasteguidance.css";

// Importing images
import guidance1 from "../images/guidance1.jpg";
import guidance2 from "../images/guidance2.jpg";
import guidance3 from "../images/guidance3.jpg";

function Wasteguidance() {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Waste Separation Guidance</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <img src={guidance1} alt="Food Waste Guidance" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Food Waste</h5>
              <p className="card-text">
                Please dispose of all organic food scraps in this bin. <br />
                <strong>Examples:</strong> Fruit peels, vegetable trimmings, and leftover food.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <img src={guidance2} alt="Degradable Waste Guidance" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Degradable Waste</h5>
              <p className="card-text">
                Use this bin for biodegradable items that can break down naturally. <br />
                <strong>Examples:</strong> Paper, cardboard, and garden waste like leaves and branches.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <img src={guidance3} alt="Non-Degradable Waste Guidance" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Non-Degradable Waste</h5>
              <p className="card-text">
                Place all non-recyclable items in this bin. <br />
                <strong>Examples:</strong> Plastic wrappers, broken electronics, and ceramic items.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="alert alert-warning mt-4" role="alert">
        <strong>Important:</strong> Proper waste segregation is mandatory. Ensuring that you dispose of waste in the correct bin helps maintain an efficient and eco-friendly collection system for everyone.
      </div>
    </div>
  );
}

export default Wasteguidance;
