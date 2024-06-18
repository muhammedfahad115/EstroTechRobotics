import React, { useContext, useEffect, useState } from 'react';
import MenuIcon from '../assets/menuicon.png';
import ArrowIcon from '../assets/rightArrowIcon.png';
import { MyContext } from '../Context/UserContext';
import UserIcon from '../assets/usericon.png';
import LogoutIcon from '../assets/logoutIcon.png';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const { text, setText } = useContext(MyContext);
    const { showSideBar, setShowSideBar } = useContext(MyContext);
    const { subText, setSubText } = useContext(MyContext);
    const [showButton, setShowButton] = useState(false);
    const [previousPage, setPreviousPage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const checkText = localStorage.getItem('text');
        if (checkText) {
            setText(checkText);
        }
        const storedPreviousPage = localStorage.getItem('previousPage');
        if (location.pathname !== '/') {
            setShowButton(true);
            setPreviousPage(storedPreviousPage || '/');
            localStorage.setItem('previousPage', location.pathname);
        } else {
            setShowButton(false);
        }
    }, [location.pathname, setText]);

    const handleSideBar = () => {
        setShowSideBar(!showSideBar);
    };

    return (
        <>
            <div className='fixed w-full z-50 bg-white top-0'>
                <div className='h-12 flex justify-between border-[0.5px] px-6 items-center sticky top-0 w-full '>
                    <div><h1 className='text-lg font-bold'>Panel0</h1></div>
                    {showButton && (
                        <Link to={`${previousPage}`}>
                            <button className='bg-gray-500 px-2 sm:px-4 text-sm sm:text-base animate-pulse duration-300 text-white rounded-xl '>Go back</button>
                        </Link>
                    )}
                    <div className='flex gap-4'>
                        <div><Link to='/profile'><img className='w-9 h-9 cursor-pointer active:scale-95' title='Profile' onClick={() => setText('User Details')} src={UserIcon} alt="User Icon" /></Link></div>
                        <div><img className='w-9 h-9 cursor-pointer active:scale-95' title='Logout' src={LogoutIcon} alt="Logout Icon" /></div>
                    </div>
                </div>
                <div className='h-12 border-[0.5px] px-6 flex items-center sticky w-full   top-12 gap-5'>
                    <button onClick={handleSideBar}><img className='w-5 h-5' src={MenuIcon} alt="Menu Icon" /></button>
                    <Link to={'/'}><h1>Dashboard</h1></Link>
                    <div>
                        <h1 className='flex gap-2 items-center text-sm sm:text-base'>
                            {text && (
                                <div className='flex items-center'>
                                    <img className='w-5 h-5' src={ArrowIcon} alt="Arrow Icon" />
                                    <Link to={text === 'Dashboard' ? '/' : 'devices'}>
                                        <h1>{text}</h1>
                                    </Link>
                                </div>
                            )}
                            {subText && (
                                <div className='flex items-center'>
                                    <img className='w-5 h-5' src={ArrowIcon} alt="Arrow Icon" />
                                    <h1 className='text-xs sm:text-sm'>{subText}</h1>
                                </div>
                            )}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
