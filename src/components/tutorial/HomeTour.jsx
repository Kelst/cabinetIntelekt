import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';
import { HelpCircle } from 'lucide-react';

const HomeTour = () => {
  const [run, setRun] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRun(true);
      localStorage.setItem('hasSeenTour', 'true');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStartTour = () => {
    setRun(true);
  };

  const handleTourCallback = (data) => {
    const { status } = data;
    if (['finished', 'skipped'].includes(status)) {
      setRun(false);
    }
  };

  // Залишаємо десктопні кроки без змін
  const desktopSteps = [
    {
      target: '.container',
      content: 'Вітаємо у вашому особистому кабінеті! Тут ви можете управляти всіма послугами',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.grid > div:first-child',
      content: 'Основна інформація про ваш акаунт: \n\n• Телефон - ваш контактний номер з можливістю редагування \n• Адреса - місце надання послуг \n• Стан з\'єднання - Active/Inactive з можливістю перезавантаження сесії \n• MAC - поточна адреса пристрою \n• Статус - активний/призупинений \n• Пароль - з можливістю зміни',
      placement: 'right',
    },
    {
      target: '.grid > div:nth-child(2)',
      content: 'Фінансова інформація: \n\n• Стан рахунку - поточний баланс \n• Кредит та термін його дії \n• Місячна абонплата \n• Знижки якщо є \n• Додаткові послуги та їх вартість \n• Можливість швидкої оплати \n• Таймер до наступного списання коштів',
      placement: 'left',
    },
    {
      target: '.grid > div:nth-child(3)',
      content: 'Технічні деталі підключення: \n\n• Поточний тарифний план \n• Максимальна швидкість \n• Вартість тарифу \n• IP-адреса з можливістю отримання статичної \n• Тривалість поточної сесії \n• Статистика відправлених та отриманих даних',
      placement: 'right',
    },
    {
      target: '.grid + .mt-8',
      content: 'Панель керування: \n\n• Очищення MAC-адреси \n• Встановлення кредиту \n• Управління додатковими послугами \n• Налаштування статичної IP \n• Зміна тарифного плану \n• Відв\'язка особистого кабінету \n• Вихід з кабінету',
      placement: 'top',
    }
  ];

  // Оновлюємо мобільні кроки з більш точними селекторами
  const mobileSteps = [
    {
      target: '.lg\\:hidden',
      content: 'Вітаємо у вашому особистому кабінеті! Тут ви можете управляти всіма послугами',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.lg\\:hidden .gap-y-6 > div:first-of-type',
      content: 'Основна інформація про ваш акаунт: \n\n• Телефон - ваш контактний номер з можливістю редагування \n• Адреса - місце надання послуг \n• Стан з\'єднання - Active/Inactive з можливістю перезавантаження сесії \n• MAC - поточна адреса пристрою \n• Статус - активний/призупинений \n• Пароль - з можливістю зміни',
      placement: 'bottom',
    },
    {
      target: '.lg\\:hidden .gap-y-6 > div:nth-of-type(2)',
      content: 'Фінансова інформація: \n\n• Стан рахунку - поточний баланс \n• Кредит та термін його дії \n• Місячна абонплата \n• Знижки якщо є \n• Додаткові послуги та їх вартість \n• Можливість швидкої оплати \n• Таймер до наступного списання коштів',
      placement: 'bottom',
    },
    {
      target: '.lg\\:hidden .gap-y-6 > div:nth-of-type(3)',
      content: 'Технічні деталі підключення: \n\n• Поточний тарифний план \n• Максимальна швидкість \n• Вартість тарифу \n• IP-адреса з можливістю отримання статичної \n• Тривалість поточної сесії \n• Статистика відправлених та отриманих даних',
      placement: 'bottom',
    },
    {
      target: '.lg\\:hidden .gap-y-6 > div:nth-of-type(4)',
      content: 'Панель керування: \n\n• Очищення MAC-адреси \n• Встановлення кредиту \n• Управління додатковими послугами \n• Налаштування статичної IP \n• Зміна тарифного плану \n• Відв\'язка особистого кабінету \n• Вихід з кабінету',
      placement: 'top',
    }
  ];

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative">
          <button
            className="p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            onClick={handleStartTour}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </button>
          
          {showTooltip && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-900 text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                Запустити туторіал
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
          )}
        </div>
      </div>

      <Joyride
        steps={isMobile ? mobileSteps : desktopSteps}
        continuous
        showProgress
        showSkipButton
        run={run}
        callback={handleTourCallback}
        spotlightPadding={8}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#ef4444',
            backgroundColor: '#000000',
            textColor: '#ffffff',
            arrowColor: '#000000',
            overlayColor: 'rgba(0, 0, 0, 0.5)'
          },
          tooltip: {
            fontSize: isMobile ? '14px' : '16px',
            padding: isMobile ? '12px' : '16px',
            maxWidth: isMobile ? '300px' : '400px'
          },
          tooltipContent: {
            padding: isMobile ? '8px' : '12px'
          },
          buttonNext: {
            backgroundColor: '#ef4444'
          },
          buttonBack: {
            color: '#ef4444'
          }
        }}
        floaterProps={{
          disableAnimation: true
        }}
      />
    </>
  );
};

export default HomeTour;