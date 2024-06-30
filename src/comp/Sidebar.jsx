import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo_png from '../pic/logo.png'
import { faList, faCloudSunRain, faGear } from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
    return (
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
    )
}

export default Sidebar