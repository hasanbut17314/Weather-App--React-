import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo_png from '../pic/logo.png'
import { faList, faCloudSunRain, faGear } from '@fortawesome/free-solid-svg-icons'

function HeadBar() {
    return (
        <nav className='bg-[#202B3B] text-[#9399a2ff] h-auto mx-3 rounded-lg md:block md:z-auto z-50 md:shadow-none shadow-2xl shadow-gray-900 md:mb-7 mb-4'>
            <ul className='nav-cont md:px-10 px-4 py-2 flex justify-between'>
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
        </nav>
    )
}

export default HeadBar