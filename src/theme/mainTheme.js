import { createTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#a6a6a6'
        },
        secondary: {
            main: '#2f35e5'
        },
        error: {
            main: red.A400
        }
    }
})