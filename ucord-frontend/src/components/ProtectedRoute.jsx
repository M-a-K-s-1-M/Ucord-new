import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ children }) => {
    const accessToken = AuthService.getAccessToken();
    const refreshToken = AuthService.getRefreshToken();

    const isAuthenticated = !!accessToken && !!refreshToken;

    return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;