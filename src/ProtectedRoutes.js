import React, { useEffect } from 'react'
import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import {AuthContext} from './App'

const ProtectedRoutes = ({children}) => {

    const token = useContext(AuthContext)
    
    if(!token) {
        // alert('Please log in')
        return (
            <>
            <h3>Please Sign In</h3>
            <Navigate to='/' replace />
            </>
        ) 
    }
    return (
        children
    )
}

export default ProtectedRoutes
