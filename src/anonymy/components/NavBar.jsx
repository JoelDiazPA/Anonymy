import { LogoutRounded, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = ( {drawerWidth = 240} ) => {
  return (
    <AppBar
        position='fixed'
        sx={{
            width:{ sm: `calc(100% - ${ drawerWidth }px)`},
            ml: { sm: `${ drawerWidth }px` }
        }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}
                
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> AnonymyApp </Typography>

                    <IconButton color='error'
                        component={Link} to="./auth/login">
                        <LogoutRounded />
                    </IconButton>

                </Grid>


            </Toolbar>
    </AppBar>
  )
}