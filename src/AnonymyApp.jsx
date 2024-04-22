import React, { useState } from 'react'
import { AppTheme } from './theme/AppTheme'
import { AppRouter } from './router/AppRouter'

export const AnonymyApp = () => {

  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  )
}
