import React, { useEffect, useState, useRef } from 'react';
import { AnonymyLayout } from '../layout/AnonymyLayout';
import { Typography, Avatar, Box, Card, CardContent, TextField, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { DeleteOutline, InsertPhoto } from '@mui/icons-material';
import { AnonymyModal } from '../components/AnonymyModal';
import { useAnonymyStore } from '../../hooks/useAnonymyStore';

const Event = ({ id, text, user, image, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: user.isCurrentUser ? 'row-reverse' : 'row', alignItems: 'flex-start', marginBottom: 2 }}>
      <Avatar sx={{ marginRight: user.isCurrentUser ? 0 : 1, marginLeft: user.isCurrentUser ? 1 : 0 }}>{user.name.charAt(0)}</Avatar>
      <Card variant="outlined" sx={{ maxWidth: '70%', backgroundColor: user.isCurrentUser ? '#dcf8c6' : '#ffffff' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
          <Typography variant="body1">{text}</Typography>
          {image && <Box component="img" src={image} alt="image" sx={{ width: '100%', marginTop: 1 }} />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Event;

export const ChatPage = () => {
  const { events, startLoadingEvents, startSavingEvent, startDeletingEvent } = useAnonymyStore();
  const [newMessage, setNewMessage] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      const newEvent = {
        text: newMessage,
        image: selectedMedia,
        user: { name: 'CurrentUser', isCurrentUser: true }
      };
      startSavingEvent(newEvent);
      setNewMessage('');
      setSelectedMedia(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const mediaURL = URL.createObjectURL(file);
    setSelectedMedia(mediaURL);
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleDeleteEvent = (id) => {
    startDeletingEvent(id);
  };

  return (
    <AnonymyLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(98vh - 64px)' }}>
        <Typography variant="h4" gutterBottom>Chat Page</Typography>
        <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
          {events.map((event) => (
            <Event 
              key={event.id} 
              id={event.id}
              text={event.text} 
              user={event.user} 
              image={event.image} 
              onDelete={handleDeleteEvent}
            />
          ))}
        </Box>
        <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', alignItems: 'center', padding: 2, borderTop: '1px solid #ccc' }}>
          <TextField 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            variant="outlined" 
            size="small" 
            placeholder="Escribe un mensaje..." 
            fullWidth 
          />
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
      <AnonymyModal tituloPage="ChatPage" />
    </AnonymyLayout>
  );
};
