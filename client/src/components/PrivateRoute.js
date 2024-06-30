import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../firebaseAuth/AuthContext';

//Reference: https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
function PrivateRoute() {
    const { currentUser } = useAuth();

    return (
        currentUser ?  <Outlet /> : <Navigate to="/Connect" />
    );
}

export default PrivateRoute;
