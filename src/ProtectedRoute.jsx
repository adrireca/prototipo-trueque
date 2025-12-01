import { useAuth } from './context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>

    if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  return (
    <Outlet />
  )
}
