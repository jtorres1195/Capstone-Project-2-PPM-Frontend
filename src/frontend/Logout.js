import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
    }, []);

    const logoutUser = async () => {
        const url = 'http://localhost:3001/authRouter/logout';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/logout-success');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='logout-container'>
            <h2 className='logout-heading'>Logging out...</h2>
        </div>
    );
};

export default Logout;
