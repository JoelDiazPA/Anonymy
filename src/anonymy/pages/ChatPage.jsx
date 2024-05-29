import React, { useEffect, useState, useRef } from 'react';
import { AnonymyLayout } from '../layout/AnonymyLayout';
import { Typography, Avatar, Box, Card, CardContent, TextField, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { DeleteOutline, InsertPhoto } from '@mui/icons-material';
import { AnonymyModal } from '../components/AnonymyModal';
import { useAnonymyStore } from '../../hooks/useAnonymyStore';

const Message = ({ id, text, user, image, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: user.isCurrentUser ? 'row-reverse' : 'row', alignItems: 'flex-start', marginBottom: 2 }}>
      <Avatar sx={{ marginRight: user.isCurrentUser ? 0 : 1, marginLeft: user.isCurrentUser ? 1 : 0 }}>{user.name.charAt(0)}</Avatar>
      <Card variant="outlined" sx={{ maxWidth: '70%', backgroundColor: user.isCurrentUser ? '#dcf8c6' : '#ffffff' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
          <Typography variant="body1">{text}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Event;

export const ChatPage = () => {
  const { events, startLoadingEvents, startSavingEvent } = useAnonymyStore();
  const [newMessage, setNewMessage] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    startLoadingEvents();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [events]);

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

  return (
    <AnonymyLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(98vh - 64px)' }}>
        <div className='flex' >
        <Typography variant="h5" gutterBottom className='text-black dark:text-white'> Chat En Directo</Typography>
        <span className="blink_me mt-3 ml-3"></span>
        </div>
        <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
          {events.map((event) => (
            <Message 
              key={event.id} 
              id={event.id}
              text={event.text} 
              user={event.user} 
              image={event.image} 
            />
          ))}
          <div ref={messagesEndRef} />
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
            <SendIcon className='text-black dark:text-white' />
          </IconButton>
        </Box>
      </Box>
      <AnonymyModal tituloPage="ChatPage" />
    </AnonymyLayout>
  );
};
