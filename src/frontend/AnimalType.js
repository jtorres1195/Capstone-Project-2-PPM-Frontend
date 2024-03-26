import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AnimalType.css';

const AnimalType = () => {
    const { type } = useParams();
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const petsPerPage = 10; // Ensure this matches your server's expectation or dynamically adjust based on server response

    useEffect(() => {
        const fetchTypePets = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('petApiToken');
            try {
                const response = await axios.get(`http://localhost:3001/pets?type=${type}&page=${currentPage}&limit=${petsPerPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (response.status === 200 && response.data.data) {
                    const filteredPets = response.data.data.filter(pet => pet.type && pet.type.toLowerCase() === type.toLowerCase());
                    setPets(filteredPets); // Filter on the client side
                    const totalCount = response.data.total; // Access the total count of items
                    setTotalPages(Math.ceil(totalCount / petsPerPage)); // Calculate total pages for pagination
                } else {
                    console.error('Unexpected response from API:', response.data);
                }
            } catch (error) {
                console.error('Error fetching pets:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTypePets();
    }, [type, currentPage]);

    const handlePrevPage = () => {
        setCurrentPage(currentPage => Math.max(1, currentPage - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1));
    };

    return (
        <div className="animal-type-container">
            {/* Pet type header always shown */}
            <h1 className="animal-type-header centered">{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            
            {/* Loading and empty states */}
            {isLoading ? (
                <div>Loading...</div>
            ) : !pets.length ? (
                <div>No pets available</div>
            ) : (
                <ul className='pets-body'>
                    {pets.map((pet) => (
                        <li key={pet.id}>
                            {pet.primary_photo_cropped && (
                                <a href={pet.url} target="_blank" rel="noopener noreferrer">
                                    <img src={pet.primary_photo_cropped.medium} alt={pet.name} />
                                </a>
                            )}
                            <h3 className="pet-name">
                                <a href={pet.url} target="_blank" rel="noopener noreferrer">{pet.name}</a>
                            </h3>
                            <p>{pet.species}</p>
                            <p>{pet.breeds.primary}</p>
                            <p>{pet.breeds.mixed ? "Mixed" : "Purebred"}</p>
                            <p>{pet.age}</p>
                            <p>{pet.status}</p>
                        </li>
                    ))}
                </ul>
            )}

            {pets.length > 0 && (
                <div className='pagination'>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
                </div>
            )}
        </div>
    );
};

export default AnimalType;
