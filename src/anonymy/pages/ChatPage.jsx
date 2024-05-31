import React, { useEffect, useState, useRef } from 'react';
import { AnonymyLayout } from '../layout/AnonymyLayout';
import { Typography, Avatar, Box, Card, CardContent, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { AnonymyModal } from '../components/AnonymyModal';
import { useChatStore } from '../../hooks/useChatStore';
import { useSelector } from 'react-redux';

const Message = ({ id, text, user }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: user.isCurrentUser ? 'row-reverse' : 'row', 
      alignItems: 'flex-start', 
      marginBottom: 2 
    }}>
      <Avatar sx={{ 
        marginRight: user.isCurrentUser ? 0 : 1, 
        marginLeft: user.isCurrentUser ? 1 : 0 
      }}>
        {user.name.charAt(0)}
      </Avatar>
      <Card variant="outlined" sx={{ 
        maxWidth: '70%', 
        backgroundColor: user.isCurrentUser ? '#dcf8c6' : '#ffffff' 
      }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {user.name}
          </Typography>
          <Typography variant="body1">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export const ChatPage = () => {
  const { messages, startLoadingMessages, startSavingMessage } = useChatStore();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Obtener el usuario actual del estado de autenticación
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    startLoadingMessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      const newMessageData = {
        text: newMessage,
        user: { name: user.name, isCurrentUser: true } // Ajusta esto según tu lógica de usuario actual
      };
      startSavingMessage(newMessageData);
      setNewMessage('');
    }
  };

  return (
    <AnonymyLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(98vh - 64px)' }}>
        <div className='flex bg-gray-300 dark:bg-gray-800'>
          <Typography variant="h5" gutterBottom className='p-2 text-black dark:text-white'>Chat En Directo</Typography>
          <span className="blink_me mt-5 ml-3"></span>
        </div>
        <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
          {messages.map((message) => (
            <Message 
              key={message.id} 
              id={message.id}
              text={message.text} 
              user={{ 
                ...message.user, 
                isCurrentUser: message.user.name === user.name 
              }} 
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
            InputProps={{
              style: { backgroundColor: '#ffffff', color: '#000000' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#000000',
                },
              },
              '& .MuiInputBase-input': {
                color: '#000000',
              }
            }}
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
