import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AnonymyPage } from '../pages/AnonymyPage'
import { NewsPage } from '../pages/NewsPage'
import { MusicPage } from '../pages/MusicPage'

export const AnonymyRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <AnonymyPage /> } />

        <Route path='/news' element={ <NewsPage /> } />

        <Route path='/music' element={ <MusicPage /> } />

        <Route path='/*' element={ <Navigate to="/" /> }/>


    </Routes>
  )
}
