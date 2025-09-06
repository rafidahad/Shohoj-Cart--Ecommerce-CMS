//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login/Login'
import Signup from './components/SignUp/Signup'
import {Routes, Route, Navigate} from 'react-router-dom'

function App() {
//  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path='/login' element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
