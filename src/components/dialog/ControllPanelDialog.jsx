import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import useConfigPage from '../../store/configPage';

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

const HelpSection = ({ title, content, delay }) => (
  <AnimatedText delay={delay}>
    <h2 className="text-2xl font-semibold text-blue-600 mb-2">{title}</h2>
    <p className="leading-relaxed text-gray-700 mb-4">{content}</p>
  </AnimatedText>
);

const helpSections = [
  {
    title: 'Очистити MAC',
    content: 'Видалити MAC-адресу поточного пристрою, щоб ви могли підключити новий, наприклад, при заміні роутера.',
  },
  {
    title: 'Встановити кредит',
    content: 'Якщо ви не встигли оплатити інтернет, у вас є можливість продовжити його дію на 5 днів.',
  },
  {
    title: 'Додаткові послуги',
    content: 'Ви можете залишити заявку на додаткові послуги, налаштування мережі, роутера, підключення пристроїв кабелем, та інше.',
  },
  {
    title: 'Статична IP',
    content: 'Незмінна IP-адреса для підключення до інтернету. Це означає, що кожного разу, коли ви підключаєтеся до мережі, вам присвоюється одна й та сама IP-адреса.',
  },
  {
    title: 'Тарифні плани',
    content: 'Ви можете вибрати для себе оптимальний тарифний план який вам доступний.',
  },
];

export default function ControlPanelDialog({ open, handleClose }) {
  const configCabinet = useConfigPage(state => state.configCabinet);
  return (
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
      <DialogTitle className="text-center text-3xl font-bold text-blue-600 pb-4 border-b border-gray-300">
        Довідка
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
        {helpSections.map((section, index) => {
 const shouldShow = {
   'Очистити MAC': configCabinet.home.clearMac,
   'Встановити кредит': configCabinet.home.setCredit,
   'Додаткові послуги': configCabinet.home.additionalService,
   'Статична IP': configCabinet.home.staticIp,
   'Тарифні плани': configCabinet.home.tariffPlans
 }[section.title];

 return shouldShow ? (
   <HelpSection 
     key={index} 
     title={section.title} 
     content={section.content} 
     delay={0.1 * (index + 1)}
   />
 ) : null;
})}
        </div>
      </DialogContent>
      <DialogActions className="bg-gray-100 p-4">
        <Button 
          onClick={handleClose}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Зрозуміло
        </Button>
      </DialogActions>
    </Dialog>
  );
}