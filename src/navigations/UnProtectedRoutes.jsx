import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../screens/Login'

const UnProtectedRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Login />} />
    </Routes>
  )
}

export default UnProtectedRoutes