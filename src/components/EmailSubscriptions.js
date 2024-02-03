import React, { useState } from 'react';

const EmailSubscriptions = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        setSubscribed(true);
    };

    return (
        <div>
            <h2>Email Subscriptions</h2>
            {subscribed ? (
                <p>Thank you for subscribing! You will receive updates via email.</p>
            ) : (
                <div>
                    <p> Subscribe to receive updates via email: </p>
                    <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleSubscribe}>Subscribe</button>
                </div>
        )}
        </div>
    )
}


export default EmailSubscriptions;