import React from 'react'

function Settings() {
    return (
        <div className='bg-[#0B131E] text-white w-full h-auto'>
            <h2>Units</h2>
            <div className='flex gap-[20px]  '>
                {/* main div jaha pe buttons or sari chezay aye gi div no 1 hai yeh
           
            */}
                <div className=' bg-[#202B3B]  max-w-screen-sm md:w-[600px] md:h-[400px] rounded-md py-[10px]  px-[5px] '>
                    <h2>Temperature</h2>
                    <div className='flex mt-[5px] gap-[10px]  justify-evenly bg-[#0B131E] px-[8px] py-[5px] rounded-md'>
                        <button className='bg-[#35455E] rounded-lg px-2  text-center  md:w-72'>celsius</button>
                        <button className='bg-[#35455E] rounded-lg px-2  text-center  md:w-72'>farenheit</button>
                    </div>
                    <h2 className='mt-[13px]'>wind speed</h2>
                    <div className='flex mt-[5px] justify-evenly  gap-[8px]  bg-[#0B131E] px-[7px] py-[5px] rounded-md'>
                        <button className='bg-[#35455E] rounded-lg  px-2 py-1 text-center md:w-56 '>kmh</button>
                        <button className='bg-[#35455E] rounded-lg  px-2 py-1 text-center md:w-56'>ms</button>
                        <button className='bg-[#35455E] rounded-lg  px-2 py-1 text-center md:w-56'>knots</button>

                    </div>
                    <h2 className='mt-[13px]'>pressure</h2>
                    <div className='flex  mt-[5px] shrink gap-[2px]  bg-[#0B131E] px-[7px] py-[6px] rounded-md'>
                        <button className='bg-[#35455E] rounded-lg  px-3 py-1 text-center  md:w-64'>hpa</button>
                        <button className='bg-[#35455E] rounded-lg  px-3 py-1 text-center  md:w-64'>inches</button>
                        <button className='bg-[#35455E] rounded-lg  px-3 py-1 text-center md:w-64'>kpa</button>
                        <button className='bg-[#35455E] rounded-lg  px-3 py-1 text-center  md:w-64'>mm</button>
                    </div>
                    <h2 className='mt-[13px]'>precipitation</h2>
                    <div className='flex mt-[5px] gap-[10px]  justify-evenly bg-[#0B131E] px-[8px] py-[5px] rounded-md'>
                        <button className='bg-[#35455E] rounded-lg px-2  text-center  md:w-72'>milimeter</button>
                        <button className='bg-[#35455E] rounded-lg px-2  text-center  md:w-72'>inches</button>
                    </div>
                    <h2 className='mt-[13px]'>distance</h2>
                    <div className='flex mt-[5px] gap-[10px] justify-evenly bg-[#0B131E] px-[8px] py-[5px] rounded-md'>
                        <button className='bg-[#35455E] rounded-lg px-2  text-center  md:w-72'>kilometer</button>
                        <button className='bg-[#35455E] rounded-lg px-2  text-center  md:w-72'>miles</button>
                    </div>

                </div>


                {/* 2 divs hai jo md per show hon gy */}
                <div className='hidden md:block'>
                    <div className='bg-[#202B3B] rounded-xl px-3 py-2 items-center text-center'>
                        <h1 className='text-xl font-semibold'>adavnced</h1>
                        <hr className='bg-[#B2281B] mt-[8px] ' />
                        <h2 className='text-start font-medium mt-4'>Get New Experience</h2>

                        <li className='text-start'>Ad free</li>
                        <li className='text-start'>Health activities overview</li>
                        <li className='text-start'>Severe weather notification</li>
                        <button className='bg-[#35455E] px-7 py-2 mt-2 rounded-lg font-semibold text-2xl '>$5.99 <span className='text-sm '>/month</span> </button>

                    </div>

                    <div className='bg-[#202B3B] px-3 py-2 mt-4 rounded-xl text-center'>
                        <h2 className='font-semibold py-1'>Never forget our umberlla!</h2>
                        <hr className='text-white' />
                        <p className='text-sm mt-3'>sign up for our daily weather newsletter <br /> personalized just for you</p>
                        <button className='bg-[#0095FF] rounded-full px-6 py-2  mt-4'>sign up</button>
                    </div>
                </div>
            </div>
            <h2 className=' mt-4'>Notification</h2>
            <div className='bg-[#202B3B] px-3 py-2 rounded-lg max-w-96 flex justify-between  mt-1'>
                <div className='text-sm '>
                    <h2 className='font-semibold' >Notification</h2>
                    <p>be aware of weather</p>
                </div>
                <div>
                    <label class="inline-flex items-center mb-5 cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" />
                        <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>

                </div>
            </div>

            <h2 className='mt-4'>General</h2>
            <div className='bg-[#202B3B] max-w-96 px-3 py-3 rounded-lg mt-1 '>
                <div className='flex justify-between'>
                    <h2 className='font-bold'>12-hour time</h2>

                    <label class="inline-flex items-center mb-5 cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" />
                        <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <hr className='mt-3' />
                <div className='flex justify-between mt-4'>
                    <div>
                        <h2 className='font-bold'>location</h2>
                        <p className='text-sm'>get weather of your location</p>
                    </div>
                    <div>

                        <label class="inline-flex items-center mb-5 cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" />
                            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                        </label>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Settings