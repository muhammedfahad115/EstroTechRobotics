import React, { useContext, useEffect } from 'react';
import { MyContext } from '../Context/UserContext';
import usb from '../assets/usb.png';
import signal from '../assets/signal.png';
import battery from '../assets/battery.png';
import pin from '../assets/pin.png';
import sim from '../assets/sim.png';
import deviceData from '../Api/Data.json';

function Device1() {
    const { subText, setSubText } = useContext(MyContext);

    useEffect(() => {
        setSubText('Device01');
        return () => {
            setSubText('');
        }
    }, []);

    const device = deviceData.find(item => item.deviceName === 'Device 01');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options).replace(/, /g, ' ');
        const time = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
        return `${formattedDate} ${time}`;
    };

    const isOnline = new Date(device.connectionStatus.connected) > new Date(device.connectionStatus.disconnected);

    return (
        <>
            <div>
                <div className='w-full flex  p-0 flex-wrap flex-col gap-2  md:flex-row'>
                    <div className='border-[0.5px] sm:w-[256px]  h-[104px] px-2 flex flex-col gap-2 rounded-[8px]'>
                        <h1>{device.deviceName}</h1>
                        <div className='flex items-center gap-2'>
                            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <h1 className='text-gray-500 text-xs'>{isOnline ? 'Online' : 'Offline'}</h1>
                        </div>
                        <h1 className='text-gray-500 text-sm'>Last connected at {formatDate(device.connectionStatus.connected)}</h1>
                    </div>
                    <div className='border-[0.5px] sm:w-[256px] h-[104px] px-2 flex flex-col gap-2 rounded-[8px]'>
                        <div className='flex items-center gap-1'><img className='w-[13px] h-[12px] opacity-50' src={pin} alt="pin" /><h1>Location</h1></div>
                        <h1 className='text-sm text-gray-500'>{device.location.building},{device.location.city},{device.location.state}</h1>
                        <h1 className='text-sm text-gray-500'>state,country,pincode</h1>
                    </div>
                    <div className='border-[0.5px] sm:w-[256px] h-[104px] px-2 flex flex-col gap-2 rounded-[8px]'></div>
                    <div className='border-[0.5px] sm:w-[256px] h-[104px] px-2 flex flex-col gap-2 rounded-[8px]'></div>
                    <div className='border-[0.5px] sm:w-[256px] h-[104px] px-2 flex flex-col gap-2 rounded-[8px]'></div>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
}

export default Device1;
