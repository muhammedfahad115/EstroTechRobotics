import React from 'react'
import UserIcon from '../assets/usericon.png';
import LogoutIcon from '../assets/logoutIcon.png';

function Header() {
  return (
    <>
    <div className='h-12 flex justify-between border-[0.5px] px-6 items-center'>
        <div><h1 className='text-lg font-bold'>Panel0</h1></div>
        <div className='flex gap-4'>
            <div><img className='w-9 h-9' src={UserIcon}/></div>
            <div><img className='w-9 h-9' src={LogoutIcon}/></div>
        </div>
    </div>
    </>
  )
}

export default Header