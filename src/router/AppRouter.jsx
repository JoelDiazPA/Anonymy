import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { AnonymyPage } from '../anonymy/pages/AnonymyPage'
import { useAuthStore } from '../hooks/useAuthStore'
import { AnonymyLayout } from '../anonymy/layout/AnonymyLayout'
import { AnonymyRoutes } from '../anonymy/routes/AnonymyRoutes'
import { LoginPage } from '../auth/pages/LoginPage'

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])
  

  if ( status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
    {
      (status === 'non-authenticated')
        ? (
          <>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/*' element={<Navigate to="/auth/login" />} />
          </>
        )
        : (
          <>
            <Route path='/*' element={<AnonymyRoutes />} />
            <Route path='/auth/*' element={<Navigate to="/" />} />
          </>
        )
    }
    </Routes>
  )
}
