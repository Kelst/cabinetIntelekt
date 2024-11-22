import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import AddServiceMake from './AddServiceMake';
import useInfoStore from '../../store/infoStore';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AnimatedText = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

export default function AddService({ open, handleClose }) {
  const setShowCursor = useInfoStore(state => state.setShowCursor);
  const [openMakeService, setOpenMakeService] = useState(false);

  const handleShowDialog = () => {
    setOpenMakeService(true);
  };

  const handleCloseShowDialog = () => {
    setOpenMakeService(false);
  };

  useEffect(() => {
    setShowCursor(false);
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: '#f5f5f5',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle className="text-center text-3xl font-bold text-red-600 pb-4 border-b border-gray-300">
          Додаткові послуги
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="bg-white">
          <div className="p-6 space-y-6 text-gray-800">
            <AnimatedText delay={0.1}>
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                Вартість додаткових послуг Intelekt:
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <ul className="list-disc pl-6 space-y-2">
                <li>Налаштування роутерів, ТВ-приставок в офісах провайдера Intelekt – безкоштовно.</li>
                <li>Налаштування основного роутера технічним спеціалістом з виїздом до абонента – 200 грн.</li>
                <li>Підключення кабелем (до 10 м.) та налаштування ТВ-приставок, телевізорів технічним спеціалістом з виїздом до абонента – безкоштовно.</li>
                <li>Підключення послуги "Статична IP адреса" – 50 грн/міс.</li>
              </ul>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                Побудова та обслуговування локальних мереж абонента:
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <p className="mb-2">
                Перша година (оплата за транспортні витрати, компенсація оплати часу монтажників у дорозі, робота монтажників – у вартість включається робота монтажників від 1 хв. до 60 хв. у абонента) – 500 грн.
              </p>
              <p className="mb-2">
                Друга та наступні години – 300 грн./година. За межами м. Чернівці – додатково 10 грн. за 1 км. від м. Чернівці.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.5}>
              <p className="mt-6 font-semibold text-red-600">
                Якщо Ви бажаєте замовити додаткову послугу (виїзд майстра, тощо), скористайтесь кнопкою 'Продовжити' та слідуйте інструкціями !
              </p>
            </AnimatedText>
          </div>
        </DialogContent>
        <DialogActions className="bg-gray-100 p-4">
          <Button 
            onClick={handleShowDialog}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mr-2"
          >
            Продовжити
          </Button>
          <Button 
            onClick={() => { handleClose(); setShowCursor(true); }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Закрити
          </Button>
        </DialogActions>
      </Dialog>
      <AddServiceMake open={openMakeService} handleCloseService={handleClose} handleClose={handleCloseShowDialog} />
    </React.Fragment>
  );
}