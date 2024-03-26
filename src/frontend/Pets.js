import React, { useState, useEffect } from 'react';
import './Pets.css';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [petsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPets = async (page) => {
            try {
                const offset = (page - 1) * petsPerPage; // Calculate offset based on currentPage
                const token = localStorage.getItem('petApiToken');
                if (!token) {
                    throw new Error('No token available');
                }

                // Fetch data from the PetFinder API
                const response = await fetch(`http://localhost:3001/pets?page=${currentPage}&limit=${petsPerPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Unexpected response format');
                }

                const { data, total } = await response.json();
                setPets(data);
                setTotalPages(Math.ceil(total / petsPerPage));

                // Scroll to the top of the page
                window.scrollTo({ top: 0, behavior: 'auto' });
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, [searchQuery, petsPerPage, currentPage]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSavePet = async (petId) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) throw new Error("User not found."); 

            const token = localStorage.getItem('petApiToken');

            const response = await fetch(`http://localhost:3001/user/${userId}/save-pet/${petId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Pet saved successfully!');
            } else  {
                const errorData = await response.json();
                alert(`Failed to save pet: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error saving pet:', error);
            alert('Failed to save pet due to an unexpected error.');
        }
    }; 

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
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
                {Array.isArray(pets) && pets.length > 0 ? (
                    pets.map((pet) => (
                        <li key={pet.id}>
                            {/* Render medium photo of pets */}
                            {pet.primary_photo_cropped && (
                                <a href={pet.url} target="_blank" rel="noopener noreferrer">
                                <img src={pet.primary_photo_cropped.medium} alt={pet.name} />
                                </a>
                            )}
                            <h3 className="pet-name">
                                <a href={pet.url} target="_blank" rel="noopener noreferrer" className="pet-link">{pet.name}</a>
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
                    <li>Loading...</li>
                )}
            </ul>
            <div className='pagination'>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Pets;
