import React, { useState, useEffect } from 'react';
import './Adopt.css';

const Adopt = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                // Fetch data from the PetFinder API
                const response = await fetch('/api/pets'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch pets');
                }
                const data = await response.json();
                console.log(response.data);

                setPets(data.animals);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, []); 

    return (
        <div className='adopt-container'>
            <h2 className='adopt-header'>Adopt a Pet</h2>
            <ul className='adopt-body'>
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

export default Adopt;
