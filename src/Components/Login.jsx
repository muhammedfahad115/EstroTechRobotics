import React, { useEffect, useState } from 'react';
import UserIcon from '../assets/usericon.png';
import Error from './Error';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [noOfErrors, setNoOfErrors] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.trim() === '' || password.trim() === '') {
            setError('All fields are required');
            setNoOfErrors(noOfErrors + 1);
            return;
        } else {
            setError('');
        }
        if (!email.includes('@gmail.com')) {
            setError('Please include @gmail.com in your email');
            setNoOfErrors(noOfErrors + 1);
            return;
        } else {
            setError('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className='flex justify-center h-screen items-center'>
                <form onSubmit={handleSubmit} className='bg-gray-700 h-1/2 w-[90%] sm:w-[50%] md:w-[40%] lg:w-[40%] xl:w-[30%] p-6 sm:p-8 rounded-lg'>
                {error && <Error error={error} noOfErrors={noOfErrors}  />}
                    <div className='flex justify-center'><img className='w-16 h-16 sm:w-20 sm:h-20' src={UserIcon} alt="User Icon" /></div>
                    <div className='flex justify-center mt-5'>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='w-full px-2 sm:px-4 py-2 outline-none rounded-lg placeholder:text-sm sm:placeholder:text-base'  
                            type="text" 
                            placeholder='Enter Email' 
                        />
                    </div>
                    <div className='flex justify-center mt-5 relative'>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            className='w-full px-2 sm:px-4 py-2 outline-none rounded-lg placeholder:text-sm sm:placeholder:text-base'  
                            type={showPassword ? "text" : "password"} 
                            placeholder='Enter Password' 
                        />
                        <button 
                            type='button' 
                            onClick={togglePasswordVisibility} 
                            className='absolute right-2 top-2 text-gray-500'
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className='mt-5 flex justify-center'><button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Login</button></div>
                </form>
            </div>
        </>
    );
}

export default Login;
