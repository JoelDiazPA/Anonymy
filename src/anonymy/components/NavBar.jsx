import { LogoutRounded, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { mainTheme } from '../../theme/mainTheme'
import { useAuthStore } from '../../hooks/useAuthStore'

export const NavBar = ({ drawerWidth = 240, theme }) => {

    const { startLogout, user } = useAuthStore();


    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backgroundColor: theme === 'dark' ? mainTheme.palette.primary.dark : mainTheme.palette.primary.main,
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
                    <Typography className='dark:text-white' variant='h6' noWrap component='div'> Bienvenido/a { user.name } </Typography>

                    <IconButton 
                        color='error' 
                        component={Link} to="./auth/login"
                        onClick={ startLogout }
                        >
                        <LogoutRounded />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
