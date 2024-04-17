import React from 'react'
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCloudSunRain, faGear, faTemperatureThreeQuarters, faWind, faSun, faCloudRain, faDroplet, faEye } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import logo_png from '../pic/logo.png'

function Cities() {
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

                </section>

                <section className='w-[35%] bg-[#202B3B] text-[#9399a2ff] p-3 h-[96vh] rounded-lg mx-2'>

                </section>

            </div>
        </>
    )
}

export default Cities