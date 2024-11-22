import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { motion } from 'framer-motion';
import TextAnimation from '../TextAnimation/TextAnimation';
import useStore from '../../store/store';
import ContactInfoButton from '../сontactInfoButton/ContactInfoButton';
import { RandomAvatar } from '../icons/RandomAvatar';
import useInfoStore from '../../store/infoStore';
import TelegramAdButton from '../telegramComponent/TelegramAdButton';

const UserHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const user = useStore(state => state.userData);
  const getData = useStore(state => state.getData);
  const logIn = useStore(state => state.logIn);
  const setLoader = useInfoStore(store => store.setLoader);
  const showAllert = useInfoStore(state => state.showAllert);

  const handleSwitchUser = async (loginData) => {
    let result;
    try {
      setLoader(true);
      result = await logIn(loginData.login, loginData.password);
      await getData(loginData.uid);
    } catch (error) {
      console.log("switch error", error);
    } finally {
      if (result?.flag) {
        showAllert(2, "Логін змінено");
      }
      setLoader(false);
    }
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  const nameAnimation = useSpring({
    color: isHovered ? '#8B0000' : '#EF4444',
    transform: `perspective(600px) rotateX(${isHovered ? '20deg' : '0deg'})`,
    config: { mass: 5, tension: 350, friction: 40 }
  });

  const renderLoginGallery = () => {
    if (!user.subLogin || user.subLogin.length === 0) {
      return (
        <div className="flex justify-center items-center mt-4">
          <span className="px-6 py-2.5 text-base font-medium bg-white bg-opacity-90 backdrop-blur-md 
                        rounded-xl shadow-lg text-gray-900 border-2 border-red-400">
            {user.login}
          </span>
        </div>
      );
    }

    const leftLogins = user.subLogin.slice(0, Math.floor(user.subLogin.length / 2));
    const rightLogins = user.subLogin.slice(Math.floor(user.subLogin.length / 2));

    return (
      <div className="flex justify-center items-center gap-4 mt-4 overflow-x-auto py-2">
        {/* Ліві логіни */}
        <div className="flex gap-2">
          {leftLogins.map((login, index) => (
            <button
              key={`left-${index}`}
              onClick={() => handleSwitchUser(login)}
              className="px-3 py-1.5 text-sm bg-white bg-opacity-70 backdrop-blur-sm rounded-lg 
                       shadow-md hover:bg-opacity-90 transition-all duration-300 
                       text-gray-700 hover:text-gray-900 transform hover:scale-105"
            >
              {login.login}
            </button>
          ))}
        </div>

        {/* Поточний логін */}
        <span className="px-6 py-2.5 text-base font-medium bg-white bg-opacity-90 backdrop-blur-md 
                      rounded-xl shadow-lg text-gray-900 border-2 border-red-400">
          {user.login}
        </span>

        {/* Праві логіни */}
        <div className="flex gap-2">
          {rightLogins.map((login, index) => (
            <button
              key={`right-${index}`}
              onClick={() => handleSwitchUser(login)}
              className="px-3 py-1.5 text-sm bg-white bg-opacity-70 backdrop-blur-sm rounded-lg 
                       shadow-md hover:bg-opacity-90 transition-all duration-300 
                       text-gray-700 hover:text-gray-900 transform hover:scale-105"
            >
              {login.login}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <animated.div style={fadeIn} className="mb-8 text-center">
      <div className="p-8 rounded-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ContactInfoButton />
          <animated.h1
            className="text-4xl font-bold mb-4 text-shadow-lg flex justify-center gap-2"
            style={nameAnimation}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <TextAnimation text={user.name || 'Ім\'я користувача недоступне'} />
            <RandomAvatar userId={user.uid} />
          </animated.h1>
        </motion.div>

        <div>
          {renderLoginGallery()}
        </div>
      </div>
    </animated.div>
  );
};

export default UserHeader;