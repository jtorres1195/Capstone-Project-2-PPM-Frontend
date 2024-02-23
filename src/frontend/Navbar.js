import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('userToken');
        setIsLoggedIn(false);
        navigate.push('/login');
    }

    return (
        <nav>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/about">About</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/adopt">Adopt</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/species">Species</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/emailSubscriptions">Subscribe</Link>
                </li>
                {isLoggedIn ? (
                    <li className="navbar-item">
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                <div className='login-section'>
                    <Link to="/login">Login</Link>
                    <span className='divider'>|</span>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
            </ul>
        </nav>
    );
}

export default Navbar;