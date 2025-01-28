import { useEffect, useState } from 'react';

const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/admin/protected-route', {
          method: 'GET',
          credentials: 'include', // Include cookies (JWT or session tokens)
        });

        if (!response.ok) {
          throw new Error('Failed to verify admin session');
        }

        const data = await response.json();
        setAdmin(data.admin); // Assume the API returns { admin: true } for valid sessions
      } catch (error) {
        console.error('Error verifying admin session:', error);
        setAdmin(null);
        setError('Admin authentication failed!');
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();
  }, []);

  return { admin, loading, error };
};

export default useAdminAuth;
