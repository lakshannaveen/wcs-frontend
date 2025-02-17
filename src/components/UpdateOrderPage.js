import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateOrderPage = () => {
  const { checkoutId } = useParams(); // Get the checkoutId from the URL

  return (
    <div>
      <h1>Welcome to Update Order Page</h1>
      <p><strong>Checkout ID:</strong> {checkoutId}</p> {/* Display the checkoutId */}
    </div>
  );
};

export default UpdateOrderPage;
