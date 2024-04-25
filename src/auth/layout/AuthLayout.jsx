import { HomeOutlined } from '@mui/icons-material';
import { Grid, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      {/* Botón en la esquina superior izquierda */}
      <IconButton
        component={Link}
        to="/"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'black', // Cambia el color según lo necesites
          zIndex: 1, // Asegura que esté encima del contenido
          backgroundColor: 'transparent', // Sin fondo
        }}
      >
        <HomeOutlined />
      </IconButton>

      <Grid>
        <img src="../src/assets/LogoAnonymy_Large.png" alt="Anonymy Logo" width="500" height="500" className='mb-2' />
      </Grid>

      <Grid
        item
        className='shadow-lg'
        xs={3}
        sx={{
          width: { sm: 450 },
          backgroundColor: '#9E9B98',
          padding: 3,
          borderRadius: 2,
          boxShadow: '2px 4px 8px rgba(1, 1, 1, 1)',
        }}
      >
        <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>
        {children}
      </Grid>
    </Grid>
  );
};
