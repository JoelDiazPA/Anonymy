import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { mainTheme } from './mainTheme'

export const AppTheme = ( { children } ) => {
  return (
    <ThemeProvider theme={ mainTheme }>
        <CssBaseline />

        { children }
    </ThemeProvider>
  )
}

