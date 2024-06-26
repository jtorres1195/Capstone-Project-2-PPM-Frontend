import React, { useState } from 'react';
import './EmailSubscriptions.css';

const EmailSubscriptions = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState(null);

    const handleSubscribe = async () => {
        try {
            const response = await fetch('https://perfect-pet-match-backend-server.onrender.com/emailSubscription/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            setSubscribed(true);
            setError(null);
        } catch (error) {
            setError('Subscription failed: ' + error.message);
        }
    };

    return (
        <div className='subscribe-container'>
            <h2 className='subscribe-header'>Email Subscriptions</h2>
            {error && <p className='subscribe-error'>{error}</p>}
            {subscribed ? (
                <p className='subscribe-description'>Thank you for subscribing! You will receive updates via email.</p>
            ) : (
                <div>
                    <p className='subscribe-description'> Subscribe to receive updates via email: </p>
                    <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='subscribe-input'
                    />
                    <button className='subscribe-button' onClick={handleSubscribe}>Subscribe</button>
                </div>
        )}
        </div>
    )
}


export default EmailSubscriptions;