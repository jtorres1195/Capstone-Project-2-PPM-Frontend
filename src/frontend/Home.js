import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function HomePage() {
    const [featuredPets, setFeaturedPets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedPets = async () => {
            try {
                const token = localStorage.getItem('petApiToken');
                if (!token) {
                    throw new Error('No token available');
                }
                
                const response = await axios.get('http://localhost:3001/featuredPets', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setFeaturedPets(response.data.slice(0, 5));
                } else {
                    throw new Error('Failed to fetch featured pets');
                }
            } catch (error) {
                console.error('Error fetching featured pets:', error);
                setError('Failed to fetch featured pets');
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
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    featuredPets.map(pet => (
                        <div key={pet.id} className='featured-pet'>
                            {pet.primary_photo_cropped && (
                                <a href={pet.url} target="_blank" rel="noopener noreferrer">
                                <img src={pet.primary_photo_cropped.medium} alt={pet.name} />
                                </a>
                            )}
                            <h3 className="pet-name">
                                <a href={pet.url} target="_blank" rel="noopener noreferrer" className="pet-link">{pet.name}</a>
                            </h3>
                            <p className='pet-description'>{pet.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomePage;
