import logo_png from '../pic/logo.png'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function GetStarted() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <>
            <div className='lg:h-[94vh] h-auto flex md:flex-row flex-col items-center '>
                <div className='bg-[#202B3B] text-[#b1bdcd] md:h-[80%] rounded-lg md:w-[45%] md:flex flex-col items-center justify-center p-3 hidden'>
                    <img className='md:h-[270px]' src={logo_png} alt="logo" />
                    <p className='text-sm text-center my-3'>"Welcome to Hammy's Weather, where every forecast is a ray of sunshine! Get ready to embark on a meteorological adventure with us as we bring you real-time weather updates with a sprinkle of charm. From clear skies to stormy nights, Hammy's Weather has you covered, ensuring you're always one step ahead of Mother Nature. Join us and discover weather forecasts like never before, tailored just for you."</p>
                </div>
                <div className='md:w-[50%] md:h-[65%] sm:h-[300px] h-[400px] flex flex-col items-center justify-around text-[#b1bdcd] px-4'>
                    <div>
                        <img className='h-20' src={logo_png} />
                        <p className='text-xs text-gray-400 font-semibold'>Weather App</p>
                    </div>
                    <q className='text-center text-sm'>note: all the displayed data including weather predictions, air conditions and alerts in this app are provided by <a className='underline' href='https://www.weatherapi.com/'>weatherapi</a>. credits and copyrights are subject to weatherapi.com's Api which is accessible for anyone on their platform</q>
                    <div className='flex flex-col'>
                        <div>
                            <input className='me-2' onChange={handleCheckboxChange} checked={isChecked} type='checkbox' id='privacy' required /> <label>I accept <a href='https://www.weatherapi.com/privacy.aspx' className='text-blue-400 underline'>Privacy and Policy</a> before using Hammy's Weather App</label>
                        </div>
                        <div className='flex justify-center'>
                            <button className={`bg-[#05999c] text-white py-2 px-3 rounded-3xl mt-4 self-center ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`} id='getStart'>
                                {isChecked ? (
                                    <NavLink
                                        to='/weather'
                                    >
                                        Get Started
                                    </NavLink>
                                ) : (
                                    <span>
                                        Get Started
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetStarted