import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='Footer' id='Footer'>
            <div className="Footer-content">
                <div className="Footer-content-left">
                    <img className='Footer-content-left-logo' src={assets.Fname} alt="" />
                    <p>Keeping Your Power Flowing Smoothly!<br/>From faulty wiring to complete electrical setups, our expert technicians have got you covered. Book your service now and experience the power of reliability!</p>
                    <div className="footer-socisl-icon">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="Footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivary</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="Footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <li>+91-915-502-9965</li>
                    <li>contact@electrofix.com</li>
                </div>
            </div>
            <hr />
            <p className="Footer-copyright">Copyright 2025 © Electrofix.com - All rights reserved.</p>
        </div>
    )
}

export default Footer
