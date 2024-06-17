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
            <div className="flex gap-2 text-sm font-semibold text-gray-700 flex-wrap">
                {DevicesData.map((item) => {
                    const deviceNameNoSpaces = item.deviceName.replace(/\s+/g, '').toLowerCase();
                    return (
                        <Link key={deviceNameNoSpaces} to={`/${deviceNameNoSpaces}`}>
                            <div className="border-2 w-[350px] p-2 cursor-pointer rounded-lg ">
                                <div className="flex justify-between items-center">
                                    <h1>{item.deviceName}</h1>
                                    <div className="flex gap-1">
                                        <img className="w-3 h-3 rotate-90" src={usb} alt="usb img" />
                                        <img className="w-3 h-3" src={signal} alt="signal img" />
                                        <img className="w-3 h-3" src={battery} alt="battery img" />
                                    </div>
                                </div>
                                <h1>🛑 Offline</h1>
                                <h1 className="flex items-center gap-1">
                                    <img className="w-3 h-3" src={pin} alt="" />
                                    Location
                                </h1>
                                <h1 className="flex items-center gap-1">
                                    <img className="w-3 h-3" src={sim} alt="" />
                                    Cell info
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
