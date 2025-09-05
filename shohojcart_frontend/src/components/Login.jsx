import React from 'react'
import './Login.css'
import password_icon from '../assets/password.png'
import email_icon from '../assets/email.png'
import { useNavigate, useLocation } from 'react-router-dom'

function Login() {
    
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <div classname="container">
        <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
        </div>

        <div className="inputs">
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Email'/>
            </div>
             <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Password'/>
            </div>
        </div>

        <div className="forgot-password">
            Lost password? <span>Click here!</span>
        </div>

        <div className="submit-container">
            <div className={location.pathname === "/signup" ? "submit gray" : "submit"} onClick={() => navigate("/signup")}>Sign Up</div>
            <div className={location.pathname === "login" ? "submit gray" : "submit"}>Login</div>
        </div>
    </div>
  )
}

export default Login