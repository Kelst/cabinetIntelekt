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

  const desktopSteps = [
    {
      target: '.container',
      content: 'Вітаємо, в оновленому кабінеті абонента! Кілька кроків для ознайомлення!',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.grid > div:first-child',
      content: 'Основна інформація про ваш акаунт:\nТелефон - ваш контактний номер з можливістю редагування\nАдреса - місце надання послуг\nСтан з\'єднання - Active/Inactive з можливістю перезавантаження сесії\nMAC - поточна адреса пристрою\nСтатус - активний/призупинений\nПароль - з можливістю зміни',
      placement: 'right',
    },
    {
      target: '.grid > div:nth-child(2)',
      content: 'Фінансова інформація:\nСтан рахунку - поточний баланс\nКредит та термін його дії\nМісячна абонплата\nЗнижки якщо є\nДодаткові послуги та їх вартість\nМожливість швидкої оплати\nТаймер до наступного списання коштів',
      placement: 'left',
    },
    {
      target: '.grid > div:nth-child(3)',
      content: 'Технічні деталі підключення:\nПоточний тарифний план\nМаксимальна швидкість\nВартість тарифу\nIP-адреса з можливістю отримання статичної\nТривалість поточної сесії\nСтатистика відправлених та отриманих даних',
      placement: 'right',
    },
    {
      target: '.grid + .mt-8',
      content: 'Панель керування:\nОчищення MAC-адреси\nВстановлення кредиту\nУправління додатковими послугами\nНалаштування статичної IP\nЗміна тарифного плану\nВідв\'язка особистого кабінету\nВихід з кабінету',
      placement: 'top',
    }
  ];

  const mobileSteps = [
    {
      target: '.lg\\:hidden',
      content: 'Вітаємо, в оновленому кабінеті абонента! Кілька кроків для ознайомлення!',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.lg\\:hidden .gap-y-6 > div:first-of-type',
      content: 'Основна інформація про ваш акаунт:\n\nТелефон - ваш контактний номер з можливістю редагування\n\nАдреса - місце надання послуг\n\nСтан з\'єднання - Active/Inactive з можливістю перезавантаження сесії\n\nMAC - поточна адреса пристрою\n\nСтатус - активний/призупинений\n\nПароль - з можливістю зміни',
      placement: 'bottom',
    },
    {
      target: '.lg\\:hidden .gap-y-6 > div:nth-of-type(2)',
      content: 'Фінансова інформація:\n\nСтан рахунку - поточний баланс\n\nКредит та термін його дії\n\nМісячна абонплата\n\nЗнижки якщо є\n\nДодаткові послуги та їх вартість\n\nМожливість швидкої оплати\n\nТаймер до наступного списання коштів',
      placement: 'bottom',
    },
    {
      target: '.lg\\:hidden .gap-y-6 > div:nth-of-type(3)',
      content: 'Технічні деталі підключення:\n\nПоточний тарифний план\n\nМаксимальна швидкість\n\nВартість тарифу\n\nIP-адреса з можливістю отримання статичної\n\nТривалість поточної сесії\n\nСтатистика відправлених та отриманих даних',
      placement: 'bottom',
    },
    {
      target: '.lg\\:hidden .gap-y-6 > div:nth-of-type(4)',
      content: 'Панель керування:\n\nОчищення MAC-адреси\n\nВстановлення кредиту\n\nУправління додатковими послугами\n\nНалаштування статичної IP\n\nЗміна тарифного плану\n\nВідв\'язка особистого кабінету\n\nВихід з кабінету',
      placement: 'top',
    }
  ];


  return (
    <>
      <div className="fixed top-[80px] left-5 z-[10000000]">
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
            maxWidth: isMobile ? '300px' : '400px',
            whiteSpace: 'pre-line',
            textAlign: 'left'  // Added this line for left alignment
          },
          tooltipContent: {
            padding: isMobile ? '8px' : '12px',
            textAlign: 'left'  // Added this line for left alignment
          },
          tooltipTitle: {
            textAlign: 'left'  // Added this line for left alignment of titles
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
        locale={{
          skip: "Пропустити",
          next: "далі",
          back: "Назад",
          last: "Завершити",
          nextLabelWithProgress: 'Далі (Крок {step} із {steps})',
        }}
      />
    </>
  );
};

export default HomeTour;