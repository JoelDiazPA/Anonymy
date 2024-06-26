import { Google } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

export const LoginPage = () => {

  const { startLogin, startAnonymousLogin, errorMessage } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const anonymSubmit = (event) => {
    event.preventDefault();
    startAnonymousLogin();
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);


  return (
    
    <AuthLayout title='Inicia Sesión'>
      <form onSubmit={loginSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='email'
              placeholder='Correo@google.com'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }}
              name='loginEmail'
              value={loginEmail}
              onChange={onLoginInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='password'
              placeholder='Contraseña'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }}
              name='loginPassword'
              value={loginPassword}
              onChange={onLoginInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button variant='contained' fullWidth type="submit">
                Iniciar Sesión
              </Button>
            </Grid>
          </Grid>

          <Grid className='underline' container direction='row' justifyContent='end'>
            <Link color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>

      <form onSubmit={anonymSubmit} className='mt-10'>
        <Typography variant='h5' sx={{ textAlign: 'center' }}>Inicia Sesión como ANÓNIMO</Typography>
        <Grid container>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button variant='contained' fullWidth type='submit'>
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
