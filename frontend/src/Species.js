import React, { useEffect, useState } from 'react';

const Species = () => {
    const [animalTypes, setAnimalTypes] = useState([]);

    useEffect(() => {
        const fetchAnimalTypes = async () => {
            try {
                const response = await fetch('GET https://api.petfinder.com/v2/types')
                const data = await response.json();
                setAnimalTypes(data.types);
            } catch (error) {
                console.error('Error fetching species:', error);
            }
        }

        fetchAnimalTypes();
    }, []); 
    return (
        <div>
            <h2>Animal Species</h2>
            <ul>
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
