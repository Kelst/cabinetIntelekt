import React from 'react';
import { 
  Settings as SettingsIcon,
  HelpCircle as HelpIcon
} from 'lucide-react';
import MysteriousText from '../MysteriousText/MysteriousText';
import GlasmorphizmButton from '../button/glasmorphizm/GlasmorphizmButton';
import useStore from '../../store/store';
import useConfigPage from '../../store/configPage';

const LoginManagement = ({ 
  style, 
  setControllPanelDialog, 
  handleClearMac, 
  handleSetCredit, 
  handleAddService, 
  handleDisplayTariff, 
  handleOpenStaticIp
}) => {
  const isStaticIp = useStore(state => state.user.isStaticIp);
  const ipStatic = useStore(state => state.user.ip);
  const configCabinet = useConfigPage(state => state.configCabinet);

  const actions = [
    { 
      label: 'Очистити MAC', 
      action: handleClearMac 
    },
    { 
      label: 'Встановити кредит', 
      action: handleSetCredit,
      disabled: false // приклад, тут можна додати умову
    },
    { 
      label: 'Додаткові послуги', 
      action: handleAddService 
    },
    { 
      label: 'Статична IP', 
      action: handleOpenStaticIp,
      disabled: isStaticIp?true:false // приклад
    },
    { 
      label: 'Тарифні плани', 
      action: handleDisplayTariff 
    },
  ];
  

  return (
    <div className={`mt-8 bg-black p-4 sm:p-6 rounded-md shadow-md ${style.animationBorder}`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl font-bold text-red-500 flex items-center">
          <SettingsIcon className="w-6 h-6 mr-2" />
          <MysteriousText>Керування</MysteriousText>
        </h2>
        <HelpIcon 
          onClick={() => setControllPanelDialog(true)} 
          className="w-6 h-6 text-gray-400 hover:text-gray-200 cursor-help transform hover:scale-110 transition-transform duration-200"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 custom-grid gap-2 sm:gap-4">
    
{actions.map((action, index) => {
  const shouldShow = {
    'Очистити MAC': configCabinet.home.clearMac,
    'Встановити кредит': configCabinet.home.setCredit,
    'Додаткові послуги': configCabinet.home.additionalService,
    'Статична IP': configCabinet.home.staticIp,
    'Тарифні плани': configCabinet.home.tariffPlans
  }[action.label];
console.log(shouldShow,"shouldShow");
console.log(configCabinet.home,"!!!!");

  return shouldShow ? (
    <div key={index} className="w-full">
      <GlasmorphizmButton 
        handleAction={action.action}
        label={action.label}
        disabled={action.disabled}
        disabledReason={action.disabled ? `Ви вже використовуєте статичну IP: ${ipStatic}` : ""}
        className="w-full h-full min-h-[40px] text-sm whitespace-normal"
      />
    </div>
  ) : null;
})}

      </div>
    </div>
  );
};

export default LoginManagement;