import React, { useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';

const registerFormFields = {
  register: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const RegisterPage = () => {

  const { errorMessage, startRegister } = useAuthStore();
  const { register, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

  const registerSubmit = (event) => {
    event.preventDefault();
    if ( registerPassword !== registerPassword2 ) {
      Swal.fire('Error en el registro', 'Las Contraseñas no coinciden', 'error')
      return;
    }
    startRegister({ name: register, email: registerEmail, password: registerPassword, registerPassword2 });
  }

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  
  }, [errorMessage])


  return (
    <AuthLayout title='Regístrate'>
      <form onSubmit={registerSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='text'
              placeholder='Nombre de Usuario'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }}
              name='register'
              value={register}
              onChange={onRegisterInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='email'
              placeholder='Correo@google.com'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }}
              name='registerEmail'
              value={registerEmail}
              onChange={onRegisterInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='password'
              placeholder='Contraseña'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }}
              name='registerPassword'
              value={registerPassword}
              onChange={onRegisterInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='password'
              placeholder='Repita la Contraseña'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }}
              name='registerPassword2'
              value={registerPassword2}
              onChange={onRegisterInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth type="submit">
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link className='underline' color='inherit' to='/auth/login'>
              Ingresa
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
