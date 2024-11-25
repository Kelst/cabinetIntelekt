import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi as WifiIcon,
  Zap as SpeedIcon,
  DollarSign as PriceIcon,
  Globe as IpIcon,
  Clock as DurationIcon,
  ArrowUp as UploadIcon,
  ArrowDown as DownloadIcon
} from 'lucide-react';
import MysteriousText from '../MysteriousText/MysteriousText';
import useStore from '../../store/store';
import CancelStaticIpButton from '../сancelStaticIpButton/CancelStaticIpButton';

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

const InfoItem = ({ icon: Icon, label, value }) => (
  <motion.div 
    className="flex items-center py-3 border-b border-gray-700 last:border-b-0"
    whileHover={{ 
      x: 5,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      transition: { duration: 0.2 }
    }}
  >
    <motion.div 
      className="mr-3 perspective-400"
      variants={iconVariants}
      animate="animate"
    >
      <Icon className="w-5 h-5 flex-shrink-0 text-gray-400" />
    </motion.div>
    <motion.div 
      className={`flex flex-col ${label === 'Тарифний план' ? 'sm:flex-col' : 'sm:flex-row'} sm:justify-between sm:items-center w-full`}
      whileHover={{ color: "#6366f1" }}
    >
      <span className="text-sm text-gray-400 sm:text-base sm:mr-4">{label}</span>
      <motion.span 
        className="font-medium text-gray-200 mt-1 sm:mt-0"
        whileHover={{ scale: 1.05 }}
      >
        {value || 'N/A'}
      </motion.span>
    </motion.div>
  </motion.div>
);

const InternetInfo = ({ style }) => {
  const user = useStore(state => state.userData);

  const extractTariffInfo = (tariff) => {
    if (!tariff) return { speed: 'N/A', price: 'N/A' };
    const match = tariff.match(/(\d+)\((\d+)\)/);
    return {
      speed: match ? `${match[1]} Mбіт` : 'N/A',
      price: match ? `${match[2]} грн.` : 'N/A'
    };
  };

  const tariffInfo = extractTariffInfo(user?.tariff);
  const isStaticIp = useStore(state => state.user.isStaticIp);

  return (
    <motion.div 
      className={`bg-black p-4 sm:p-6 rounded-md shadow-md ${style.animationBorder}`}
      whileHover={{ boxShadow: "0 0 15px rgba(255, 0, 0, 0.3)" }}
    >
      <h2 className="text-xl font-bold mb-4 sm:mb-6 text-red-500 flex items-center">
        <motion.div 
          className="mr-2 perspective-400"
          variants={iconVariants}
          animate="animate"
        >
          <WifiIcon className="w-6 h-6" />
        </motion.div>
        <MysteriousText>Інтернет</MysteriousText>
      </h2>
      <div className="space-y-2 sm:space-y-0">
        <InfoItem icon={WifiIcon} label="Тарифний план" value={user?.tariff} />
        <InfoItem icon={SpeedIcon} label="Швидкість" value={tariffInfo.speed} />
        <InfoItem icon={PriceIcon} label="Ціна" value={tariffInfo.price} />
        <InfoItem icon={IpIcon} label="IP" value={user?.ip} />
        {isStaticIp && <CancelStaticIpButton/>}
        <InfoItem icon={DurationIcon} label="Тривалість" value={user?.duration} />
        <InfoItem icon={UploadIcon} label="Відправлено" value={`${user?.sendData} GB`} />
        <InfoItem icon={DownloadIcon} label="Отримано" value={`${user?.getData} GB`} />
      </div>
    </motion.div>
  );
};

export default InternetInfo;