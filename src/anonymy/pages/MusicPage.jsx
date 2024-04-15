import React from 'react'
import { AnonymyLayout } from '../layout/AnonymyLayout'
import { IconButton } from '@mui/material'
import { AddRounded } from '@mui/icons-material'

export const MusicPage = () => {
    return (
      <AnonymyLayout>
        MusicPage
  
        <IconButton
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'secondary.main',
            ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
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
