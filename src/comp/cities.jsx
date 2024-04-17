import React from 'react'
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCloudSunRain, faGear, faTemperatureThreeQuarters, faWind, faSun, faCloudRain, faDroplet, faEye } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import logo_png from '../pic/logo.png'
import clear_png from '../pic/clear.png'

function Cities() {
    const [CurrentHour, setCurrentHour] = useState(new Date().getHours());
    const [CurrentMin, setCurrentMin] = useState(new Date().getMinutes());
    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
    
        return () => {
          clearInterval(timerID);
        };
      }, []);
      const tick = () => {
        setCurrentHour(new Date().getHours());
        setCurrentMin(new Date().getMinutes());
      };
    return (
        <>
            <div className='flex'>

                <aside className='bg-[#202B3B] text-[#9399a2ff] h-[96vh] w-[10%] mx-3 rounded-lg'>
                    <ul className='nav-cont px-2 py-2'>
                        <li className='m-logo'>
                            <img className='h-logo' src={logo_png} alt="Logo" />
                        </li>
                        <li>
                            <NavLink className='py-[14px] px-[9px] ' to='/weather' end >
                            <FontAwesomeIcon className='text-xl mb-2' icon={faCloudSunRain} />
                            Weather
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='py-[12px] px-[15px]' to='/cities' end >
                            <FontAwesomeIcon className='text-xl mb-2' icon={faList} />
                            Cities
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='py-[12px] px-[9px]' to='/settings' end >
                            <FontAwesomeIcon className='text-xl mb-2' icon={faGear} />
                            Settings
                            </NavLink>
                        </li>
                    </ul>
                </aside>

                <section className='w-[55%] p-3 rounded-lg mx-2'>

                    <div>
                        <input className='bg-gray-700 placeholder:text-[#9399a2ff] rounded-md w-[80%] px-3 py-2 mt-1 outline-none text-gray-300' type="text" placeholder='Search for a city' onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className='py-3'>
                        <div className='flex items-center bg-[#202B3B] text-[#bbc2cd] py-2 md:px-5 px-4 rounded-lg mt-2'>
                            <img className='h-28' src={clear_png} />
                            <div className='ms-3'>
                                <p className='text-xl font-bold'>Madrid</p>
                                <small>{CurrentHour + ":" + CurrentMin}</small>
                            </div>
                            <p className='ms-auto text-2xl font-semibold'>31°</p>
                        </div>
                        <div className='flex items-center bg-[#202B3B] text-[#bbc2cd] py-2 md:px-5 px-4 rounded-lg md:my-5 my-4'>
                            <img className='h-28' src={clear_png} />
                            <div className='ms-3'>
                                <p className='text-xl font-bold'>Lahore</p>
                                <small>{CurrentHour + ":" + CurrentMin}</small>
                            </div>
                            <p className='ms-auto text-2xl font-semibold'>37°</p>
                        </div>
                        <div className='flex items-center bg-[#202B3B] text-[#bbc2cd] py-2 md:px-5 px-4 rounded-lg'>
                            <img className='h-28' src={clear_png} />
                            <div className='ms-3'>
                                <p className='text-xl font-bold'>Karachi</p>
                                <small>{CurrentHour + ":" + CurrentMin}</small>
                            </div>
                            <p className='ms-auto text-2xl font-semibold'>45°</p>
                        </div>
                    </div>

                </section>

                <section className='w-[35%] text-gray-300 md:px-[40px] px-4 py-5 h-[96vh] rounded-lg mx-2'>
                    <div className='flex justify-between md:px-3 px-2'>
                        <div>
                            <h1 className='text-2xl font-bold'>Madrid</h1>
                            <span className='text-xs mb-3'>Chances of rain: 0%</span>
                            <h1 className='text-3xl font-black mt-[23px]'>31° C</h1>
                        </div>
                        <div>
                            <img className='h-32' src={clear_png} />
                        </div>
                    </div>
                    <hr className='my-4 border-gray-500' />
                    <div className='py-4'>
                        <p className='text-xs font-bold mb-4'>Today's Forecast</p>
                        <div className='flex mt-2'>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={clear_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={clear_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={clear_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={clear_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                        </div>
                    </div>
                    <hr className='my-4 border-gray-500' />
                    <div>
                        <p className='text-xs font-bold mb-4'>3 Days Forecast</p>
                        <div className='grid grid-cols-3 items-center px-2 border-b border-gray-700 pb-4'>
                            <div>
                                <p className='text-sm'>Today</p>
                            </div>
                            <div className='flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className='text-sm font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className='text-sm'>36/22</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 items-center px-2 border-b border-gray-700 pb-4 mt-3'>
                            <div>
                                <p className='text-sm'>Today</p>
                            </div>
                            <div className='flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className='text-sm font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className='text-sm'>36/22</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 items-center px-2 pb-2 mt-3'>
                            <div>
                                <p className='text-sm'>Today</p>
                            </div>
                            <div className='flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className='text-sm font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className='text-sm'>36/22</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Cities