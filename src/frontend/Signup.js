import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    //State to track user inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //Function to handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || password !== confirmPassword) {
            setError('Please fill in all required fields and ensure passwords match');
            return;
    }

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                // Redirect to login page or any other page after successful signup
                navigate.push('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Signup failed.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Internal server error. Please try again later');
        }
    };

    return (
        <div className='signup-container'>
            <h2 className='signup-header'>Signup</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <form className='signup-form' onSubmit={handleSignup}>
                <label className='signup-label'>
                    Username:
                    <input type='text' 
                    value={username} onChange={(e) => setUsername(e.target.value)} 
                    className='signup-input'
                    />
                </label>
                <br />
                <label className='signup-label'>
                    Email:
                    <input type='email' 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    className='signup-input'
                    />
                </label>
                <br />
                <label className='signup-label'>
                    Password:
                    <input type='password' 
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                    className='signup-input'
                    />
                </label >
                <label className='signup-label'>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='signup-input'
                    />
                </label>
                <button className='signup-button' type='submit'>Sign Up</button>
            </form>
        </div >
    );
}
export default Signup;
