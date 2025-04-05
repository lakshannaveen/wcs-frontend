import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./Wasteguidance.css";

// Importing images
import guidance1 from "../images/guidance1.jpg";
import guidance2 from "../images/guidance2.jpg";
import guidance3 from "../images/guidance3.jpg";

function Wasteguidance() {
  const { theme } = useTheme();

  return (
    <div className={`waste-guidance-page ${theme}`}>
      <div className={`container my-4 ${theme}`}>
        <h2 className={`text-center mb-4 ${theme}`}>Waste Separation Guidance</h2>
        <div className="row gy-4">
          <div className="col-md-4 col-sm-12">
            <div className={`card shadow-sm h-100 ${theme}`}>
              <img
                src={guidance1}
                alt="Food Waste Guidance"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className={`card-title ${theme}`}>Food Waste</h5>
                <p className={`card-text ${theme}`}>
                  It is mandatory to dispose of all organic food scraps separately in this bin for collection. <br />
                  <strong>Examples:</strong> Fruit peels, vegetable trimmings, and leftover food.
                </p>
                <p className={`card-text text-danger ${theme}`}><strong>Important:</strong> Please ensure that food waste is separated from other waste before disposal.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className={`card shadow-sm h-100 ${theme}`}>
              <img
                src={guidance2}
                alt="Degradable Waste Guidance"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className={`card-title ${theme}`}>Degradable Waste</h5>
                <p className={`card-text ${theme}`}>
                  It is mandatory to dispose of all biodegradable items separately in this bin for collection. <br />
                  <strong>Examples:</strong> Paper, cardboard, and garden waste like leaves and branches.
                </p>
                <p className={`card-text text-danger ${theme}`}><strong>Important:</strong> Please ensure that degradable waste is separated from other waste before disposal.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className={`card shadow-sm h-100 ${theme}`}>
              <img
                src={guidance3}
                alt="Non-Degradable Waste Guidance"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className={`card-title ${theme}`}>Non-Degradable Waste</h5>
                <p className={`card-text ${theme}`}>
                  It is mandatory to dispose of all non-recyclable items separately in this bin for collection. <br />
                  <strong>Examples:</strong> Plastic wrappers, broken electronics, and ceramic items.
                </p>
                <p className={`card-text text-danger ${theme}`}><strong>Important:</strong> Please ensure that non-degradable waste is separated from other waste before disposal.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`alert alert-warning mt-4 ${theme}`} role="alert">
          <strong>Important:</strong> Proper waste segregation is mandatory. You must dispose of waste separately in the correct bin. <br />
          If waste is not separated, we will not be able to collect it. This helps maintain an efficient and eco-friendly collection system for everyone.
        </div>
      </div>
    </div>
  );
}

export default Wasteguidance;