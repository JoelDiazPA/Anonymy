import React, { useState } from 'react'
import { AppTheme } from './theme/AppTheme'
import { AppRouter } from './router/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'

export const AnonymyApp = () => {

  return (
    <>
    <Provider store={ store }>
      <AppTheme>
        <AppRouter />
      </AppTheme>
      </Provider>
    </>
  )
}
