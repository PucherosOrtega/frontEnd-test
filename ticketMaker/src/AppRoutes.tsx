import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './ticketMaker/pages/login/Login'
import { Home } from './ticketMaker/pages/home/Home'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            {/* <Route path='/*' element={ <Navigate to={'/login'} /> } /> */}
        </Routes>
    )
}
