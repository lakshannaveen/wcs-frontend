import React, { useState, useEffect } from "react";
import "./FeedbackMessage.css";

const FeedbackMessage = () => {
  const [feedbackData, setFeedbackData] = useState([]); // State to store feedback data
  const [loading, setLoading] = useState(true); // Loading state for API request

  // Fetch feedback data from the API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/feedback/feedback'); // API URL updated
        if (response.ok) {
          const data = await response.json();
          setFeedbackData(data.feedbacks); // Assuming the response structure has 'feedbacks'
        } else {
          console.error('Failed to fetch feedback data');
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="feedback-container">
      <h2>Customer Feedback</h2>
      {loading ? (
        <p>Loading...</p> // Display loading message while fetching data
      ) : (
        <div className="table-wrapper">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Feedback Message</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((feedback) => (
                <tr key={feedback.id}>
                  <td>{feedback.first_name}</td> {/* Display first name */}
                  <td>{feedback.last_name}</td>  {/* Display last name */}
                  <td>{feedback.email}</td>      {/* Display email */}
                  <td>{feedback.feedback}</td>   {/* Display feedback message */}
                  <td>{feedback.rating} ⭐</td>  {/* Display rating */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackMessage;
