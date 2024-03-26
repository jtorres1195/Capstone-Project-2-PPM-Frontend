import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimalTypes.css';

const AnimalTypes = () => {
    const [animalTypes, setAnimalTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnimalTypes = async () => {
            try {
                const token = localStorage.getItem('petApiToken');
                if (!token) {
                    throw new Error('No token available');
                }

                const response = await fetch('http://localhost:3001/animalTypes', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Unexpected response format');
                }

                const data = await response.json();

                setAnimalTypes(data.animalTypes);
            } catch (error) {
                console.error('Error fetching animal types:', error);
            }
        }

        fetchAnimalTypes();
    }, []); 

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClick = (type) => {
        navigate(`/animalTypes/${type.name.toLowerCase().replace(/\s+/g, '-')}`);
    };

    return (
        <div className='animalTypes-container'>
            <h2 className='animalTypes-header'>Animal Types</h2>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search animal types'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='search-input'
                />
            </div>
            <ul className='animalTypes-body'>
                {animalTypes.map((type) => (
                    <li key={type.id} onClick={() => handleClick(type)}>
                        <h3><span>{type.name}</span></h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AnimalTypes;
