import React from 'react';
import { Navigate } from 'react-router-dom';
import IsPolicyChecked from './IsPolicyChecked';

const PolicyChecked = ({ children: Component }) => {
    const policy = IsPolicyChecked(); // determine if authorized

    // If authorized, return a compnent that will render child element
    // If not, return element that will navigate to login page
    return policy ? Component : <Navigate to="/login" />
}

export default PolicyChecked;