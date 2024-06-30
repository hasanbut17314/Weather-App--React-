import { useState } from 'react'
import Weather from './comp/Weather'
import Cities from './comp/cities'
import Settings from './comp/Settings'
import GetStarted from './comp/getStarted'
import Error from './comp/404'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/settings' element={<Settings />} />
        <Route path='/weather' element={<Weather />} />
        <Route path='/cities' element={<Cities />} />
        <Route path='/' element={<GetStarted />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
