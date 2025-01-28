import { Navigate } from 'react-router-dom';
import useAdminAuth from '../hooks/adminAuth'; // Import your custom hook

const AdminProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while verifying
  }

  if (!admin) {
    return <Navigate to="/admin-login" replace />; // Redirect if not authenticated
  }

  return children; // Render children if authenticated
};

export default AdminProtectedRoute;
