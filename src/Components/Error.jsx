import React, { useEffect, useState } from 'react';
import './Error.css';

function Error({ error, noOfErrors }) {
    const [showError, setShowError] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (error) {
            setShowError(true);
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(() => setShowError(false), 300);
            }, 3000);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [error, noOfErrors]);

    if (!showError) {
        return null;
    }

    return (
        <div className={`flex w-full absolute left-0 top-2 error-container ${visible ? 'visible' : ''}`}>
            <div className='bg-red-500 text-white w-auto font-bold text-sm p-4'>
                <p className='text-center text-xs sm:text-sm'>{error}</p>
            </div>
        </div>
    );
}

export default Error;
