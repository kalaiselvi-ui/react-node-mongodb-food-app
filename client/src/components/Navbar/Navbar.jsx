import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.scss';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { food_list, cartItems, getTotalItemCount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Updated Token in Context:", token);
    }, [token]);

    const Logout = () => {
        localStorage.removeItem("tokenfood");
        setToken("");
        navigate("/");
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
            <ul className="navbar-menu">
                <Link onClick={() => setMenu("home")} className={menu === 'home' ? "active" : ""}>home</Link>
                <a href='#category' onClick={() => setMenu("menu")} className={menu === 'menu' ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === 'mobile-app' ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? "active" : ""}>contact-us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <Link to="/cart" className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="" />
                    <div className={getTotalItemCount() === 0 ? "" : "dot"}>
                        {getTotalItemCount() > 0 && <div>{getTotalItemCount()}</div>}
                    </div>
                </Link>
                {
                    !token ? <button onClick={() => setShowLogin(prev => !prev)}>sign in</button> : (
                        <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="" />
                            <ul className='nav-profile-dropdown'>
                                <li onClick={() => navigate('/myorders')}>
                                    <img src={assets.bag_icon} alt="" />
                                    <p>Orders</p>
                                </li>
                                <hr />
                                <li onClick={Logout}>
                                    <img src={assets.logout_icon} alt="" />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )

                }

            </div>
        </div >
    )
}

export default Navbar