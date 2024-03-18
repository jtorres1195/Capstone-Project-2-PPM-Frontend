import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Logout.css'

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        logoutUser();
    }, []);

    const logoutUser = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Logout successful, navigate to the logout success page
                history.push('/logout-success');
            } else {
                // Handle logout failure
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
}

export default Logout;
