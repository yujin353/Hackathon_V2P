import React from 'react';
import { Navigate } from 'react-router-dom';
import IsLogIn from './IsLogin';

const PrivateRoute = ({children : Component}) => {
    const auth = IsLogIn(); // determine if authorized

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? Component : <Navigate to="/" />
}

export default PrivateRoute;