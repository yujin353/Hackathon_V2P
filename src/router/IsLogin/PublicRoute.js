import React from 'react';
import { Navigate } from 'react-router-dom';
import IsLogIn from './IsLogin';

const PublicRoute = ({children : Component}) => {
    const auth = IsLogIn(); // determine if authorized

    // If authorized, return element that will navigate to main page
    // If not, return an outlet that will render child elements
    return auth ? <Navigate to="/main" /> : Component
}

export default PublicRoute;