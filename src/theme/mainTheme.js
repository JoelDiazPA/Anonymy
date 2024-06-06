import { createTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#E1DCE0',
            dark: '#686461',
        },
        secondary: {
            main: '#BACBDB',
            dark: '#425161'
        },
        success: {
            main: '#CEAD6D',
            dark: ''
        },
        error: {
            main: red.A400
        }
    }
})