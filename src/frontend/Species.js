import React, { useEffect, useState } from 'react';
import './Species.css';

const Species = () => {
    const [animalTypes, setAnimalTypes] = useState([]);

    useEffect(() => {
        const fetchAnimalTypes = async () => {
            try {
                const response = await fetch('https://api.petfinder.com/v2/types');
                const data = await response.json();
                setAnimalTypes(data.types);
            } catch (error) {
                console.error('Error fetching species:', error);
            }
        }

        fetchAnimalTypes();
    }, []); 
    return (
        <div className='species-container'>
            <h2 className='species-header'>Animal Species</h2>
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
