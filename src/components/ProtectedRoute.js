import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Import your custom authentication hook

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Get authentication state and loading state

  // Show a loading indicator while the authentication status is being determined
  if (loading) {
    return <div>Loading...</div>; // Replace with your preferred loading spinner or message
  }

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render children or outlet if the user is authenticated
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
