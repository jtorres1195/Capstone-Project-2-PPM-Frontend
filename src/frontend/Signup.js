import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || password !== confirmPassword) {
            setError('Please fill in all required fields and ensure passwords match');
            return;
        }

        const url = 'https://perfect-pet-match-backend-server.onrender.com/authRouter/signup';  // Backend URL for the signup endpoint
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Signup failed.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Internal server error. Please try again later.');
        }
    };

    return (
        <div className='signup-container'>
            <h2 className='signup-header'>Signup</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className='signup-form' onSubmit={handleSignup}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='signup-input' />
                </label>
                <br />
                <label>
                    Email:
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='signup-input' />
                </label>
                <br />
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='signup-input' />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='signup-input' />
                </label>
                <br />
                <button type='submit' className='signup-button'>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
