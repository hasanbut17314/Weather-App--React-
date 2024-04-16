import React from 'react'
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCloudSunRain, faGear, faTemperatureThreeQuarters, faWind, faSun, faCloudRain, faDroplet, faEye } from '@fortawesome/free-solid-svg-icons'
import clear_png from '../pic/clear.png'
import drizzle_png from '../pic/drizzle.png'
import cloud_png from '../pic/cloud.png'
import humidity_png from '../pic/humidity.png'
import rain_png from '../pic/rain.png'
import search_png from '../pic/search.png'
import snow_png from '../pic/snow.png'
import wind_png from '../pic/wind.png'
import logo_png from '../pic/logo.png'
import cloud_sun_svg from '../pic/cloud-sun.svg'
import settings_svg from '../pic/settings.svg'
import list_svg from '../pic/list.svg'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Weather() {
    const [city, setCity] = useState('')
    const [weath, setWeath] = useState()
    const [hum, setHum] = useState()
    const [wind_speed, setWind_speed] = useState()
    const [feel, setFeel] = useState()
    const [wicon, setWicon] = useState(clear_png)

    const APIkey = 'f2942864e918718af8feace11cec0d7f'
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`

    async function forecast() {
        try {
            const response = await fetch(api)
            const data = await response.json()
            console.log(data)
            setCity(data.city.name)
            setWeath(Math.floor(data.list[0].main.temp - 273.15)) // temp in C
            setHum(data.list[0].main.humidity)
            setWind_speed(data.list[0].wind.speed)
            setFeel(Math.floor(data.list[0].main.feels_like - 273.15)) // feels like
            setWicon(data.list[0].weather[0].icon)


            if (data.list[0].weather[0].icon === '01d' || data.list[0].weather[0].icon === '01n') {
                setWicon(clear_png)
            } else if (data.list[0].weather[0].icon === '02d' || data.list[0].weather[0].icon === '02n') {
                setWicon(cloud_png)
            } else if (data.list[0].weather[0].icon === '03d' || data.list[0].weather[0].icon === '03n') {
                setWicon(drizzle_png)
            } else if (data.list[0].weather[0].icon === '04d' || data.list[0].weather[0].icon === '04n') {
                setWicon(cloud_png)
            } else if (data.list[0].weather[0].icon === '09d' || data.list[0].weather[0].icon === '09n') {
                setWicon(rain_png)
            } else if (data.list[0].weather[0].icon === '10d' || data.list[0].weather[0].icon === '10n') {
                setWicon(rain_png)
            } else if (data.list[0].weather[0].icon === '07d' || data.list[0].weather[0].icon === '07n') {
                setWicon(clear_png)
            } else if (data.list[0].weather[0].icon === '13d' || data.list[0].weather[0].icon === '13n') {
                setWicon(snow_png)
            }
            else{
                setWicon(clear_png)
            }
        } catch (error) {
            console.log('error ocuured during fetch ', error)
        }
    }

    useEffect(() => {
        if (!city) {
            forecast()
        }
    }, [city])


    return (
        <>
        <div className='flex'>

           <aside className='bg-[#202B3B] text-[#9399a2ff] h-[96vh] w-[10%] mx-3 rounded-lg'>
                <ul className='nav-cont px-2 py-2'>
                    <li className='m-logo'> <img className='h-logo' src={logo_png} /> </li>
                    <li><a className='py-[14px] px-[9px] text-white font-semibold' href='#'> <FontAwesomeIcon className='text-xl mb-2' icon={faCloudSunRain} /> Weather</a> </li>
                    <li><a className='py-[12px] px-[15px]' href='#'> <FontAwesomeIcon className='text-xl mb-2' icon={faList} /> Cities</a> </li>
                    <li><a className='py-[12px] px-[9px]' href='#'> <FontAwesomeIcon className='text-xl mb-2' icon={faGear} /> Settings </a></li>
                </ul>
           </aside>

           <section className='w-[65%] p-3 rounded-lg mx-2'>

                <div>
                    <input className='bg-gray-700 placeholder:text-[#9399a2ff] rounded-md w-[80%] px-3 py-2 mt-1 outline-none text-gray-300' type="text" placeholder='Search for a city' onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className='flex justify-between p-4 text-gray-300 my-3 rounded-lg'>
                    <div>
                        <h1 className='text-2xl font-bold'>Madrid</h1>
                        <span className='text-xs mb-3'>Chances of rain: 0%</span>
                        <h1 className='text-3xl font-black mt-[50px]'>31° C</h1>
                    </div>
                    <div>
                        <img className='h-40' src={clear_png} />
                    </div>
                </div>

                <div className='bg-[#202B3B] text-[#9399a2ff] px-5 py-2 rounded-lg mb-3'>
                    <p className='text-xs font-bold mb-3'>Air Conditions</p>
                    <div className='flex justify-between px-[1.6rem] mb-3'>
                        <div className='flex flex-col items-center relative'>
                            <span className='absolute text-[1.4em] right-[69px]'><FontAwesomeIcon icon={faTemperatureThreeQuarters} /></span>
                            <p className='text-sm mb-1'>Real Feel</p>
                            <p className='text-xl text-gray-300 font-bold'>31° C</p>
                        </div>
                        <div className='flex flex-col items-center relative'>
                            <span className='absolute text-[1.2em] right-[62px]'><FontAwesomeIcon icon={faWind} /></span>
                            <p className='text-sm mb-1'>Wind</p>
                            <p className='text-xl text-gray-300 font-bold'>2 km/h</p>
                        </div>
                        <div className='flex flex-col items-center relative'>
                            <span className='absolute text-[1.2em] right-[69px]'><FontAwesomeIcon icon={faSun} /></span>
                            <p className='text-sm mb-1'>UV Index</p>
                            <p className='text-xl text-gray-300 font-bold'>2</p>
                        </div>
                    </div>
                    <div className='flex justify-between px-[1.6rem] mt-[30px]'>
                        <div className='flex flex-col items-center relative'>
                            <span className='absolute text-[1.2em] right-[101px]'><FontAwesomeIcon icon={faCloudRain} /></span>
                            <p className='text-sm mb-1'>Rain Chances</p>
                            <p className='text-xl text-gray-300 font-bold'>30%</p>
                        </div>
                        <div className='flex flex-col items-center relative'>
                            <span className='absolute text-[1.2em] right-[72px]'><FontAwesomeIcon icon={faDroplet} /></span>
                            <p className='text-sm mb-1'>Humidity</p>
                            <p className='text-xl text-gray-300 font-bold'>40%</p>
                        </div>
                        <div className='flex flex-col items-center relative'>
                            <span className='absolute text-[1.2em] right-[63px]'><FontAwesomeIcon icon={faEye} /></span>
                            <p className='text-sm mb-1'>Visibility</p>
                            <p className='text-xl text-gray-300 font-bold'>10 km</p>
                        </div>
                    </div>
                </div>

                <div className='bg-[#202B3B] text-[#9399a2ff] px-3 py-[11px] rounded-lg'>
                    <p className='text-xs font-bold mb-4'>Today's Forecast</p>
                    <div className='flex mt-2'>
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

           <section className='w-[25%] bg-[#202B3B] text-[#9399a2ff] p-3 h-[96vh] rounded-lg mx-2'>

           </section>

        </div>
        </>
    )
}

export default Weather