import React from 'react'
import UserIcon from '../assets/usericon.png';
import LogoutIcon from '../assets/logoutIcon.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
    <div className='h-12 flex justify-between border-[0.5px] px-6 items-center sticky top-0  '>
        <div><h1 className='text-lg font-bold'>Panel0</h1></div>
        <div className='flex gap-4'>
            <div><Link to='/profile'><img className='w-9 h-9 cursor-pointer active:scale-95' title='Profile' src={UserIcon}/></Link></div>
            <div><img className='w-9 h-9 cursor-pointer active:scale-95' title='Logout' src={LogoutIcon}/></div>
        </div>
    </div>
    </>
  )
}

export default Header