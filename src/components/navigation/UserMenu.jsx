import React from 'react';
import useStore from '../../store/store';
import useInfoStore from '../../store/infoStore';

const UserMenu = () => {
  const getData = useStore(state => state.getData);
  const user = useStore(state => state.user);
  const logIn = useStore(state => state.logIn);
  const setLoader = useInfoStore(store => store.setLoader);
  const showAllert = useInfoStore(state => state.showAllert);

  const handleSwitchUser = async (e) => {
    let result;
    try {
      setLoader(true);
      result = await logIn(e.login, e.password);
      await getData(e.uid);
    } catch (error) {
      console.log("switch error", error);
    } finally {
      if (result?.flag) {
        showAllert(2, "Логін змінено");
      }
      setLoader(false);
    }
  };

  const renderLoginGallery = () => {
    if (!user.subLogin) return null;

    const leftLogins = user.subLogin.slice(0, Math.floor(user.subLogin.length / 2));
    const rightLogins = user.subLogin.slice(Math.floor(user.subLogin.length / 2));

    return (
      <div className="flex items-center justify-center gap-2">
        {/* Ліві логіни */}
        <div className="flex gap-1">
          {leftLogins.map((subUser) => (
            <button
              key={subUser.uid}
              onClick={() => handleSwitchUser(subUser)}
              className="px-2 py-0.5 text-xs bg-gray-100 rounded 
                       hover:bg-gray-200 transition-all duration-300 
                       text-gray-600 hover:text-gray-900"
            >
              {subUser.login}
            </button>
          ))}
        </div>

        {/* Поточний логін */}
        <div className="px-3 py-1 bg-white border border-gray-300 rounded 
                     text-sm font-medium text-gray-900">
          {user.login}
        </div>

        {/* Праві логіни */}
        <div className="flex gap-1">
          {rightLogins.map((subUser) => (
            <button
              key={subUser.uid}
              onClick={() => handleSwitchUser(subUser)}
              className="px-2 py-0.5 text-xs bg-gray-100 rounded 
                       hover:bg-gray-200 transition-all duration-300 
                       text-gray-600 hover:text-gray-900"
            >
              {subUser.login}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="bg-slate-100 rounded p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="text-xs text-gray-600">{user.name}</div>
          {renderLoginGallery()}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;