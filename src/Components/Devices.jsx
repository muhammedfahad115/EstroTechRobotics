import React from 'react';
import DevicesData from '../Api/Data.json';
import UsbIcon from '../assets/usb.png';
import SignalIcon from '../assets/signal.png';
import BatteryIcon from '../assets/battery.png';
import PinIcon from '../assets/pin.png';
import SimIcon from '../assets/sim.png';

function Devices() {
    return (
        <>
            <div className="flex gap-2 text-sm font-semibold text-gray-700 flex-wrap">
                {DevicesData.map((item) => (
                    <div
                        key={item.deviceName}
                        className="border-2 w-[350px] p-2 cursor-pointer rounded-lg"
                    >
                        <div className="flex justify-between items-center">
                            <h1>{item.deviceName}</h1>
                            <div className="flex gap-1">
                                <img className="w-3 h-3 rotate-90" src={UsbIcon} alt="USB Icon" />
                                <img className="w-3 h-3" src={SignalIcon} alt="Signal Icon" />
                                <img className="w-3 h-3" src={BatteryIcon} alt="Battery Icon" />
                            </div>
                        </div>
                        <h1>🛑 Offline</h1>
                        <h1 className="flex items-center gap-1">
                            <img className="w-3 h-3" src={PinIcon} alt="Pin Icon" />
                            Location
                        </h1>
                        <h1 className="flex items-center gap-1">
                            <img className="w-3 h-3" src={SimIcon} alt="SIM Icon" />
                            Cell info
                        </h1>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Devices;
