import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  return !!token ? children : <Navigate replace to='/login' />;
}
export default React.memo(PrivateRoute)