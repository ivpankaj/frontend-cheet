import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'
import Home from './components/Home'
import VideoSection from './components/VideoSection'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path='/' exact element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/videos' element={<VideoSection/>}/>
      </Routes>
    </Router>
  )
}

export default App
