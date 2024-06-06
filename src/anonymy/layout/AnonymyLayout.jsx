import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { SideBar } from '../components/SideBar';
import { NavBar } from '../components/NavBar';
import { mainTheme } from '../../theme/mainTheme'

const drawerWidth = 240;

export const AnonymyLayout = ({ children, theme }) => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>

            <NavBar drawerWidth={drawerWidth} />

            <SideBar drawerWidth={drawerWidth} />

            <div
                className={`bg-gray-200 dark:bg-gray-700`}
                style={{
                    flexGrow: 1,
                    padding: 3,
                    overflowY: 'auto', // Agregar overflow-y para permitir desplazamiento vertical si el contenido excede la altura de la ventana
                }}
            >
                <Toolbar />

                {children}

            </div>

        </Box>
    )
}
