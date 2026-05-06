import { Navigate } from 'react-router-dom';
import Login from './Login';

export default function LoginGate() {
  if (localStorage.getItem('token')) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Login />;
}
