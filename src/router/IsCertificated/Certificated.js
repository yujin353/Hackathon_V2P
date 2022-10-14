import React from 'react';
import { Navigate } from 'react-router-dom';
import IsCertificated from './IsCertificated';

const Certificated = ({ children: Component }) => {
    const cert = IsCertificated(); // determine if authorized

    // If authorized, return a component that will render child element
    // If not, return element that will navigate to login page
    return cert ? Component : <Navigate to="/login" />
}

export default Certificated;