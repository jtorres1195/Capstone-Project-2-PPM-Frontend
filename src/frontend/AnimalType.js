import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AnimalType.css';

const AnimalType = () => {
    const { type } = useParams();
    const [animals, setAnimals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const animalsPerPage = 10;

    useEffect(() => {
        const fetchAnimalType = async () => {
            setIsLoading(true);
            const url = `http://localhost:3001/pets?type=${encodeURIComponent(type)}&page=${currentPage}&limit=${animalsPerPage}`;
            console.log('Requesting URL:', url); 
            
            try {
                const response = await fetch(url, {cache: "no-store"});
                if (!response.ok) {
                    throw new Error(`Failed to fetch, server responded with status: ${response.status}`);
                }
                const data = await response.json();
                setAnimals(data.animals);
                setTotalPages(Math.ceil(data.pagination.total_count / animalsPerPage));
            } catch (error) {
                console.error('Error fetching animals:', error.message);
                setAnimals([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimalType();
    }, [type, currentPage, animalsPerPage, searchQuery]); // Added searchQuery to dependencies to refetch when it changes

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handlePrevPage = () => setCurrentPage(Math.max(1, currentPage - 1));
    const handleNextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

    return (
        <div className="animal-type-container">
            <h1 className="animal-type-header centered">{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search animals...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='search-input'
                />
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : animals.length > 0 ? (
                <ul className='animals-body'>
                    {animals.filter(animal => animal.name.toLowerCase().includes(searchQuery)).map((animal) => (
                        <li key={animal.id}>
                            {animal.primary_photo_cropped && (
                                <a href={animal.url} target="_blank" rel="noopener noreferrer">
                                    <img src={animal.primary_photo_cropped.medium} alt={animal.name} />
                                </a>
                            )}
                            <h3 className="animal-name">
                                <a href={animal.url} target="_blank" rel="noopener noreferrer">{animal.name}</a>
                            </h3>
                            <p>{animal.species}</p>
                            <p>{animal.breeds.primary}</p>
                            <p>{animal.breeds.mixed ? "Mixed" : "Purebred"}</p>
                            <p>{animal.age}</p>
                            <p>{animal.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No animals available</div>
            )}
            {animals.length > 0 && (
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
