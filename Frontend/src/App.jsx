import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './Pages/Start'
import UserLogin from './Pages/UserLogin'
import UserRegister from './Pages/UserRegister'
import Home from './Pages/Home'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainRegister from './Pages/CaptainRegister'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/captain-login" element={<CaptainLogin/>} />
        <Route path="/captain-register" element={<CaptainRegister />} />
      </Routes>
    </div>
  )
}

export default App