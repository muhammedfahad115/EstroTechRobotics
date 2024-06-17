import React, { useContext, useEffect, useState } from 'react'
import MenuIcon from '../assets/menuicon.png';
import ArrowIcon from '../assets/rightArrowIcon.png';
import { MyContext } from '../Context/UserContext';
import SideBar from './SideBar';

function DashBoard() {
  // const {text, setText} = useContext(MyContext);
  // const {showSideBar, setShowSideBar} = useContext(MyContext);

  // useEffect(() => {
  //   const checkText = localStorage.getItem('text');
  //   if (checkText) {
  //     setText(checkText);
  //   }
  // }, []);

  // const handleSideBar = () => {
  //   setShowSideBar(!showSideBar);
  // }

  return (
    <>
    {/* <div className='h-12 border-[0.5px] px-6 flex items-center sticky w-full   top-12 gap-5'>
      <button onClick={handleSideBar}><img className='w-5 h-5' src={MenuIcon}/></button>
      <h1>Dashboard</h1>
      <h1>{text ? <div className='flex items-center'><img className='w-5 h-5' src={ArrowIcon}/><h1>{text}</h1></div> : ''}</h1>
    </div> */}
    <SideBar/>
    </>
  )
}

export default DashBoard