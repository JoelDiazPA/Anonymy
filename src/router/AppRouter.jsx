import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnonymyRoutes } from '../anonymy/routes/AnonymyRoutes'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route path='/auth/*' element={ <AuthRoutes />}/>

        {/* AnonymyApp */}
        <Route path='/*' element={ <AnonymyRoutes /> }/>

    </Routes>
  )
}
