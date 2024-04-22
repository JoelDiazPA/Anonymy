import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {
  return (
    <AuthLayout title='Inicia Sesión'>
      <form>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                  type='email' 
                  placeholder='Correo@google.com'
                  fullWidth
                  sx={{ border: '1px solid', borderRadius: '5px' }} // Cambia el borde aquí
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                  type='password' 
                  placeholder='Contraseña'
                  fullWidth
                  sx={{ border: '1px solid', borderRadius: '5px' }} // Cambia el borde aquí
                  />
              </Grid>

              <Grid container spacing={ 2 } sx={{mb: 2, mt: 1}}>
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button variant='contained' fullWidth>
                    Ingresar
                  </Button>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button variant='contained' fullWidth>
                    <Google />
                      <Typography sx={{ml: 1}} >Google</Typography>
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

          <form className='mt-10'>
            <Typography variant='h5'sx={{mb: 1}}>Inicia Sesión como ANÓNIMO</Typography>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                  type='name' 
                  placeholder='Nombre de Usuario'
                  fullWidth
                  sx={{ border: '1px solid ', borderRadius: '5px' }} // Cambia el borde aquí
                  />
              </Grid>

              <Grid container spacing={ 2 } sx={{mb: 2, mt: 1}}>
                <Grid item xs={ 12 } sm={ 12 }>
                  <Button variant='contained' fullWidth>
                    Ingresar
                  </Button>
                </Grid>

              </Grid>

            </Grid>
          </form>

    </AuthLayout>


        
  )
}
