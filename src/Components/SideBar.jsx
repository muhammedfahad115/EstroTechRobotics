import React, { useContext, useState } from 'react';
import { MyContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';

function SideBar() {
    const { text, setText, showSideBar } = useContext(MyContext);
    const [slider, setSlider] = useState(true);

    return (
        <>
            {slider && (
                <div
                    className={`w-full sm:w-[200px] h-[928px] p-6 flex flex-col  gap-y-3 bg-gray-100 border-[0.5px] fixed transition-transform duration-300 ${
                        showSideBar ? 'transform translate-x-0' : 'transform -translate-x-[100%] '
                    }`}
                >
                    <Link to={'/'}><div className='cursor-pointer flex justify-center sm:flex-none' onClick={() => setText('Dashboard')}><h1>Dashboard</h1></div></Link>
                    
                    <Link to={'/devices'}><div className='cursor-pointer flex justify-center sm:flex-none' onClick={() => setText('Devices')}><h1>Devices</h1></div></Link>
                </div>
            )}
        </>
    );
}

export default SideBar;
