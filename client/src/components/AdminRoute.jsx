import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { auth } = useAuth();

  // If the user is logged in AND is an admin, let them through.
  if (auth && auth.isAdmin) {
    return children;
  }

  // If the user is logged in but NOT an admin, send them to Homepage.
  if (auth && !auth.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If the user is NOT logged in at all, send them to Login.
  return <Navigate to="/login" replace />;
};

export default AdminRoute;