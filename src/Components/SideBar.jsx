import React, { useContext, useState } from 'react'
import { MyContext } from '../Context/UserContext';

function SideBar() {
    const {text, setText} = useContext(MyContext);

    return (
        <>
            <div className='w-[200px] h-[928px] p-6 flex flex-col gap-y-3 bg-gray-100 border-[0.5px] fixed'>
                <div className='cursor-pointer' onClick={() => setText('Dashboard')}><h1>Dashboard</h1></div>
                <div className='cursor-pointer' onClick={() => setText('Devices')}><h1>Devices</h1></div>
            </div>
        </>
    )
}

export default SideBar