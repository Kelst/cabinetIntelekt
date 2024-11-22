import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import minLogo from '../../assets/min-logo.png';
import useStore from '../../store/store';
import useInfoStore from '../../store/infoStore';
import useConfigPage from '../../store/configPage';

const HeaderSignboard = ({ user, clases }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getData = useStore(state => state.getData);
  const logIn = useStore(state => state.logIn);
  const setLoader = useInfoStore(store => store.setLoader);
  const showAllert = useInfoStore(state => state.showAllert);
  const configCabinet = useConfigPage(state => state.configCabinet);

  
  const menuRef = useRef(null);
const handleOnSwitchUser= async (loginData)=>{
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

}
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="md:hidden"> {/* Приховуємо на екранах середнього розміру і більше */}
      <div className={clases.bgImgM} />
      
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        className={`
          ${clases.shadowMd} ${clases.shadowZinc800} transition-all
          p-2 max-w-[360px] max-h-[126px]
          fixed z-[5] left-[calc(100%/2-52px)] sm:left-[calc(100%/2-58px)] top-2 rounded-xl
          bg-gradient-to-br from-white to-gray-100
          border border-gray-200
        `}
      >
        <motion.div
          className="absolute left-[30%] top-[-20px] z-50 w-[90px] h-[90px] rounded-full bg-white shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={configCabinet.logo_min_navigation}
            width="90"
            height="90"
            className="rounded-md"
            alt="Logo"
          />
        </motion.div>
        
        <motion.div
          className="flex flex-col justify-center items-center relative z-1 pt-14"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          ref={menuRef}
        >
          <div className={`
            p-2 z-1 text-center font-bold cursor-pointer uppercase 
            transition-colors duration-300 mx-2 mt-2 text-xs
            tracking-wider ${clases.textShadow}
            bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500
          `}>
            Особистий кабінет
          </div>
          
          <span className={`text-[11px] font-semibold ${clases.textShadow} text-gray-600`}>
            {user.name}
          </span>
          
          <div className="relative flex flex-col items-center">
            <motion.span
              className={`
                mt-1 cursor-pointer font-bold text-gray-400 hover:text-yellow-300
                transition-colors duration-300 ${clases.textShadow}
                relative overflow-hidden group flex items-center
              `}
              onClick={() => user.subLogin?.length > 0 && setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user.login}
              {user.subLogin?.length > 0 && (
                <svg 
                  className={`w-4 h-4 ml-1 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </motion.span>

            <AnimatePresence>
              {isOpen && user.subLogin?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div className="py-1" role="menu">
                    {user.subLogin.map((subUser) => (
                      <motion.a
                        key={subUser.uid}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center"
                        role="menuitem"
                        onClick={() => {
                          handleOnSwitchUser(subUser);
                          setIsOpen(false);
                        }}
                        whileHover={{ backgroundColor: '#F3F4F6' }}
                      >
                        {subUser.login}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      <div className={clases.bgImg} />
    </div>
  );
};

export default HeaderSignboard;