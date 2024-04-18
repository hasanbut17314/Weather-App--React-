import React from 'react'
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCloudSunRain, faGear, faTemperatureThreeQuarters, faWind, faSun, faCloudRain, faDroplet, faEye, faBars } from '@fortawesome/free-solid-svg-icons'
import clear_png from '../pic/clear.png'
import drizzle_png from '../pic/drizzle.png'
import cloud_png from '../pic/cloud.png'
import humidity_png from '../pic/humidity.png'
import rain_png from '../pic/rain.png'
import search_png from '../pic/search.png'
import snow_png from '../pic/snow.png'
import wind_png from '../pic/wind.png'
import logo_png from '../pic/logo.png'
import toggleMenu from './togglefunc'
import { NavLink } from 'react-router-dom';

function Weather() {

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)
    const [city, setCity] = useState('--')
    const [temp, setTemp] = useState('--')
    const [rainchance, setRainchance] = useState('0%')
    const [currenticon, setCurrenticon] = useState(clear_png)
    const [feel, setFeel] = useState('--')
    const [wind, setWind] = useState('--')
    const [uv, setUv] = useState('--')
    const [hum, setHum] = useState('--')
    const [visb, setVisb] = useState('--')

    const APIkey = '1eddff9310d18c1db6301d708e4b1374';

    useEffect(() => {
        async function forecast() {
            try {
                setLoader(true);
                const coords = await requestLocationPermission();
                let response;
                if (coords) {
                    response = await fetchWeatherAPI(coords.latitude, coords.longitude);
                } else {
                    response = await fetchWeatherAPIWithoutPos(city);
                }

                setLoader(false);

                setTemp(response.main.temp);
                setCity(response.name);
                setUv(response.uvi);
                setRainchance(response.weather[0].main.rain);
                setHum(response.humidity);
                setVisb(response.visibility);
                setWind(Math.round(response.wind.speed * 3.6));
                setFeel(response.main.feels_like);

                setCurrenticon(getWeatherIcon(response.weather[0].icon));


            } catch (error) {
                setLoader(false)
                setError(error.message)
                console.log('error ocuured during fetch ', error)
            }
        }

        forecast();

    }, []);

    const getWeatherIcon = (iconCode) => {
        if (iconCode === '01d' || iconCode === '01n') {
            return (clear_png)
        } else if (iconCode === '02d' || iconCode === '02n') {
            return (cloud_png)
        } else if (iconCode === '03d' || iconCode === '03n') {
            return (drizzle_png)
        } else if (iconCode === '04d' || iconCode === '04n') {
            return (cloud_png)
        } else if (iconCode === '09d' || iconCode === '09n') {
            return (rain_png)
        } else if (iconCode === '10d' || iconCode === '10n') {
            return (rain_png)
        } else if (iconCode === '07d' || iconCode === '07n') {
            return (clear_png)
        } else if (iconCode === '13d' || iconCode === '13n') {
            return (snow_png)
        }
        else {
            return (clear_png)
        }
    };

    const requestLocationPermission = async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve(position.coords),
                    (error) => reject(new Error('Location permission denied'))
                );
            } else {
                reject(new Error('Geolocation is not supported'));
            }
        });
    };

    const fetchWeatherAPI = async (latitude, longitude) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return response.json();
    };

    const fetchWeatherAPIWithoutPos = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return response.json();
    };

    const handleRetry = () => {
        setError(null);
        forecast();
    };

    return (
        <>
            <div className='flex sm:flex-row flex-col'>
                {loader ? (
                    <div className='overlay'></div>
                ) : (null)
                }
                {loader ? (
                    <div className='spin-loader'>
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-[#2f2e2e4d] sm:h-32 sm:w-32 h-24 w-24"></div>
                    </div>
                ) : (null)
                }

                <aside className='bg-[#202B3B] text-[#9399a2ff] md:h-[94vh] h-auto md:w-[10%] mx-3 rounded-lg md:block hidden md:static absolute top-[72px] left-[-2px] md:z-auto z-50 md:shadow-none shadow-2xl shadow-gray-900 sideBar'>
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

                <section className='md:w-[65%] sm:w-[68%] sm:p-3 p-2 rounded-lg sm:mx-2'>

                    <div className='flex items-center'>
                        <button onClick={toggleMenu} className='block md:hidden text-gray-200 me-2'><FontAwesomeIcon className=' h-6 mt-2' icon={faBars} /></button>
                        <input className='bg-gray-700 placeholder:text-[#9399a2ff] rounded-md w-[80%] px-3 py-2 mt-1 outline-none text-gray-300' type="text" placeholder='Search for a city' onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className='flex justify-between px-4 py-2 text-gray-300 my-2 rounded-lg'>
                        <div>
                            <h1 className='text-2xl font-bold'>{city}</h1>
                            <span className='text-xs mb-3'>Chances of rain: {rainchance}</span>
                            <h1 className='text-3xl font-black mt-[50px]'>{temp}° C</h1>
                        </div>
                        <div>
                            <img className='sm:h-40 h-32' src={currenticon} />
                        </div>
                    </div>

                    <div className='bg-[#202B3B] text-[#9399a2ff] px-5 py-2 rounded-lg mb-3'>
                        <p className='text-xs font-bold mb-3'>Air Conditions</p>
                        <div className='grid md:grid-cols-3 grid-cols-2 place-items-center lg:gap-x-24 md:gap-x-16 md:gap-y-6 gap-y-5 md:ms-0 ms-5'>
                            <div className='flex flex-col items-center relative md:justify-self-auto justify-self-start'>
                                <span className='absolute text-[1.4em] right-[69px]'><FontAwesomeIcon icon={faTemperatureThreeQuarters} /></span>
                                <p className='text-sm mb-1'>Real Feel</p>
                                <p className='text-xl text-gray-300 font-bold'>{feel}°</p>
                            </div>
                            <div className='flex flex-col items-center relative md:justify-self-auto justify-self-end'>
                                <span className='absolute text-[1.2em] right-[62px]'><FontAwesomeIcon icon={faWind} /></span>
                                <p className='text-sm mb-1'>Wind</p>
                                <p className='text-xl text-gray-300 font-bold'>{wind} km/h</p>
                            </div>
                            <div className='flex flex-col items-center relative md:justify-self-auto justify-self-start'>
                                <span className='absolute text-[1.2em] right-[69px]'><FontAwesomeIcon icon={faSun} /></span>
                                <p className='text-sm mb-1'>UV Index</p>
                                <p className='text-xl text-gray-300 font-bold'>{uv}</p>
                            </div>
                            <div className='flex flex-col items-center relative md:justify-self-auto justify-self-end'>
                                <span className='absolute text-[1.2em] right-[101px]'><FontAwesomeIcon icon={faCloudRain} /></span>
                                <p className='text-sm mb-1'>Rain Chances</p>
                                <p className='text-xl text-gray-300 font-bold'>{rainchance}%</p>
                            </div>
                            <div className='flex flex-col items-center relative md:justify-self-auto justify-self-start'>
                                <span className='absolute text-[1.1em] right-[68px]'><FontAwesomeIcon icon={faDroplet} /></span>
                                <p className='text-sm mb-1'>Humidity</p>
                                <p className='text-xl text-gray-300 font-bold'>{hum}%</p>
                            </div>
                            <div className='flex flex-col items-center relative md:justify-self-auto justify-self-end'>
                                <span className='absolute text-[1.2em] right-[63px]'><FontAwesomeIcon icon={faEye} /></span>
                                <p className='text-sm mb-1'>Visibility</p>
                                <p className='text-xl text-gray-300 font-bold'>{visb}</p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-[#202B3B] text-[#9399a2ff] px-3 py-[11px] rounded-lg'>
                        <p className='text-xs font-bold mb-4'>Today's Forecast</p>
                        <div className='flex mt-2 overflow-auto'>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                            <div className='flex flex-col items-center justify-center mx-2 px-3 pe-5'>
                                <p className='text-sm mb-1'>6 AM</p>
                                <img className='h-[42px]' src={cloud_png} />
                                <p className='mt-2 text-lg text-white'>21°</p>
                            </div>
                        </div>
                    </div>

                </section>

                <section className='md:w-[25%] sm:w-[32%] bg-[#202B3B] text-[#9399a2ff] px-3 md:py-4 py-3 md:h-[94vh] rounded-lg mx-2 sm:mt-0 mt-4'>
                    <p className='text-xs font-bold mb-4 mt-1'>7 Days Forecast</p>
                    <div className='flex flex-col justify-evenly md:h-[98%] sm:h-[95%] md:text-xs sm:text-sm'>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 items-center px-2 border-b border-gray-500 pb-4'>
                            <div>
                                <p className=''>Today</p>
                            </div>
                            <div className='lg:flex sm:hidden flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className=' font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className=''>36/22</p>
                            </div>
                        </div>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 items-center px-2 border-b border-gray-500 pb-4 md:mt-4 mt-3'>
                            <div>
                                <p className=''>Tomorrow</p>
                            </div>
                            <div className='lg:flex sm:hidden flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className=' font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className=''>36/22</p>
                            </div>
                        </div>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 items-center px-2 border-b border-gray-500 pb-4 md:mt-4 mt-3'>
                            <div>
                                <p className=''>Today</p>
                            </div>
                            <div className='lg:flex sm:hidden flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className=' font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className=''>36/22</p>
                            </div>
                        </div>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 items-center px-2 border-b border-gray-500 pb-4 md:mt-4 mt-3'>
                            <div>
                                <p className=''>Today</p>
                            </div>
                            <div className='lg:flex sm:hidden flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className=' font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className=''>36/22</p>
                            </div>
                        </div>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 items-center px-2 border-b border-gray-500 pb-4 md:mt-4 mt-3'>
                            <div>
                                <p className=''>Today</p>
                            </div>
                            <div className='lg:flex sm:hidden flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className=' font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className=''>36/22</p>
                            </div>
                        </div>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 items-center px-2 border-b border-gray-500 pb-4 md:mt-4 mt-3'>
                            <div>
                                <p className=''>Today</p>
                            </div>
                            <div className='lg:flex sm:hidden flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className=' font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className=''>36/22</p>
                            </div>
                        </div>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 items-center px-2 pb-4 md:mt-4 mt-3'>
                            <div>
                                <p className=''>Today</p>
                            </div>
                            <div className='lg:flex sm:hidden flex items-center'>
                                <img className='h-9 me-1' src={clear_png} />
                                <p className=' font-semibold text-gray-300'>Sunny</p>
                            </div>
                            <div className='grid justify-self-end'>
                                <p className=''>36/22</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Weather