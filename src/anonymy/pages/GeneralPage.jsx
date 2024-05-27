import React, { useEffect, useState } from 'react';
import { AnonymyLayout } from '../layout/AnonymyLayout';
import { IconButton, Typography, Avatar, Box, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { AnonymyModal } from '../components/AnonymyModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useAnonymyStore } from '../../hooks/useAnonymyStore';
import { format } from 'date-fns'; // Importa una librería para formatear fechas (opcional)

const Event = ({ text, user, image, responses, onAddResponse }) => {
  const [responseText, setResponseText] = useState('');

  const handleAddResponse = () => {
    onAddResponse(responseText);
    setResponseText('');
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: 1 }}>
          <Avatar sx={{ marginRight: 1 }}>{user.name.charAt(0)}</Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
        </Box>
        <Typography variant="body1">{text}</Typography>
        {image && (
          <CardMedia 
            component="img" 
            src={typeof image === 'string' ? image : ''} 
            alt="Event Image" 
            sx={{ mt: 1, width: 600, height: 300, objectFit: 'contain' }} 
          />
        )}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Comentarios ({responses.length}):</Typography>
          {responses.map((response, index) => (
            <Box key={index} sx={{ mt: 1, pl: 2, borderLeft: '1px solid gray' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
                <Typography variant="body2" sx={{ maxWidth: '80%' }}> {/* Limita el espacio del texto del comentario */}
                  <strong>{response.user.name}</strong>: {response.text}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.8em', color: 'gray', flexShrink: 0 }}> {/* Evita que la fecha se encoja */}
                  {format(new Date(response.date), 'dd/MM/yyyy HH:mm')}
                </Typography>
              </Box>
            </Box>
          ))}
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <TextField 
              value={responseText} 
              onChange={(e) => setResponseText(e.target.value)} 
              variant="outlined" 
              size="small" 
              fullWidth 
              placeholder="Añade un comentario..."
            />
            <Button onClick={handleAddResponse} variant="contained" sx={{ ml: 1 }}>Comentar</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Event;

export const GeneralPage = () => {
  const { openAnonymyModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents, startAddingResponse } = useAnonymyStore();

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
  };

  const onAddResponse = (eventId, responseText) => {
    startAddingResponse(eventId, responseText);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <AnonymyLayout>
      <Typography variant="h4" gutterBottom>General Page</Typography>

      <div className='p-4'>
        {events.map((event, index) => (
          <Event 
            key={index} 
            text={event.text} 
            user={event.user} 
            image={event.image} 
            responses={event.responses || []}
            onAddResponse={(responseText) => onAddResponse(event.id, responseText)}
          />
        ))}
        
        <IconButton
          onClick={handleClickNew}
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
};
