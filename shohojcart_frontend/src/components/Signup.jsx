import React from 'react'
import './Signup.css'
import user_icon from '../assets/person.png'
import password_icon from '../assets/password.png'
import email_icon from '../assets/email.png'
import { useNavigate, useLocation } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <div className='container'>
        <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>

        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Name'/>
            </div>
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Email'/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Password'/>
            </div>
        </div>

        <div className="submit-container">
            <div className={location.pathname === "/signup" ? "submit gray" : "submit"}>Sign Up</div>
            <div className={location.pathname === "/login" ? "submit gray" : "submit"} onClick={() => navigate("/login")}>Login</div>
        </div>
    </div>
  )
}

export default Signup