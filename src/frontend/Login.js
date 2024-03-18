import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    // State to track user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check if the response is successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // If successful, extract the token from the the response
            const data = await response.json();
            console.log('Login successful! Token:', data.token);
        } catch (error) {
            setError('Login failed: ', error.message);
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
