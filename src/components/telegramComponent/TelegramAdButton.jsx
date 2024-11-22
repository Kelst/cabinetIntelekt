import React from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, 
         DialogContentText, Button, Box, List, 
         ListItem, ListItemIcon, ListItemText, ThemeProvider, createTheme,
         IconButton } from '@mui/material';
import { keyframes } from '@mui/system';
import TelegramIcon from '@mui/icons-material/Telegram';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 23, 68, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(255, 23, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 23, 68, 0);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const theme = createTheme({
  palette: {
    primary: { main: '#ff1744' },
    background: { paper: '#ffffff' },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
});

const TelegramAdButton = () => {
  const [open, setOpen] = React.useState(false);
  const [isRotating, setIsRotating] = React.useState(false);

  const handleHover = () => {
    setIsRotating(true);
  };

  const handleHoverEnd = () => {
    setIsRotating(false);
  };

  const benefits = [
    {
      icon: <NotificationsActiveIcon sx={{ color: '#ff1744' }} />,
      text: 'Миттєві сповіщення про акції та знижки'
    },
    {
      icon: <AutoAwesomeIcon sx={{ color: '#ff1744' }} />,
      text: 'Персональні пропозиції та рекомендації'
    },
    {
      icon: <SupportAgentIcon sx={{ color: '#ff1744' }} />,
      text: 'Цілодобова підтримка 24/7'
    },
    {
      icon: <CheckCircleOutlineIcon sx={{ color: '#ff1744' }} />,
      text: 'Розширені можливості та функції'
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Fab
        sx={{
          position: 'fixed',
          top: 96,
          right: 36,
          zIndex: 20,
          bgcolor: '#ff1744',
          color: 'white',
          animation: `${pulse} 2s infinite`,
          '& .MuiSvgIcon-root': {
            animation: isRotating ? `${rotate} 2s infinite linear` : 'none',
          },
          '&:hover': {
            bgcolor: '#ff4569',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s'
        }}
        onClick={() => setOpen(true)}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
      >
        <TelegramIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            position: 'relative'
          }
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
            '&:hover': {
              color: '#ff1744',
              transform: 'rotate(90deg)',
              transition: 'all 0.3s'
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: '#ff1744',
          pt: 3,
          pr: 6
        }}>
          Приєднуйтесь до нашого Telegram-боту!
        </DialogTitle>
        
        <DialogContent>
          <List>
            {benefits.map((benefit, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {benefit.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={benefit.text}
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      color: '#000000'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>

          <DialogContentText sx={{ 
            textAlign: 'center', 
            my: 2,
            color: '#666666'
          }}>
            Будьте на зв'язку та отримуйте найсвіжіші новини та пропозиції першими!
          </DialogContentText>

          <Box sx={{ textAlign: 'center', mt: 3, mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<TelegramIcon />}
              href="https://t.me/intelekt_client_bot"
              target="_blank"
              sx={{
                borderRadius: '28px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                bgcolor: '#ff1744',
                '&:hover': {
                  bgcolor: '#ff4569'
                }
              }}
            >
              Підключитися до боту
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default TelegramAdButton;