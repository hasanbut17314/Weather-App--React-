import { useState } from 'react'
import Weather from './comp/Weather'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/weather' component={Weather} />
        {/* <Route path='/cities' component={CitiesPage} />
        <Route path='/settings' component={SettingsPage} /> */}
      </Routes>
    </Router>
  )
}

export default App
