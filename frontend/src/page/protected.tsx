import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }:any) {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Check expiration
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() < payload.exp * 1000;
    } catch {
      return false;
    }
  };

  return isAuthenticated() ? children : <Navigate to="/login" />;
}
export default ProtectedRoute;