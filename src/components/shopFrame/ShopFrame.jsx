import React from 'react';
import useStore from '../../store/store';

const ShopFrame = () => {
  const user = useStore(state => state.user);
  const baseUrl = "https://shop-int-telegram.pp.ua/";
  
  // Створюємо об'єкт з параметрами
  const params = new URLSearchParams({
    uid: user.uid || '',
    phone: user.phone || '',
    telegramId: user.telegramId || '',
    login:user.login
  }).toString();

  const fullUrl = `${baseUrl}?${params}`;

  return (
    <div className="w-full h-screen">
      <iframe 
        src={fullUrl}
        className="w-full h-full border-0"
        title="Intelekt Shop"
      />
    </div>
  );
};

export default ShopFrame;