import React from 'react';
import { AnonymyLayout } from '../layout/AnonymyLayout';
import { Button, Typography, Box, Container } from '@mui/material';
import { MessageOutlined, NewspaperOutlined, X } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const AnonymyPage = () => {
  return (
    <AnonymyLayout>
      <Container maxWidth="md">
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          minHeight="90vh"
          textAlign="center"
        >
          <Typography 
            variant="h2" 
            component="h1" 
            color="textPrimary" 
            gutterBottom
            className="text-blue-600 dark:text-white"
            sx={{ fontWeight: 'bold', marginBottom: 2 }}
          >
            Te damos la bienvenida a <a className='text-gray-400 dark:text-blue-200'>Anonymy</a>
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            color="textSecondary" 
            paragraph
            className='text-black dark:text-white'
            sx={{ marginBottom: 4 }}
          >
            La red social donde el anonimato es lo más importante.
            Conéctate, comparte y explora sin revelar tu identidad.
          </Typography>
          <Box 
            display="flex" 
            flexDirection="row" 
            justifyContent="center" 
            gap={2}
            sx={{ marginTop: 4 }}
          >
            <Button 
              variant="contained" 
              color="primary"
              component={Link} to="/general"
            >
              X Mode
              <X className='ml-2' />
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              component={Link} to="/chat"
            >
              Chat en Directo
              <MessageOutlined className='ml-2' />
            </Button>
          </Box>
        </Box>
      </Container>
    </AnonymyLayout>
  );
};
