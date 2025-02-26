import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import Button from '../Button/Button'
import './Hero.scss'

const Hero = () => {
    return (
        <div className='hero-section' style={{ backgroundImage: `url(${assets.header_img})` }}>
            <div className="hero-content">
                <h2>Order your favorite food here</h2>
                <p>choose from a diverse menu featuring a deletable array of dishes crafted with the finest ingredients and culinary expertise.
                    Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                <Button text={"View Menu"} color={"#747474"} bgColor={"#fff"} />
            </div>

        </div>
    )
}

export default Hero