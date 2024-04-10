import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AnonymyPage } from '../pages/AnonymyPage'

export const AnonymyRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <AnonymyPage /> } />

        <Route path='/*' element={ <Navigate to="/" /> }/>


    </Routes>
  )
}
