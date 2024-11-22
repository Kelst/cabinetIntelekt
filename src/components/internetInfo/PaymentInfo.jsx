import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard as CardIcon,
  DollarSign as BalanceIcon,
  Calendar as CreditDateIcon,
  RefreshCw as MonthlyIcon,
  Percent as PercentS,
  Clock as LastPaymentIcon,
  Package
} from 'lucide-react';
import MysteriousText from '../MysteriousText/MysteriousText';
import CountdownTimer from '../сountdownTimer/CountdownTimer';
import useStore from '../../store/store';
import { Pause } from 'lucide-react';

const iconVariants = {
  animate: {
    rotateY: [0, 10, 0, -10, 0],
    rotateX: [0, 5, 10, 5, 0],
    filter: ["brightness(1)", "brightness(1.2)", "brightness(1.4)", "brightness(1.2)", "brightness(1)"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const PaymentInfo = ({ style }) => {
   const user = useStore(state => state.userData);

  const InfoItem = ({ icon: Icon, label, value, children }) => (
    <div className="flex items-center py-3 border-b border-gray-700 last:border-b-0">
      <motion.div
        className="mr-3 perspective-400"
        variants={iconVariants}
        animate="animate"
      >
        <Icon className="w-5 h-5 flex-shrink-0 text-gray-400" />
      </motion.div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
        <span className="text-sm text-gray-400 sm:text-base sm:mr-4">{label}</span>
        <span className="font-medium text-gray-200 mt-1 sm:mt-0">{value}</span>
      </div>
      {children}
    </div>
  );
  const AdditionalServices = ({ addServicePrice }) => {
    const iconVariants = {
      animate: {
        rotateY: [0, 10, 0, -10, 0],
        rotateX: [0, 5, 10, 5, 0],
        filter: ["brightness(1)", "brightness(1.2)", "brightness(1.4)", "brightness(1.2)", "brightness(1)"],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };
  
    return (
      <div className="flex flex-col py-3 border-b border-gray-700 last:border-b-0 bg-gradient-to-r from-red-900/20 to-transparent hover:from-red-800/30 transition-all duration-300">
        <div className="flex items-center mb-2">
          <motion.div
            className="mr-3 perspective-400"
            variants={iconVariants}
            animate="animate"
          >
            
            <Package className="w-5 h-5 flex-shrink-0 text-red-400" />
          </motion.div>
          <span className="text-sm text-gray-400 sm:text-base">Додаткові послуги</span>
        </div>
        
        <div className="ml-8 space-y-2">
          {addServicePrice?.services.length > 0 ? (
            <>
              {addServicePrice.services.map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{service.name}</span>
                  <span className="text-red-300">{service.price} грн</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <span className="text-sm font-medium text-gray-400">Загалом</span>
                <span className="font-medium text-red-300">{addServicePrice.total_price} грн</span>
              </div>
            </>
          ) : (
            <span className="text-sm text-gray-500 italic">Додаткові послуги відсутні</span>
          )}
        </div>
      </div>
    );
  };
  const PayButton = () => (
    <NavLink to="/payment" className="mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto">
      <div className={`${style.animationBorderSM} cursor-pointer relative inline-flex items-center justify-center p-3 px-5 overflow-hidden font-medium text-sm transition duration-300 ease-out border-2 rounded-full group w-full sm:w-auto`}>
        <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
          Оплатити
        </span>
        <span className="relative invisible">Оплатити</span>
      </div>
    </NavLink>
  );

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  }

  return (
    <div className={`bg-black  p-4 sm:p-6 rounded-md shadow-md ${style.animationBorder}`}>
      <h2 className="text-xl font-bold mb-4 sm:mb-6 text-red-500 flex items-center">
        <motion.div
          className="mr-2 perspective-400"
          variants={iconVariants}
          animate="animate"
        >
          <CardIcon className="w-6 h-6" />
        </motion.div>
        <MysteriousText>Оплата</MysteriousText>
      </h2>
      <div className="space-y-2 sm:space-y-0">
        <InfoItem icon={BalanceIcon} label="Стан рахунку" value={`${user?.balance} грн.`} />
        <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-700">
          <InfoItem icon={CardIcon} label="Кредит" value={`${user?.deposit} грн.`} />
          <InfoItem icon={CreditDateIcon} label="Кредит до" value={formatDate(user?.dateOfEndCredits)=='1899-11-29'?'0000-00-00':formatDate(user?.dateOfEndCredits)} />
        </div>
        <InfoItem 
          icon={MonthlyIcon} 
          label="Місячна оплата" 
          value={`${user?.payAll} грн.`}
        >
          <PayButton />
        </InfoItem>
        <InfoItem 
          icon={PercentS} 
          label="Знижка" 
          value={`${user?.reduction} %`}
        >
        </InfoItem>
        <div className="pt-3">
          {
           user?.status? <CountdownTimer />:<div className="flex items-center justify-center p-4 bg-red-100 rounded-lg shadow-md animate-pulse">
           <Pause className="w-6 h-6 text-red-500 mr-2 animate-bounce" />
           <span className="text-red-700 font-semibold text-lg">
             Послугу призупинено
           </span>
         </div>

          }
          <AdditionalServices addServicePrice={user?.addServicePrice} />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;