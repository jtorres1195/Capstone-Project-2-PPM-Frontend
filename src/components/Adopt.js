import React, { useState, useEffect } from 'react';

const Adopt = () => {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Fetch data from the PetFinderAPI
        const fetchData = async () => {
            try {
                const response = await fetch('GET https://api.petfinder.com/v2/animals');
                const data = await response.json();

                setPets(data.pets);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Run the effect only once on component mount
    return (
        <div>
            <h2>Adopt a Pet</h2>
            <ul>
                {pets.map((pet) => (
                    <li key={pet.id}>
                        <img src={pet.photo} alt={pet.name} />
                        <h3>{pet.name}</h3>
                        <p>{pet.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Adopt;
