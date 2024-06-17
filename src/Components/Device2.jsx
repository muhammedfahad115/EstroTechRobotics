import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context/UserContext';
import usb from '../assets/usb.png';
import signal from '../assets/signal.png';
import battery from '../assets/battery.png';
import pin from '../assets/pin.png';
import sim from '../assets/sim.png';
import deviceData from '../Api/Data.json';
import { Line } from 'react-chartjs-2';
import data0 from '../Api/Data0.json';
import data1 from '../Api/Data1.json';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler
} from 'chart.js';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler
);
const TARGET_VALUE = 100;

function Device2() {
    const { subText, setSubText } = useContext(MyContext);
    const [percentageOfData0, setPercentageOfData0] = useState(0);
    const [percentageOfData1, setPercentageOfData1] = useState(0);
    const [percentageOfData2ToTarget, setPercentageOfData2ToTarget] = useState(0);

    useEffect(() => {
        setSubText('Device02');
        const data0Sum = data0.reduce((acc, curr) => acc + curr.data, 0);
        const data1Sum = data1.reduce((acc, curr) => acc + curr.data, 0);
        const data2Sum = data0Sum + data1Sum;
        const totalData = data0Sum + data1Sum;

        const percentageOfData0Calc = totalData ? ((data0Sum / totalData) * 100).toFixed(2) : 0;
        const percentageOfData1Calc = totalData ? ((data1Sum / totalData) * 100).toFixed(2) : 0;
        const percentageOfData2ToTargetCalc = totalData > TARGET_VALUE ? '100.00' : ((totalData / TARGET_VALUE) * 100).toFixed(2);

        setTimeout(() => {
            setPercentageOfData0(percentageOfData0Calc);
            setPercentageOfData1(percentageOfData1Calc);
            setPercentageOfData2ToTarget(percentageOfData2ToTargetCalc);
        }, 100);
        return () => {
            setSubText('');
        }
    }, []);


    const device = deviceData.find(item => item.deviceName === 'Device 02');

    const devices = deviceData.map((device) => {
        return (
            device.deviceName
        )
    })

    console.log(devices);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options).replace(/, /g, ' ');
        const time = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
        return `${formattedDate} ${time}`;
    };

    const isOnline = new Date(device.connectionStatus.connected) > new Date(device.connectionStatus.disconnected);

    const lineChartData = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}`)
        ,
        datasets: [
            {
                label: 'Data 0',
                data: data0.map(item => item.data),
                borderColor: '#6975FF',
                backgroundColor: 'transparent',
                fill: true,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true
            },
            {
                label: 'Data 1',
                data: data1.map(item => item.data),
                borderColor: '#64BDC6',
                backgroundColor: 'transparent',
                fill: true,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true

            },
            {
                label: 'Data 2',
                data: data0.map((item, index) => item.data + data1[index].data),
                borderColor: '#084FD7',
                backgroundColor: 'transparent',
                fill: true,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true,

            }
        ]
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rect',
                    padding: 40,
                    generateLabels: (chart) => {
                        const { data } = chart;
                        return data.datasets.map((dataset, i) => ({
                            text: dataset.label,
                            fillStyle: dataset.borderColor,
                            strokeStyle: dataset.borderColor,
                            pointStyle: 'rect',
                            hidden: !chart.isDatasetVisible(i),
                            datasetIndex: i
                        }));
                    }
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
            }
        },
        elements: {
            point: {
                radius: 0,
                hoverRadius: 0
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false,
                },
            },
            y: {
                border: {
                    display: false
                },
                grid: {
                    display: true,
                    drawBorder: false,
                    drawTicks: false,
                    color: (context) => {
                        if (context.tick.value % 20 === 0) {
                            return '#e0e0e0';
                        }
                        return 'transparent'
                    },
                },
                ticks: {
                    stepSize: 20,
                    padding: 20,
                    callback: function (value) {
                        return value;
                    },
                }
            }
        },
    };

    return (
        <>
            <div className='w-full h-full flex flex-col gap-5 '>
                <div className='w-full flex  p-0  flex-col gap-2  md:flex-row'>
                    <div className='border-[0.5px]  sm:w-[256px]  h-auto p-[10px] flex flex-col gap-2 rounded-[8px]'>
                        <h1>{device.deviceName}</h1>
                        <div className='flex items-center gap-2'>
                            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <h1 className='text-gray-500 text-xs'>{isOnline ? 'Online' : 'Offline'}</h1>
                        </div>
                        <h1 className='text-gray-500 text-xs'>Last connected at {formatDate(device.connectionStatus.connected)}</h1>
                    </div>
                    <div className='border-[0.5px] sm:w-[256px] h-auto p-[10px] flex flex-col gap-2 rounded-[8px]'>
                        <div className='flex items-center gap-1'><img className='w-[13px] h-[12px] opacity-50' src={pin} alt="pin" /><h1 className='text-gray-500'>Location</h1></div>
                        <h1 className='text-sm text-gray-500'>{device.location.building},{device.location.city},{device.location.state}</h1>
                        <h1 className='text-sm text-gray-500'>state,country,pincode</h1>
                    </div>
                    <div className='border-[0.5px] sm:w-[256px] h-auto p-[10px] flex flex-col gap-2 rounded-[8px]'>
                        <div className='flex items-center gap-1'><img className='w-[13px] h-[12px] ' src={sim} alt="sim" /><h1 className='text-gray-500'>Cell Info</h1></div>
                        <h1 className='text-sm text-gray-500'>{device.hw_data.sim.operator}</h1>
                        <h1 className='text-sm text-gray-500'>{device.hw_data.sim.signalStrength}</h1>
                    </div>
                    <div className='border-[0.5px] sm:w-[256px] h-auto p-[10px] flex flex-col gap-2 rounded-[8px]'>
                        <div className='flex items-center gap-1'><img className='w-[13px] h-[12px] rotate-90 ' src={usb} alt="usb" /><h1 className='text-gray-500'>Usb Devices</h1></div>
                        {devices.map((device,index) => (
                            <div key={index} className='flex items-center gap-2'><div className='w-3 h-3 rounded-full bg-green-500'></div><h1 className='text-sm text-gray-500'>{device}</h1></div>

                        ))}
                    </div>
                    <div className='border-[0.5px] sm:w-[256px] h-auto p-[10px] flex flex-col gap-2 rounded-[8px]'>
                        <div className='flex items-center gap-1'><img className='w-[13px] h-[12px]  ' src={battery} alt="battery" /><h1 className='text-gray-500'>Battery Info</h1></div>
                        <h1 className='text-sm text-gray-500'>{device.hw_data.battery.percentage}</h1>
                        <h1 className='text-sm text-gray-500'>{device.hw_data.battery.temperature}</h1>
                    </div>
                </div>

                <div className=' border-[0.5px]  rounded-[8px] px-3 py-2'>
                    <div><p>Daily Trend</p></div>
                    <div className='flex justify-center'>
                        <Line
                            data={lineChartData}
                            options={lineChartOptions}
                            height={100}
                        />
                    </div>
                </div>

                <div></div>
                <div></div>
            </div>
        </>
    );
}

export default Device2;
