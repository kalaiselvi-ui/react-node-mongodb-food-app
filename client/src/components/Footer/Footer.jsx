import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Footer.scss'

const Footer = () => {
    return (
        <div className='footer' id='footer'>

            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eveniet numquam amet odio inventore aspernatur unde commodi facere ducimus harum ullam eius modi et neque exercitationem iusto, eaque repellendus doloribus.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1234 134 78</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 @Tomato.com - All rights reserved.</p>
        </div>
    )
}

export default Footer