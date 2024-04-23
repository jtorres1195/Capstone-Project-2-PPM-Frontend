import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimalTypes.css';

const AnimalTypes = () => {
    const [animalTypes, setAnimalTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const url = 'https://perfect-pet-match-backend-server.onrender.com/animalTypes';

    useEffect(() => {
        const fetchAnimalTypes = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                setAnimalTypes(data.animalTypes);
            } catch (error) {
                console.error('Error fetching animal types:', error);
            }
        };

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
                {animalTypes.filter(type => type.name.toLowerCase().includes(searchQuery.toLowerCase())).map((type) => (
                    <li key={type.id} onClick={() => handleClick(type)}>
                        <h3><span>{type.name}</span></h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnimalTypes;
