import axios from 'axios';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Update the URL to match the format '/api/verify'
        const response = await axios.get('http://localhost:5002/api/verify', {
          withCredentials: true, // Ensure cookies (session) are included in the request
        });
        
        // Update the user state with the response data
        setUser(response.data.user); 
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
