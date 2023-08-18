import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const AuthGuard = ({ children }) => {
  const { isLoggedIn }  = useAuth();
  const navigate        =  useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default AuthGuard;
