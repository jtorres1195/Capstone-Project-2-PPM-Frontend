import React, { useState, useEffect } from 'react';
import './Pets.css';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [petsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const url = `http://localhost:3001/pets?page=${currentPage}&limit=${petsPerPage}`; 

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch pets: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Complete API response:', data);

                if (data.animals && data.pagination) {
                    setPets(data.animals);
                    setTotalPages(Math.ceil(data.pagination.total_count / petsPerPage));
                } else {
                    console.error('Unexpected data format:', data);
                    setPets([]);
                }

                window.scrollTo({ top: 0, behavior: 'auto' });
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, [currentPage, petsPerPage, url]); 

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSavePet = async (petId) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) throw new Error("User not found.");

            const saveUrl = `http://localhost:3001/user/${userId}/save-pet/${petId}`;
            const response = await fetch(saveUrl, {
                method: 'POST'
            });

            if (response.ok) {
                alert('Pet saved successfully!');
            } else {
                const errorData = await response.json();
                alert(`Failed to save pet: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error saving pet:', error);
            alert('Failed to save pet due to an unexpected error.');
        }
    };

    const handlePrevPage = () => {
        setCurrentPage(Math.max(1, currentPage - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(totalPages, currentPage + 1));
    };

    return (
        <div className='pets-container'>
            <h2 className='pets-header'>Check out the Pets</h2>
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
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <li key={pet.id}>
                            {pet.primary_photo_cropped && (
                                <a href={pet.url} target="_blank" rel="noopener noreferrer">
                                    <img src={pet.primary_photo_cropped.medium} alt={pet.name} />
                                </a>
                            )}
                            <h3 className="pet-name">
                                <a href={pet.url} target="_blank" rel="noopener noreferrer">{pet.name}</a>
                            </h3>
                            <p>{pet.type}</p>
                            <p>{pet.breeds.primary}</p>
                            <p>{pet.breeds.mixed ? "Mixed" : "Purebred"}</p>
                            <p>{pet.age}</p>
                            <p>{pet.status}</p>
                            <p>{pet.description ? decodeURIComponent(pet.description) : "No description available"}</p>
                            <button onClick={() => handleSavePet(pet.id)} className="save-pet-button">Save Pet</button>
                        </li>
                    ))
                ) : (
                    <li>Loading pets...</li>
                )}
            </ul>
            <div className='pagination'>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Pets;
