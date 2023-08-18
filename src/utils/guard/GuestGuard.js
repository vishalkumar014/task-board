import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const GuestGuard = ({ children }) => {
  const { isLoggedIn }  = useAuth();
  const navigate        =  useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default GuestGuard;
