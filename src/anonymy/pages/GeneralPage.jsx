import React, { useEffect } from 'react';
import { AnonymyLayout } from '../layout/AnonymyLayout';
import { IconButton, Typography, Avatar, Box, Card, CardContent, CardMedia } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { AnonymyModal } from '../components/AnonymyModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useAnonymyStore } from '../../hooks/useAnonymyStore';

const Event = ({ text, user, image, onSelect }) => (
  <Card variant="outlined" sx={{ marginBottom: 2 }} onClick={() => onSelect({ text, user, image })}>
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 1,
        }}
      >
        <Avatar sx={{ marginRight: 1 }}>{user.name.charAt(0)}</Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
      </Box>
      <Typography variant="body1">{text}</Typography>
      {/* Verifica si la URL de la imagen está disponible */}
      {image && (
        <CardMedia 
          component="img" 
          src={typeof image === 'string' ? image : ''} 
          alt="Event Image" 
          sx={{ 
            mt: 1,
            width: 600, // Ancho predeterminado
            height: 300, // Altura predeterminada
            objectFit: 'contain' // Para ajustar la imagen al tamaño definido sin deformarla
          }} 
        />
      )}
    </CardContent>
  </Card>
);

export const GeneralPage = () => {
  const { openAnonymyModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useAnonymyStore();

  // LÓGICA BOTON
  const handleClickNew = () => {
    setActiveEvent({
      text: '',
      image: null, // Asegurar que la imagen se establezca como null
      user: {
        _id: '123',
        name: 'Joel'
      }
    });
    openAnonymyModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
    openAnonymyModal(); // Abre el modal cuando se selecciona un evento
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <AnonymyLayout>
      <Typography variant="h4" gutterBottom>General Page</Typography>

      <div className='p-4'>
        {/* Renderizando los eventos */}
        {events.map((event, index) => (
          <Event key={index} text={event.text} user={event.user} image={event.image} onSelect={() => onSelect(event)} />
        ))}
        
        <IconButton
          onClick={ handleClickNew }
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'success.main',
            ':hover': { backgroundColor: 'success.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50,
          }}
        >
          <AddRounded sx={{ fontSize: 30 }} />
        </IconButton>

        <AnonymyModal tituloPage="GeneralPage"/>
      </div>
    </AnonymyLayout>
  );
}
