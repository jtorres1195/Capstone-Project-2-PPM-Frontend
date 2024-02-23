import React from 'react';
import './Home.css';

function HomePage() {
    return (
        <div className='home-container'>
            <img src='/logo.jpg' alt='Logo' className='logo' />
            <h1 className='home-title'>Perfect Pet Match</h1>
            <h3 className='home-description'>
                Welcome to Perfect Pet Match!
                Discover your perfect pet! Browse through our selection of animals and find the perfect buddy for you!
            </h3>
        </div>
    );
}

export default HomePage;
