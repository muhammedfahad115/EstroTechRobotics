import React, { useContext, useEffect, useState } from 'react'
import MenuIcon from '../assets/menuicon.png';
import ArrowIcon from '../assets/rightArrowIcon.png';
import { MyContext } from '../Context/UserContext';
import UserIcon from '../assets/usericon.png';
import LogoutIcon from '../assets/logoutIcon.png';
import { Link } from 'react-router-dom';

function Header() {
    const {text, setText} = useContext(MyContext);
    const {showSideBar, setShowSideBar} = useContext(MyContext);
    const {subText, setSubText} = useContext(MyContext);
  
    useEffect(() => {
      const checkText = localStorage.getItem('text');
      if (checkText) {
        setText(checkText);
      }
    }, []);
  
    const handleSideBar = () => {
      setShowSideBar(!showSideBar);
    }
  return (
    <>
    <div className='fixed w-full z-50 bg-white top-0'>
    <div className='h-12 flex justify-between border-[0.5px] px-6 items-center sticky top-0 w-full '>
        <div><h1 className='text-lg font-bold'>Panel0</h1></div>
        <div className='flex gap-4'>
            <div><Link to='/profile'><img className='w-9 h-9 cursor-pointer active:scale-95' title='Profile' onClick={() => setText('Profile')} src={UserIcon}/></Link></div>
            <div><img className='w-9 h-9 cursor-pointer active:scale-95' title='Logout' src={LogoutIcon}/></div>
        </div>
    </div>
    <div className='h-12 border-[0.5px] px-6 flex items-center sticky w-full   top-12 gap-5'>
      <button onClick={handleSideBar}><img className='w-5 h-5' src={MenuIcon}/></button>
      <Link to={'/'}><h1>Dashboard</h1></Link>
      <div><h1 className='flex gap-2 items-center text-sm sm:text-base'>{text ? <div className='flex items-center'><img className='w-5 h-5' src={ArrowIcon}/><Link to={ text === 'Dashboard' ? '/' : 'devices'}><h1>{text}</h1></Link></div> : ''}{subText ? <div className='flex items-center'><img className='w-5 h-5' src={ArrowIcon}/><h1 className='text-xs sm:text-sm'>{subText}</h1></div> : ''}</h1></div>
    </div>
    </div>
    </>
  )
}

export default Header