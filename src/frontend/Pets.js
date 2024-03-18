import React, { useState, useEffect } from 'react';
import './Pets.css';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [petsPerPage] = useState(10);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                // Fetch data from the PetFinder API
                const response = await fetch('/pets'); 

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Unexpected response format');
                }

                const data = await response.json();
                console.log('Fetched pets:', data);

                setPets(data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, [searchQuery, petsPerPage]); 

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className='pets-container'>
            <h2 className='pets-header'>Adopt a Pet</h2>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search pets...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='search-input'
                />
            </div>
            <ul className='pets-body'>
                {pets.map((pet) => (
                    <li key={pet.id}>
                        <img src={pet.photo[0]?.medium} alt={pet.name} />
                        <h3>{pet.name}</h3>
                        <p>{pet.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pets;
