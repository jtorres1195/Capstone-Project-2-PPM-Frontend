import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        const url = 'https://perfect-pet-match-backend-server.onrender.com/authRouter/login'; // URL for the login API

        try {
            console.log('Making API call...');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred during login.');
            }

            const data = await response.json();
            console.log('Login successful! Token:', data.token);

            localStorage.setItem('token', data.token);
            console.log('Login successful! Redirecting...');

            setEmail('');
            setPassword('');
            setError('');

            navigate('/userprofile');
        } catch (error) {
            console.error('Error during login:', error);
            setError(`Login failed: ${error.message}`);
        } finally {
            console.log("API call finished");
        }
    };

    return (
        <div className='login-container'>
            <h2 className='login-header'>Login</h2>
            {error && <p className='login-error'>{error}</p>}
            <form className='login-form' onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type='email'
                        placeholder='your_email@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='login-input'
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='login-input'
                    />
                </label>
                <br />
                <button type='submit' className='login-button'>Login</button>
            </form>
        </div>
    );
};

export default Login;
