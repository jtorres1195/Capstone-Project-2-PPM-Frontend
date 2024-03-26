import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    // State to track user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            console.log('Making API call...');
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Response status:', response.status);

            // Check if the response is successful
            if (!response.ok) {
                const errorData = await response.json(); // Parsing the response body to get more detailed error message
                throw new Error(errorData.message || 'An unknown error occurred during login.');
            }

            const data = await response.json();
            console.log('Login successful! Token:', data.token);

            // Store the token securely and redirect the user
            localStorage.setItem('token', data.token);
            console.log('Login successful! Redirecting...');

            // Reset the form inputs
            setEmail('');
            setPassword('');
            setError(''); 

            console.log("Before navigate");
            navigate('/userprofile');
            console.log("After navigate"); 
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
