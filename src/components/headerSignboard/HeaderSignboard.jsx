import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/store';
import useInfoStore from '../../store/infoStore';
import useConfigPage from '../../store/configPage';

const HeaderSignboard = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const getData = useStore(state => state.getData);
  const logIn = useStore(state => state.logIn);
  const setLoader = useInfoStore(store => store.setLoader);
  const showAllert = useInfoStore(state => state.showAllert);
  const configCabinet = useConfigPage(state => state.configCabinet);

  const handleOnSwitchUser = async (loginData) => {
    try {
      setLoader(true);
      const result = await logIn(loginData.login, loginData.password);
      await getData(loginData.uid);
      if (result?.flag) {
        showAllert(2, "Логін змінено");
      }
    } catch (error) {
      console.error("Switch error:", error);
    } finally {
      setLoader(false);
    }
  };

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
    <div className="block md:hidden">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className=" w-full z-[999] flex flex-col items-center px-4"
      >
        {/* Logo Circle */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] flex items-center justify-center p-1 mb-4"
        >
          <img
            src={configCabinet.logo_min_navigation}
            className="w-full h-full object-cover rounded-full"
            alt="Logo"
          />
        </motion.div>

        {/* Main Card */}
        <div 
          ref={menuRef}
          className="w-full max-w-[320px] bg-[#1a1a1a] rounded-xl relative shadow-[0_0_15px_rgba(255,0,0,0.3)] border border-red-500/30"
        >
          <div className="p-4 space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-white text-lg font-semibold">Особистий кабінет</h2>
              <p className="text-gray-400 text-sm">{user.name}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <motion.button
                onClick={() => user.subLogin?.length > 0 && setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!user.subLogin?.length}
              >
                <span className="text-lg">{user.login}</span>
                {user.subLogin?.length > 0 && (
                  <motion.svg 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                )}
              </motion.button>

              {/* <button className="w-full py-2 text-sm text-white bg-red-900/50 hover:bg-red-900/70 rounded-lg transition-colors mt-2">
                Призупинити логін
              </button> */}
            </div>
          </div>

          <AnimatePresence>
            {isOpen && user.subLogin?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-800/50 rounded-lg divide-y divide-gray-700">
                  {user.subLogin.map((subUser) => (
                    <motion.button
                      key={subUser.uid}
                      onClick={() => {
                        handleOnSwitchUser(subUser);
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                      whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {subUser.login}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default HeaderSignboard;