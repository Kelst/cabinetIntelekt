import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, TextField, Typography, Button, IconButton, Tooltip, Box } from '@mui/material';
import { Headset, X, MessageSquare } from 'lucide-react';
import InputMask from 'react-input-mask';
import ContactInfoButton from '../сontactInfoButton/ContactInfoButton';
import useInfoStore from '../../store/infoStore';
import useStore from '../../store/store';

const FeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const addFeedBackU = useStore(state => state.addFeedBackU);
  const user = useStore(state => state.user);
  const setLoader = useInfoStore(store => store.setLoader);
  const showAllert = useInfoStore(state => state.showAllert);
  
  const isValidPhone = phone.replace(/[^0-9]/g, '').length === 12;
async function  handleFeedback (){
// //phone message sublogin ['login1','login2','login3']//
// login,phone,message,sublogin
try {
  setLoader(true);
  const sublogin=user.subLogin.map(e=>e.login)
  const result = await addFeedBackU(user.login, phone, message,sublogin);
  if (result.status) {
    showAllert(2, 'Ваше звернення прийняте !');
  } else {
    showAllert(0, 'Вибачте виникла помилка під час залишення звернення');
  }
} catch (error) {
  showAllert(2, "Виникла непередбачена помилка"+error);
} finally {
  setMessage('')
  setPhone('')
  setLoader(false);
  setIsOpen(false);

}
}
  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.3 }
    }
  };

  const closeIconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 90,
      scale: 1.2,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <motion.div
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        className="fixed top-[164px] right-[42px] z-50"
      >
        <Tooltip 
          title="Зворотній зв'язок" 
          placement="left"
          sx={{
            '& .MuiTooltip-tooltip': {
              bgcolor: '#ff1744',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(255, 23, 68, 0.5)',
              borderRadius: '4px',
              padding: '6px 12px'
            }
          }}
        >
          <IconButton 
            onClick={() =>{ setIsOpen(true) ;setPhone(''),setMessage('')}}
            sx={{ 
              bgcolor: '#ff1744',
              color: 'white',
              '&:hover': { bgcolor: '#ff4569' },
              boxShadow: '0 0 20px rgba(255, 23, 68, 0.5)'
            }}
          >
            <Headset size={28} />
          </IconButton>
        </Tooltip>
      </motion.div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 40px 20px rgba(255, 23, 68, 0.1)',
            position: 'relative',
            p: 3
          }
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)'
          }
        }}
      >
        {/* Close Button */}

        <motion.div
          className="absolute top-4 right-4"
          variants={closeIconVariants}
          initial="initial"
          whileHover="hover"
        >
          
          <IconButton 
            onClick={() => setIsOpen(false)}
            sx={{ 
              color: 'grey.500',
              '&:hover': { 
                color: '#ff1744',
                transform: 'rotate(90deg)',
                transition: 'all 0.3s'
              }
            }}
          >
            <X size={24} />
          </IconButton>
        </motion.div>

        {/* Title and User Info */}
        <Box className="mb-6">
          <Typography 
            sx={{ 
              color: '#ff1744', 
              fontWeight: 600, 
              fontSize: '1.5rem',
              mb: 2
            }}
          >
            Зворотній зв'язок
            <ContactInfoButton />

          </Typography>
          <Box className="flex items-center gap-2">
            <MessageSquare size={24} color="#ff1744" />
            <Typography sx={{ color: '#ff1744', fontWeight: 500, fontSize: '1.25rem' }}>
              vlad_b_1
            </Typography>
          </Box>
        </Box>

        {/* Form Fields */}
        <Box className="space-y-4">
          <InputMask
            mask="+380 99 999 99 99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          >
            {() => (
              <TextField
                fullWidth
                label="Номер телефону"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#666666',
                    backgroundColor: '#FFFFFF',
                    '& fieldset': {
                      borderColor: 'rgba(255, 23, 68, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff4569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff1744',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                    '&.Mui-focused': {
                      color: '#ff1744'
                    }
                  },
                }}
              />
            )}
          </InputMask>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Ваше звернення"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#666666',
                backgroundColor: '#FFFFFF',
                '& fieldset': {
                  borderColor: 'rgba(255, 23, 68, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: '#ff4569',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff1744',
                }
              },
              '& .MuiInputLabel-root': {
                color: '#666666',
                '&.Mui-focused': {
                  color: '#ff1744'
                }
              },
            }}
          />

          <motion.div
            whileHover={isValidPhone ? { scale: 1.02 } : {}}
            whileTap={isValidPhone ? { scale: 0.98 } : {}}
          >
            <Button
              fullWidth
              variant="contained"
              disabled={!isValidPhone}
              onClick={handleFeedback}
              sx={{
                bgcolor: '#ff1744',
                color: 'white',
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                borderRadius: '28px',
                '&:hover': {
                  bgcolor: '#ff4569'
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(255, 23, 68, 0.3)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }
              }}
            >
              Надіслати
            </Button>
          </motion.div>
        </Box>
      </Dialog>
    </>
  );
};

export default FeedbackModal;