import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    let authToken = localStorage.getItem('authTokens')
    return (
        authToken !== null ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute