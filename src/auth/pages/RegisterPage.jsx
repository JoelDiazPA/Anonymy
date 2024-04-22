import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout title='Regístrate'>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='text'
              placeholder='Nombre Completo'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }} // Cambia el borde aquí
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='email'
              placeholder='Correo@google.com'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }} // Cambia el borde aquí
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              type='password'
              placeholder='Contraseña'
              fullWidth
              sx={{ border: '1px solid', borderRadius: '5px' }} // Cambia el borde aquí
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth>
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
  )
}
