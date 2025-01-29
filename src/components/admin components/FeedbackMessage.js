import React from "react";
import "./FeedbackMessage.css";

const FeedbackMessage = () => {
  const feedbackData = [
    { id: 1, name: "John Doe", phone: "123-456-7890", rating: 5 },
    { id: 2, name: "Jane Smith", phone: "987-654-3210", rating: 4 },
    { id: 3, name: "Michael Johnson", phone: "456-789-0123", rating: 3 },
  ];

  return (
    <div className="feedback-container">
      <h2>Customer Feedback</h2>
      <div className="table-wrapper">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.name}</td>
                <td>{feedback.phone}</td>
                <td>{feedback.rating} ⭐</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackMessage;
