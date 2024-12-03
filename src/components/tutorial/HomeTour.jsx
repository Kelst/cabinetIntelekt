import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';

const HomeTour = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRun(true);
      localStorage.setItem('hasSeenTour', 'true');
    }
  }, []);

  const [steps] = useState([
    {
      target: 'section > div > div > div',
      content: 'Вітаємо у вашому особистому кабінеті! Тут ви можете управляти всіма послугами',
      placement: 'center',
      disableBeacon: true
    },
    {
      target: '.grid > :nth-child(1)',
      content: 'Основна інформація про ваш акаунт - контакти, статус підключення та поточна сесія',
      placement: 'right'
    },
    {
      target: '.grid > :nth-child(2)',
      content: 'Фінансова інформація - баланс, кредит, абонплата та додаткові послуги',
      placement: 'left'
    },
    {
      target: '.grid > :nth-child(3)', 
      content: 'Технічні деталі підключення - тариф, швидкість, IP-адреса та статистика використання',
      placement: 'right'
    },
    {
      target: '.mt-8',
      content: 'Панель керування - зміна тарифу, додаткові послуги та налаштування акаунту',
      placement: 'top'
    }
  ]);

  return (
    <Joyride
      steps={steps}
      continuous
      showProgress
      showSkipButton
      run={run}
      spotlightPadding={0}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#ef4444',
          backgroundColor: '#000000',
          textColor: '#ffffff'
        }
      }}
    />
  );
};

export default HomeTour;