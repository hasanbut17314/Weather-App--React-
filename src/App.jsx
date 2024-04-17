import { useState } from 'react'
import Weather from './comp/Weather'
import Cities from './comp/cities'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/weather' element={<Weather />} />
        <Route path='/cities' element={<Cities />} />
      </Routes>
    </Router>
  )
}

export default App
