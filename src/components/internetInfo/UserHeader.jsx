import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { motion } from 'framer-motion';
import TextAnimation from '../TextAnimation/TextAnimation';
import useStore from '../../store/store';
import ContactInfoButton from '../сontactInfoButton/ContactInfoButton';
import { RandomAvatar } from '../icons/RandomAvatar';
import useInfoStore from '../../store/infoStore';
import HomeTour from '../tutorial/HomeTour';

const UserHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [allLogins, setAllLogins] = useState([]);
  const user = useStore(state => state.userData);
  const getData = useStore(state => state.getData);
  const logIn = useStore(state => state.logIn);
  const setLoader = useInfoStore(store => store.setLoader);
  const showAllert = useInfoStore(state => state.showAllert);

  useEffect(() => {
    if (user?.subLogin) {
      setAllLogins(prev => {
        const allUsers = [...prev, user, ...user.subLogin];
        const uniqueUsers = Array.from(
          new Map(allUsers.map(item => [item.uid, item])).values()
        );
        return uniqueUsers.sort((a, b) => a.login.localeCompare(b.login));
      });
    }
  }, [user?.subLogin]);

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
        showAllert(2, `Обліковий запис ${loginData.login}`);
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
    if (!allLogins.length) {
      return (
        <div className="flex justify-center items-center mt-4">
          <span className="px-6 py-2.5 text-base font-medium bg-white bg-opacity-90 backdrop-blur-md 
                        rounded-xl shadow-lg text-gray-900 border-2 border-red-400">
            {user.login}
          </span>
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-4 overflow-x-auto py-2">
                 

        <div className="flex gap-2">
          {allLogins.map((loginUser) => (
            <button
              key={loginUser.uid}
              onClick={() => loginUser.uid !== user.uid && handleSwitchUser(loginUser)}
              className={`
                px-3 py-1.5 text-sm rounded-lg shadow-md transition-all duration-300 
                transform hover:scale-105
                ${loginUser.uid === user.uid
                  ? 'bg-white bg-opacity-90 backdrop-blur-md text-gray-900 border-2 border-red-400'
                  : 'bg-white bg-opacity-70 backdrop-blur-sm text-gray-700 hover:bg-opacity-90 hover:text-gray-900'
                }
              `}
            >
              {loginUser.login}
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
          <animated.h1
            className="text-4xl font-bold mb-4 text-shadow-lg flex justify-center gap-2"
            style={nameAnimation}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            <TextAnimation text={user.name || 'Ім\'я користувача недоступне'} />
            {/* <RandomAvatar userId={user.uid} /> */}
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