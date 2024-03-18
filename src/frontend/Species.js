import React, { useEffect, useState } from 'react';
import './Species.css';

const Species = () => {
    const [animalTypes, setAnimalTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAnimalTypes = async () => {
            try {
                const response = await fetch('/animal-types');

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Unexpected response format');
                }

                const data = await response.json();
                console.log('Response data:', data);
                setAnimalTypes(data.types);
            } catch (error) {
                console.error('Error fetching species:', error);
            }
        }

        fetchAnimalTypes();
    }, []); 

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    
    return (
        <div className='species-container'>
            <h2 className='species-header'>Animal Species</h2>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search species'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='search-input'
                />
            </div>
            <ul className='species-body'>
                {animalTypes.map((type) => (
                    <li key={type.id}>
                        <h3>{type.name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Species; 
