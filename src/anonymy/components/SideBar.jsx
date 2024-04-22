import { ThemeProvider } from "@emotion/react";
import { mainTheme } from "../../theme/mainTheme";
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DarkModeOutlined, HomeRounded, Login, MusicNoteOutlined, NewspaperOutlined, TurnedInNot } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { NavBar } from './NavBar'; // Importa el componente NavBar

export const SideBar = ({ drawerWidth }) => {
    const [theme, setTheme] = useState(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }
    }, [theme]);

    const handleChangeTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={mainTheme}>
            <Box
                component='nav'
                sx={{ width: { xs: 0, sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant='permanent'
                    open
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: theme === 'dark' ? mainTheme.palette.primary.dark : mainTheme.palette.primary.main,
                        }
                    }}
                >
                    <Toolbar>
                        <Typography variant='h6' noWrap component='div'>
                            <img src="../src/assets/LogoAnonymy_Large.png" alt='Logo_Anonymy'/>
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                        <ListItem disablePadding component={Link} to="/">
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeRounded />
                                </ListItemIcon>
                                <Grid container className='mr-1'>
                                    <ListItemText primary='Home'/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding component={Link} to="/news">
                            <ListItemButton>
                                <ListItemIcon>
                                    <NewspaperOutlined />
                                </ListItemIcon>
                                <Grid container className='mr-1'>
                                    <ListItemText primary='Noticias'/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding component={Link} to="/music">
                            <ListItemButton>
                                <ListItemIcon>
                                    <MusicNoteOutlined />
                                </ListItemIcon>
                                <Grid container className='mr-1'>
                                    <ListItemText primary='Música'/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding component={Link} to="/auth/login">
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

                    {/* Box agregado para estar en la parte baja de la página */}
                    <Box sx={{ position: 'absolute', bottom: 0, width: '100%', marginBottom: 5 }}>
                        <Typography variant="body2" align="center" color="textSecondary">
                            <button
                                onClick={handleChangeTheme}
                            >
                                <DarkModeOutlined />
                            </button> 
                        </Typography>
                        <div className="text-red-500 dark:text-blue-500">
                            prueba
                        </div>
                    </Box>
                </Drawer>
            </Box>
            <NavBar drawerWidth={drawerWidth} theme={theme} /> {/* Pasar el tema como prop a NavBar */}
        </ThemeProvider>
    );
};
