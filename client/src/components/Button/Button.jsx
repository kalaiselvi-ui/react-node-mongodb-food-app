import React from 'react'
import './Button.scss'

const Button = ({ text, color, bgColor, onClick, style, type }) => {
    return (
        <div>
            <button className='button'
                type={type}
                style={{ color: color, backgroundColor: bgColor, ...style }}
                onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button