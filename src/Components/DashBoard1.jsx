import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
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
import deviceData from '../Api/Data.json';
import data0 from '../Api/Data0.json';
import data1 from '../Api/Data1.json';
import PinIcon from '../assets/pin.png';
import './Dashboard1.css';

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

const getConnectionData = (devices) => {
    let connectedCount = 0;
    let disconnectedCount = 0;

    devices.forEach(device => {
        if (new Date(device.connectionStatus.connected) > new Date(device.connectionStatus.disconnected)) {
            connectedCount++;
        } else {
            disconnectedCount++;
        }
    });

    return [connectedCount, disconnectedCount];
}

const connectionData = getConnectionData(deviceData);

const doughnutChartData = {
    labels: ['Online', 'Offline'],
    datasets: [
        {
            label: 'Device Connection Status',
            data: connectionData,
            backgroundColor: ['#3be168', '#dc3031'],
            hoverBackgroundColor: ['#3be168', '#dc3031']
        }
    ]
};

const doughnutOptions = {
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 40,
                generateLabels: (chart) => {
                    const { data } = chart;
                    return data.labels.map((label, i) => ({
                        text: label,
                        fillStyle: data.datasets[0].backgroundColor[i],
                        strokeStyle: data.datasets[0].backgroundColor[i],
                        pointStyle: 'rect',
                        hidden: false,
                        lineCap: 'butt',
                        lineDash: [],
                        lineDashOffset: 0,
                        lineJoin: 'miter',
                        pointStyleWidth: 20,
                    }));
                }
            }
        }
    }
};

const getTimeDifference = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now - past;
    const diffInMin = Math.floor(diffInMs / 60000);

    if (diffInMin < 60) {
        return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMin / 60);

    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
}

function DashBoard1() {
    const [percentageOfData0, setPercentageOfData0] = useState(0);
    const [percentageOfData1, setPercentageOfData1] = useState(0);
    const [percentageOfData2ToTarget, setPercentageOfData2ToTarget] = useState(0);

    useEffect(() => {
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
    }, []);

    

    const lineChartData = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}`)
        ,
        datasets: [
            {
                label: 'Data 0',
                data: data0.map(item => item.data),
                borderColor: '#6975FF',
                backgroundColor: 'transparent' ,
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
                backgroundColor: 'transparent' ,
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
                backgroundColor: 'transparent' ,
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
                    padding: 40
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
                grid: {
                    display: true,
                    drawBorder: false,
                    drawTicks: false,
                    color: (context) => {
                        if (context.tick.value % 20 === 0) {
                            return '#e0e0e0';
                        }
                        return 'transparent';
                    },
                },
                ticks: {
                    stepSize: 20,
                    callback: function (value) {
                        return value;
                    }
                }
            }
        },
    };


    return (
        <>
            <div className='flex flex-col gap-3'>
                <div className='w-full border-[0.5px] h-auto rounded-[8px] px-3 py-2'>
                    <div><p>Daily Trend</p></div>
                    <div>
                        <Line
                            data={lineChartData}
                            options={lineChartOptions}
                            height={100}
                        />
                    </div>
                </div>
                <div className='sm:flex gap-3'>
                    <div className='w-[440px] flex flex-col gap-4 h-[400px] rounded-[8px]'>
                        <div className='w-full h-[122.67px] px-3 py-2 border-[0.5px] rounded-[8px]'>
                            <div className='flex h-[15px] items-center gap-2'>
                                <div className='w-[16px] h-[15px] bg-[#6975FF]'></div>
                                <div>Data-0</div>
                            </div>
                            <div>
                                <div className='flex justify-end'><h1>{percentageOfData0}%</h1></div>
                                <div className='bg-[#D9D9D9] p-0'>
                                    <div style={{
                                        width: `${percentageOfData0}%`,
                                        height: '40px',
                                        backgroundColor: '#6975FF',
                                        transition: 'width 1s ease-in-out'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-[122.67px] px-3 py-2 border-[0.5px] rounded-[8px]'>
                            <div className='flex h-[15px] items-center gap-2'>
                                <div className='w-[16px] h-[15px] bg-[#64BDC6]'></div>
                                <div>Data-1</div>
                            </div>
                            <div>
                                <div className='flex justify-end'><h1>{percentageOfData1}%</h1></div>
                                <div className='bg-[#D9D9D9] p-0'>
                                    <div style={{
                                        width: `${percentageOfData1}%`,
                                        height: '40px',
                                        backgroundColor: '#64BDC6',
                                        transition: 'width 1s ease-in-out'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-[122.67px] px-3 py-2 border-[0.5px] rounded-[8px]'>
                            <div className='flex h-[15px] items-center gap-2'>
                                <div className='w-[16px] h-[15px] bg-[#084FD7]'></div>
                                <div>Data-2</div>
                            </div>
                            <div>
                                <div className='flex justify-end'><h1>{percentageOfData2ToTarget}%</h1></div>
                                <div className='bg-[#D9D9D9] p-0'>
                                    <div style={{
                                        width: `${percentageOfData2ToTarget}%`,
                                        height: '40px',
                                        backgroundColor: '#084FD7',
                                        transition: 'width 1s ease-in-out'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[440px] h-[400px] border-[0.5px] rounded-[8px] flex flex-col justify-center'>
                        <div className='px-5 py-3'>
                            <p>Device Availability</p>
                        </div>
                        <div className='flex justify-center'>
                            <Doughnut data={doughnutChartData} options={doughnutOptions} />
                        </div>
                    </div>
                    <div className='w-[440px] h-[400px] border-[0.5px] overflow-hidden overflow-y-scroll scrollBar rounded-[8px]'>
                        <div className='px-5 py-3'>
                            <p>Offline Devices</p>
                            <div className='flex flex-col mt-3 gap-3'>
                                {deviceData.map((device, index) => (
                                    <div key={index} className='py-2 px-4 w-full border-[0.8px] rounded-[8px]'>
                                        <div><p>{device.deviceName}</p></div>
                                        <div className='flex justify-end opacity-80'><p>{getTimeDifference(device.connectionStatus.connected)}</p></div>
                                        <div className='flex items-center text-sm opacity-70 gap-1'>
                                            <img className='w-3 h-3' src={PinIcon} alt="pin icon" />
                                            <p>{device.location.city}</p>,
                                            <p>{device.location.country}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard1;
