import React from 'react';
import { AnonymyLayout } from '../layout/AnonymyLayout';
import { IconButton, Typography, Avatar, Box, Card, CardContent } from '@mui/material';
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
      {image && <CardMedia component="img" src={image} alt="Event Image" sx={{ mt: 1 }} />} {/* Asegúrate de que image exista antes de mostrarla */}
    </CardContent>
  </Card>
);

export const GeneralPage = () => {

  const { openAnonymyModal } = useUiStore();
  const { events, setActiveEvent } = useAnonymyStore();

  // LÓGICA BOTON
  const handleClickNew = () => {
    setActiveEvent({
      text: '',
      image: null,
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

  return (
    <AnonymyLayout>
      <Typography variant="h4" gutterBottom>General Page</Typography>
      
      {/* Renderizando los eventos */}
      {events.map((event, index) => (
        <Event key={index} text={event.text} user={event.user} onSelect={onSelect} />
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
    </AnonymyLayout>
  );
}
