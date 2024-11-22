import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const numberVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(/api/placeholder/1920/1080)` }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-8 w-[400px] h-[350px] md:w-[500px] flex justify-center items-center rounded-lg 
                   shadow-xl bg-black/70 backdrop-blur-sm flex-col"
      >
        <motion.p 
          className="text-white text-[66px] font-bold text-center font-[Nosifer]"
          variants={numberVariants}
          initial="initial"
          animate="animate"
        >
          {error.status?.toString().slice(0,1)}
          <motion.span 
            className="mx-2 inline-block text-[75px] text-[#dd8232] font-[Nosifer]"
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              transition: { 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {error?.status?.toString().slice(1,2)}
          </motion.span>
          {error?.status?.toString().slice(-1)}
        </motion.p>

        <div className="text-center">
          <motion.p 
            className="text-white font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Вибачте, але сторінку не знайдено
          </motion.p>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/')}
            className="text-white bg-[#dd8232] px-8 py-4 rounded-lg font-bold 
                     hover:bg-[#c97729] transition-colors duration-200"
          >
            ПОВЕРНУТИСЬ НА ГОЛОВНУ
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;