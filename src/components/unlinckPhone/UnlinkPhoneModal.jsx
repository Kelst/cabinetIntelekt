import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/store';

const style = {
  backdrop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 0,
    outline: 'none',
    mx: 2, // додаємо відступи з боків для мобільних пристроїв
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'divider',
    p: 2,
  },
  closeButton: {
    color: 'grey.500',
    '&:hover': {
      color: 'error.main',
    },
  },
  content: {
    p: 2,
  },
};

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const UnlinkPhoneModal = ({ open, onClose, accounts = [] }) => {
  const handleUnlink = (account) => {
    console.log('Unlinking phone from account:', account);
    onClose();
  };
  const user = useStore(state => state.userData);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={style.backdrop}
    >
      <MotionBox
        sx={style.modal}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <Box sx={style.header}>
          <Typography variant="h6" component="h2">
            Відв'язка номеру телефону
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            component={motion.button}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
            sx={style.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={style.content}>
          <AnimatePresence mode="wait">
            {user.subLogin.map((account, index) => (
              <MotionPaper
                key={account.uid}
                elevation={0}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ opacity: 0, x: 50 }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 0, 0, 0.05)',
                  transition: { duration: 0.2 }
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  mb: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">
                    {account.login}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {account.uid}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleUnlink(account)}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Відв'язати
                </Button>
              </MotionPaper>
            ))}
          </AnimatePresence>
        </Box>
      </MotionBox>
    </Modal>
  );
};

export default UnlinkPhoneModal;