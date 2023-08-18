import { useRoutes } from 'react-router-dom';
import GuestGuard from '../utils/guard/GuestGuard' 
import GuestLayout from '../layout/GuestLayout'
import AuthGuard  from '../utils/guard/AuthGuard'
import AuthLayout from '../layout/AuthLayout'
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Board from '../components/board/Board'
import Dashboard from  '../components/board/Dashboard'

export default function ThemeRoutes() {
  return useRoutes([
    {
        path: '/',
        element: (
            <GuestGuard>
                <GuestLayout />
            </GuestGuard>
        ),
        children: [
            {
                path: '',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    },
    {
        path: '/',
        element: (
            <AuthGuard>
                <AuthLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'board/:id',
                element: <Board />
            }
        ]
        
    },

  ]);
}