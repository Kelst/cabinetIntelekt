import React from 'react';
import useInfoStore from '../../store/infoStore';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const CustomAlert = () => {
  const open = useInfoStore(state => state.openAlert);
  const message = useInfoStore(state => state.messageAlert);
  const type = useInfoStore(state => state.typeAlert);
  const handleClose = useInfoStore(state => state.hideAllert);

  const getAlertStyle = () => {
    const baseStyle = {
      width: '100%',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '12px 24px',
      position: 'relative',
      overflow: 'hidden',
    };

    const typeStyles = {
      0: { // error
        backgroundColor: '#FEE2E2',
        color: '#DC2626',
        border: '1px solid #FCA5A5',
      },
      1: { // info
        backgroundColor: '#E0F2FE',
        color: '#0284C7',
        border: '1px solid #7DD3FC',
      },
      2: { // success
        backgroundColor: '#DCFCE7',
        color: '#16A34A',
        border: '1px solid #86EFAC',
      },
    };

    return {
      ...baseStyle,
      ...typeStyles[type],
    };
  };

  const getAlertTitle = () => {
    const titles = {
      0: 'Помилка',
      1: 'Інформація',
      2: 'Успішно',
    };
    return titles[type];
  };

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={3000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={motion.div}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Alert
          onClose={handleClose}
          severity={type == 0 ? 'error' : type == 1 ? 'info' : 'success'}
          sx={getAlertStyle()}
          icon={
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              {type == 0 ? '⚠️' : type == 1 ? 'ℹ️' : '✅'}
            </motion.div>
          }
        >
          <AlertTitle sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {getAlertTitle()}
          </AlertTitle>
          {message}
        </Alert>
      </motion.div>
    </Snackbar>
  );
};

export default CustomAlert;