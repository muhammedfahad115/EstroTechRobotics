import React, { useEffect, useState } from 'react';
import UserIcon from '../assets/usericon.png';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        if (email && password) {
            setEmail(email);
            setPassword(password);
        }else {
            navigate('/login')
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = 'https://www.estrotech.in/'; 
    };

    return (
        <>
            <div className='flex justify-center '>
                <div className='flex flex-col gap-3 items-center '>
                    <div>
                        <img className='w-[96px] h-[96px]' src={UserIcon} alt="User Icon" />
                    </div>
                    <div>
                        <label htmlFor="Email" className='text-gray-800'>Email</label>
                        <div className='w-[320px] h-[38px] px-2 py-1  border-[0.5px] rounded-[8px]'>
                            {email}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="Password" className='text-gray-800'>Password</label>
                        <div className='w-[320px] h-[38px] px-2 py-1   border-[0.5px] rounded-[8px]'>
                            {password}
                        </div>
                    </div>
                    <div>
                        <button onClick={handleLogout} className='border-[#DD3030] text-[#DD3030] w-[96px] h-[32px]  border-[0.5px] rounded-[8px]'>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
