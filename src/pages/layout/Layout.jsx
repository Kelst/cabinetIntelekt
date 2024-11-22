// Layout.jsx
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useLoaderData } from 'react-router-dom'
import Navigation from '../../components/navigation/Navigation'
import Loader from '../../components/loader/Loader'
import NavigationBig from '../../components/navigation/NavigationBig'
import CustomAlert from '../../components/alert/CustomAlert'
import useInfoStore from '../../store/infoStore'
import hand from "../../assets/hand.png"
import IntertwiningLinesAnimation from '../../components/intertwiningLinesAnimation/IntertwiningLinesAnimation'
import useConfigPage from '../../store/configPage'

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderData = useLoaderData();
  let location = useLocation();
  const setActiveItem = useInfoStore(state => state.setActiveItem)
  const showCursor = useInfoStore(state => state.showCursor)
  const setLoader = useInfoStore(store => store.setLoader)
  const imageUrl = useConfigPage(state => state.imageUrl);

  // Ініціалізація з loader'ом
  useEffect(() => {
    setLoader(true);
    // Затримка в 1 секунду для відображення loader'а
    setTimeout(() => {
      setLoader(false);
      setIsLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveItem("Item1")
        break;
      case "/payment":
        setActiveItem("Item2")
        break;
      case "/info":
        setActiveItem("Item3")
        break;
      case "/news":
        setActiveItem("Item4")
        break;
    }
  }, [location, showCursor]);



  const [showButton, setShowButton] = useState(false)
  const handleScrolltoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScrollbutton = () => {
      window.pageYOffset > 100 ? setShowButton(true) : setShowButton(false);
    };
    
    window.addEventListener('scroll', handleScrollbutton);
    
    return () => {
      window.removeEventListener('scroll', handleScrollbutton);
    };
  }, []);

  if (!loaderData.isAuth || isLoading) {
    return <Loader />;
  }

  return (
    <div className='pt-0 relative'>
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 min-w-full min-h-full object-cover z-[-1]"
      >
        <source src="src/assets/hsv4.mp4"  />
        Your browser does not support the video tag.
      </video>
      <Loader />
      <CustomAlert />
      <IntertwiningLinesAnimation/>
      <div className='flex gap-x-28 md:gap-x-0'>
        <div className='flex-shrink'>
          <Navigation />
          <NavigationBig />
        </div>
        <div className={`h-[70vh] w-[275px] m-auto px-2 mt-[200px] m-x-10 smm:w-[350px] ss:w-[400px] sm:w-[550px] md:w-[900px] md1:w-[1019px] xl:w-[1100px] 2xl:w-[1450px]`}>
          {showButton && (
            <div className='fixed bottom-5 right-4 z-[1000] p-4'>
              <img width={50} src={hand} alt="" srcSet="" className='text-white animate-bounce cursor-pointer' onClick={handleScrolltoTop} />
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  )
}