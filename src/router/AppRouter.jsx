import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { AnonymyPage } from '../anonymy/pages/AnonymyPage'
import { useAuthStore } from '../hooks/useAuthStore'
import { AnonymyLayout } from '../anonymy/layout/AnonymyLayout'
import { AnonymyRoutes } from '../anonymy/routes/AnonymyRoutes'

export const AppRouter = () => {

  // const { status, checkAuthToken } = useAuthStore();

  const status = 'not-authenticated';

  // useEffect(() => {
  //   checkAuthToken();
  
  // }, [])
  

  if ( status === 'checking') {
    return (
      <h3>Cragando...</h3>
    )
  }

  return (
    <Routes>
      {
        ( status === 'not-authenticated')
          ? <Route path='/auth/*' element={ <AuthRoutes />}/>
          : <Route path='/*' element={ <AnonymyPage /> } />
      }

          <Route path='/auth/*' element={ <AuthRoutes />}/>
          <Route path='/*' element={ <AnonymyRoutes /> } />

    </Routes>
  )
}
