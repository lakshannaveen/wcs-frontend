import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Send a GET request to your API for session verification
        const response = await fetch('http://localhost:5002/api/users/verify', {
          method: 'GET',
          credentials: 'include', // Ensures cookies (JWT in cookie) are included
        });

        if (!response.ok) {
          throw new Error('Session verification failed');
        }

        const data = await response.json(); // Parse the response data
        setUser(data.user); // Update the user state with the response
      } catch (error) {
        console.error('Session verification failed:', error);
        setUser(null); // Clear user state if session is invalid
      } finally {
        setLoading(false); // Stop loading once session check is complete
      }
    };

    checkSession(); // Run the session verification when the component mounts
  }, []); // Empty dependency array means this effect runs once on component mount

  return { user, loading }; // Return user and loading state to the components
};

export default useAuth;
