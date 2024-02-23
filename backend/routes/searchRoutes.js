const express = require('express');
const Pets = require('../models/Pets');
const router = express.Router();

// Route to perform search and filtering
router.get('/search', async (req, res) => {
    try {
        // Extract criteria from query parameters
        const { species, age, color, breed } = req.query;
        // Construct search query based on criteria
        const searchQuery = {};

        if (species) {
            searchQuery.species = species;
        }
        if (age) {
            searchQuery.age = age;
        }
        if (color) {
            searchQuery.color;
        }
        if (breed) {
            searchQuery.breed = breed;
        }

        // Query the database with the constructed search query
        const searchResults = await Pets.find(searchQuery);

        // Return the search results
        res.json({ results: searchResults });
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;