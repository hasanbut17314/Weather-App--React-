import React from 'react'
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clear_png from '../pic/clear.png'
import toggleMenu from './togglefunc'
import Sidebar from './Sidebar';

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

    const [seacrhBtn, setSeacrhBtn] = useState(false);

    function handleInputChange(event) {
        let city_input = document.querySelector('.city_input');
        if (city_input.value !== '') {
            setSeacrhBtn(true);
            city_input.classList.add('rounded-e-none');
            setCity(event.target.value);
        } else {
            setSeacrhBtn(false)
            setCity('--')
            city_input.classList.remove('rounded-e-none');
        }
    }

    const handleSearch = async () => {
        try {
            await forecastManual(city);
            document.querySelector('.city_input').value = '';
            setSeacrhBtn(false)
            document.querySelector('.city_input').classList.remove('rounded-e-none');
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    };

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)
    const [city, setCity] = useState('--')
    const [currenticon, setCurrenticon] = useState(clear_png)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [hourlyForecast, setHourlyForecast] = useState([])
    const [dailyForecast, setDailyForecast] = useState([])

    const APIkey = 'b0b6594716633c6e963fd8724166bc0a';

    async function forecast() {
        try {

            setLoader(true);
            const coords = await requestLocationPermission();
            let currentWeatherData;
            let hourlyForecastData;
            let dailyForecastData;

            if ((coords !== undefined || coords !== null) && city === '--') {

                const currentWeatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${coords.latitude + ',' + coords.longitude}`);
                currentWeatherData = await currentWeatherResponse.json();
                const hourlyForecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${coords.latitude + ',' + coords.longitude}&days=1&aqi=no&alerts=no`);
                hourlyForecastData = await hourlyForecastResponse.json();
                const dailyForecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${coords.latitude + ',' + coords.longitude}&days=7&aqi=no&alerts=no`);
                dailyForecastData = await dailyForecastResponse.json();
                setCity(currentWeatherData.location.name);

            }

            setLoader(false);
            setCurrentWeather(currentWeatherData.current);
            setHourlyForecast(hourlyForecastData.forecast.forecastday[0].hour);
            setDailyForecast(dailyForecastData.forecast.forecastday.splice(0, 7));

            setCurrenticon(getWeatherIcon(currentWeatherData.current.condition.code));


        } catch (error) {
            setLoader(false)
            console.log('error ocuured during fetch ', error)
        }
    }

    async function forecastManual(city) {
        try {
            setError(null);
            setLoader(true);
            let currentWeatherData;
            let hourlyForecastData;
            let dailyForecastData;

            const currentWeatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}`);
            currentWeatherData = await currentWeatherResponse.json();
            const hourlyForecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${city}&days=1&aqi=no&alerts=no`);
            hourlyForecastData = await hourlyForecastResponse.json();
            const dailyForecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${city}&days=10&aqi=no&alerts=no`);
            dailyForecastData = await dailyForecastResponse.json();

            setLoader(false);
            if (!currentWeatherResponse.ok || !hourlyForecastResponse.ok || !dailyForecastResponse.ok) {
                setError("City not found");
                setCity("--");
                toast.error('City Not Found! Please Try Again');
            }
            else {
                setCurrentWeather(currentWeatherData.current);
                setHourlyForecast(hourlyForecastData.forecast.forecastday[0].hour);
                setDailyForecast(dailyForecastData.forecast.forecastday.splice(0, 7));

                setCurrenticon(getWeatherIcon(currentWeatherData.current.condition.code));
            }
        } catch (error) {
            setLoader(false)
            console.log('Error occurred during fetch ', error)
        }
    }

    useEffect(() => {

        forecast();

    }, []);

    const getWeatherIcon = (iconCode) => {
        if (iconCode === 1000) {
            return clear_png;
        } else if (iconCode === 1003 || iconCode === 1006 || iconCode === 1009) {
            return cloud_png;
        } else if (iconCode === 1030 || iconCode === 1135 || iconCode === 1147) {
            return humidity_png;
        } else if (iconCode === 1063 || iconCode === 1069 || iconCode === 1072 || iconCode === 1150 || iconCode === 1153 || iconCode === 1168 || iconCode === 1171 || iconCode === 1180 || iconCode === 1183 || iconCode === 1186 || iconCode === 1240 || iconCode === 1249) {
            return drizzle_png;
        } else if (iconCode === 1087 || iconCode === 1189 || iconCode === 1192 || iconCode === 1195 || iconCode === 1198 || iconCode === 1201 || iconCode === 1243 || iconCode === 1246 || iconCode === 1273 || iconCode === 1276) {
            return rain_png;
        } else if (iconCode === 1066 || iconCode === 1114 || iconCode === 1117 || iconCode === 1204 || iconCode === 1207 || iconCode === 1210 || iconCode === 1213 || iconCode === 1216 || iconCode === 1219 || iconCode === 1222 || iconCode === 1225 || iconCode === 1237 || iconCode === 1252 || iconCode === 1255 || iconCode === 1258 || iconCode === 1261 || iconCode === 1264 || iconCode === 1279 || iconCode === 1282) {
            return snow_png;
        } else {
            return clear_png;
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

    const renderHourlyForecast = () => {                
    
        return hourlyForecast.map((hourData, index) => (
            <div key={index} className='flex flex-col items-center justify-center mx-2 border-e border-[#9399a271] ps-2.5 pe-[27px]'>
                <p className='text-sm mb-1'>{getHourText(index)}</p>
                <img className='min-w-[60px]' src={hourData.condition.icon} alt='Weather Icon' />
                <p className='mt-2 text-lg text-white'>{Math.round(hourData.temp_c)}°</p>
            </div>
        ));
    };    

    const getHourText = (index) => {
        const forecastHour = index;
        const period = forecastHour < 12 ? 'AM' : 'PM';
        const displayHour = forecastHour === 0 ? 12 : forecastHour % 12;
        return `${displayHour} ${period}`;
    };

    const renderdailyForecast = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const todayIndex = new Date().getDay(); 

        return dailyForecast.map((dailyData, i) => 
        i < 3 ?
        (
            <div key={i} className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 items-center px-2 border-b border-gray-500 pb-4 mt-2 last:border-b-0'>
                <div>
                    <p className=''>{i === 0 ? 'Today' : days[(todayIndex + i) % 7]}</p>
                </div>
                <div className='lg:flex sm:hidden flex items-center'>
                    <img className='h-9 me-1' src={dailyData.day.condition.icon} />
                    <p className='text-sm md:text-xs font-semibold text-gray-300'>{dailyData.day.condition.text}</p>
                </div>
                <div className='grid justify-self-end'>
                    <p className=''>{Math.round(dailyData.day.maxtemp_c)+'/'+Math.round(dailyData.day.mintemp_c)}</p>
                </div>
            </div>
        ) : null
    );
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

                <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />

                <Sidebar />

                <section className='md:w-[55%] sm:w-[58%] p-3 rounded-lg md:mx-2'>

                    <div className='flex items-center'>
                        <button onClick={toggleMenu} className='block md:hidden text-gray-200 me-2'><FontAwesomeIcon className=' h-6 mt-2' icon={faBars} /></button>
                        <input className='bg-gray-700 placeholder:text-[#9399a2ff] rounded-md w-[80%] px-3 py-2 mt-1 outline-none text-gray-300 city_input' type="text" placeholder='Search for a city' onChange={handleInputChange} />
                        {seacrhBtn ? (
                            <button className='px-3 py-2 rounded-s-none border-s border-gray-500 rounded-md bg-gray-700 text-gray-300 mt-1 search_city_btn' onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        ) : (
                            null
                        )}
                    </div>

                    <div className='py-3'>
                        <div className='flex items-center bg-[#202B3B] text-[#bbc2cd] py-2 md:px-5 px-4 rounded-lg mt-2'>
                            <img className='sm:h-28 h-[88px]' src={clear_png} />
                            <div className='ms-3'>
                                <p className='text-xl font-bold'>Madrid</p>
                                <small>{CurrentHour + ":" + CurrentMin}</small>
                            </div>
                            <p className='ms-auto text-2xl font-semibold'>31°</p>
                        </div>
                        <div className='flex items-center bg-[#202B3B] text-[#bbc2cd] py-2 md:px-5 px-4 rounded-lg md:my-5 my-4'>
                            <img className='sm:h-28 h-[88px]' src={clear_png} />
                            <div className='ms-3'>
                                <p className='text-xl font-bold'>Lahore</p>
                                <small>{CurrentHour + ":" + CurrentMin}</small>
                            </div>
                            <p className='ms-auto text-2xl font-semibold'>37°</p>
                        </div>
                        <div className='flex items-center bg-[#202B3B] text-[#bbc2cd] py-2 md:px-5 px-4 rounded-lg'>
                            <img className='sm:h-28 h-[88px]' src={clear_png} />
                            <div className='ms-3'>
                                <p className='text-xl font-bold'>Karachi</p>
                                <small>{CurrentHour + ":" + CurrentMin}</small>
                            </div>
                            <p className='ms-auto text-2xl font-semibold'>45°</p>
                        </div>
                    </div>

                </section>

                <section className='md:w-[35%] sm:w-[42%] text-gray-300 md:px-[40px] px-4 md:py-5 py-4 sm:h-[94vh] rounded-lg mx-2 sm:overflow-y-auto scroll-none'>
                    <div className='flex justify-between md:px-3 px-2'>
                        <div>
                            <h1 className='text-2xl font-bold'>{city}</h1>
                            <span className='text-xs mb-3'>rain: {
                                currentWeather !== null ? (currentWeather.precip_mm + " mm") : ('--')
                            }</span>
                            <h1 className='text-3xl font-black mt-[23px]'>{
                                currentWeather !== null ? (currentWeather.temp_c + "° C") : ('--')
                            }</h1>
                        </div>
                        <div>
                            <img className='sm:h-32 lg:h-24 md:h-16' src={currenticon} />
                        </div>
                    </div>
                    <hr className='my-4 border-gray-500' />
                    <div className='py-4'>
                        <p className='text-xs font-bold mb-4'>Today's Forecast</p>
                        <div className='flex mt-2 overflow-x-auto today_forecast'>
                            {hourlyForecast.length !== 0 ? renderHourlyForecast() : (
                                <div>
                                    <p className='w-full flex justify-center items-center'>Select City to see Forecast</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className='my-4 border-gray-500' />
                    <div>
                        <p className='text-xs font-bold mb-3'>3 Days Forecast</p>
                        <div className='flex flex-col justify-evenly md:text-xs sm:text-sm'>
                            {renderdailyForecast()}
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Cities
