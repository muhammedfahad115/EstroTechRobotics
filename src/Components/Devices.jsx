import React, { useContext } from 'react';
import DevicesData from '../Api/Data.json';
import usb from '../assets/usb.png';
import signal from '../assets/signal.png';
import battery from '../assets/battery.png';
import pin from '../assets/pin.png';
import sim from '../assets/sim.png';
import { Link } from 'react-router-dom';


function Devices() {

    return (
        <>
            <div className="flex gap-2    flex-wrap">
                {DevicesData.map((item) => {
                    const deviceNameNoSpaces = item.deviceName.replace(/\s+/g, '').toLowerCase();
                    const isOnline = new Date(item.connectionStatus.connected) > new Date(item.connectionStatus.disconnected);

                    return (
                        <Link key={deviceNameNoSpaces} to={`/${deviceNameNoSpaces}`}>
                            <div className="border-[0.5px] w-[200px] sm:w-[300px] md:w-[350px] p-2 flex flex-col gap-2 cursor-pointer rounded-lg ">
                                <div className="flex justify-between items-center">
                                    <h1>{item.deviceName}</h1>
                                    <div className="flex gap-1">
                                        <img className="w-4 h-3 rotate-90" src={usb} alt="usb img" />
                                        <img className="w-4 h-3" src={signal} alt="signal img" />
                                        <img className="w-4 h-3" src={battery} alt="battery img" />
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <h1 className='text-gray-500 text-xs'>{isOnline ? 'Online' : 'Offline'}</h1>
                                </div>
                                <h1 className="flex text-xs items-center gap-1">
                                    <img className="w-3 h-3" src={pin} alt="" />
                                   {item.location.city} {item.location.state} {item.location.district} {item.location.pinCode}
                                </h1>
                                <h1 className="flex text-sm items-center gap-1">
                                    <img className="w-3 h-3" src={sim} alt="" />
                                    {item.hw_data.sim.operator}
                                </h1>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

export default Devices;
