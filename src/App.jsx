import { useState } from 'react'
import Weather from './comp/Weather'
import Cities from './comp/cities'
import GetStarted from './comp/getStarted'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/weather' element={<Weather />} />
        <Route path='/cities' element={<Cities />} />
        <Route path='/' element={<GetStarted />} />
      </Routes>
    </Router>
  )
}

export default App
