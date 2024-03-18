import React, { useState, useEffect } from 'react';
import './Home.css';

function HomePage() {
    const [featuredPets, setFeaturedPets] = useState([]);

    useEffect(() => {
        const fetchFeaturedPets = async () => {
            try {
                const response = await fetch('/api/pets/featured');

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Unexpected response format');
                }

                const data = await response.json();
                setFeaturedPets(data);
            } catch (error) {
                console.error('Error fetching featured pets:', error);
            };
        }

        fetchFeaturedPets();
    }, []);
    
    return (
        <div className='home-container'>
            <img src='/logo.jpg' alt='Logo' className='logo' />
            <h1 className='home-title'>Perfect Pet Match</h1>
            <h3 className='home-description'>
                Welcome to Perfect Pet Match!
                Discover your perfect pet! Browse through our selection of animals and find the perfect buddy for you!
            </h3>
            <h2 className='featured-pets-title'>Featured Pets</h2>
            <div className='featured-pets-container'>
                {featuredPets.map((pet) => (
                    <div key={pet.id} className='featured-pet'>
                        <img src={pet.photo} alt={pet.name} className='pet-image' />
                        <h3 className='pet-name'>{pet.name}</h3>
                        <p className='pet-description'>{pet.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
