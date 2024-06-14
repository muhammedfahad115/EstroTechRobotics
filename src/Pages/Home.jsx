import React, { useContext } from 'react'
import DashBoard from '../Components/DashBoard'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import { MyContext } from '../Context/UserContext'

function Home() {
  const {showSideBar} = useContext(MyContext)
  return (
    <>
    <Header/>
    <DashBoard/>
    <div className={`transition-all duration-150 ${showSideBar ? 'ml-[200px] p-9' : 'ml-0 p-6'}`}><Outlet/></div>
    </>
  )
}

export default Home