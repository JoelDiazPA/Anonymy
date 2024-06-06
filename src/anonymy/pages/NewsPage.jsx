import { IconButton } from '@mui/material'
import React from 'react'
import { AnonymyLayout } from '../layout/AnonymyLayout'
import { AddRounded } from '@mui/icons-material'

export const NewsPage = () => {
  return (
    <AnonymyLayout>
      NewsPage

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'success.main',
          ':hover': { backgroundColor: 'success.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddRounded sx={{ fontSize: 30 }} />
      </IconButton>
      

    </AnonymyLayout>
    
  )
}
