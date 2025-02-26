import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import Button from '../Button/Button'
import './LoginPopup.scss'
const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Sign Up");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setUserData((data) => ({ ...data, [name]: value }))

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        console.log('mount')
        return () => {
            document.body.style.overflow = 'auto'
            console.log('unmount')
        }
    }, [])

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;

        if (currentState === 'Login') {
            newUrl += '/api/user/login'
        }
        else {
            newUrl += '/api/user/register'
        }
        const response = await axios.post(newUrl, userData);
        console.log("Response Headers:", response.headers);
        console.log("Response Data:", response.data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("tokenfood", response.data.token);
            setShowLogin(false);
            toast.success(response.data.message)
        }
        else {
            // alert(response.data.message)
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form action="" onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon}
                        onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Sign Up' && (
                        <input type="text" onChange={onChangeHandler} value={userData.name} name="name" placeholder='Your name' required />
                    )}
                    <input onChange={onChangeHandler} value={userData.email} name='email' type="email" placeholder='Your email' required />
                    <input type="password" onChange={onChangeHandler} value={userData.password} name='password' placeholder='Password' required />
                </div>
                <Button type="submit" text={currentState === 'Sign Up' ? "Create Account" : "Login"} bgColor={'tomato'} color={'white'} style={{ width: '100%', borderRadius: '4px' }} />
                {
                    currentState === "Sign Up" && (
                        <div className="login-popup-condition">
                            <input type="checkbox" required />
                            <p>By Continuing i agree to the terms of use & privacy policy</p>
                        </div>
                    )
                }
                {
                    currentState === 'Login' ? (
                        <p>Create a new Account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>)
                        : (
                            <p>Already have an account?<span onClick={() => setCurrentState("Login")}>Login Here</span></p>


                        )
                }

            </form>

        </div>
    )
}

export default LoginPopup