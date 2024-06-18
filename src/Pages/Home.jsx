import React, { useContext, useEffect } from 'react'
import DashBoard from '../Components/DashBoard'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import { MyContext } from '../Context/UserContext'

function Home() {
  
  useEffect(() => {
    localStorage.removeItem('previousPage');
  },[]);

  const {showSideBar} = useContext(MyContext)
  return (
    <>
    <Header/>
    <DashBoard/>
    <div className={`transition-all duration-150 pt-28  ${showSideBar ? ' ml-[90px] sm:ml-[150px] md:ml-[200px] p-6  mt-2' : 'ml-0 p-6'}`}><Outlet/></div>
    </>
  )
}

export default Home