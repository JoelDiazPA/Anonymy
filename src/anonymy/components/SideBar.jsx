import { HomeRounded, Login, TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = ({ drawerWidth }) => {
  return (
    <Box
        component='nav'
        sx={{ width: { xs: 0, sm: drawerWidth }, flexShrink: { sm: 0 } }} // Modificamos aquí para ocultar en 'xs'
    >
        <Drawer
            variant='permanent' // temporary(para ocultarlo)
            open
            sx={{
                display: { xs: 'none', sm: 'block'}, // Modificamos aquí para ocultar en 'xs'
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    <img src="../src/assets/Anonymy_large_logo.png" alt='Logo_Anonymy'/>
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                <ListItem disablePadding
                    component={Link} to="/">
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeRounded />
                        </ListItemIcon>
                        <Grid container className='mr-1'>
                            <ListItemText primary='Home'/>
                        </Grid>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding
                    component={Link} to="/auth/login">
                    <ListItemButton>
                        <ListItemIcon>
                            <Login />
                        </ListItemIcon>
                        <Grid container className='mr-1'>
                            <ListItemText primary='Iniciar Sesión'/>
                        </Grid>
                    </ListItemButton>
                </ListItem>
                
            </List>

        </Drawer>

    </Box>
  )
}
