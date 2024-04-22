import { Grid, Typography } from '@mui/material'
import React from 'react'

export const AuthLayout = ( {children, title = ''} ) => {
  return (
    <Grid 
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >
        <Grid>
          <img src="../src/assets/LogoAnonymy_Large.png" alt="Anonymy Logo" width="500" height="500" className='mb-2' />
        </Grid>

        <Grid 
            item
            className='shadow-lg'
            xs={3}
            sx={{ 
                width:{ sm: 450 },
                backgroundColor: '#9E9B98', 
                padding: 3, 
                borderRadius: 2,
                boxShadow: '2px 4px 8px rgba(1, 1, 1, 1)'
                }}>
                <Typography variant='h5'sx={{mb: 1}}>{title}</Typography>
        
                    {children}
        </Grid>

    </Grid>
  )
}
