const express = require('express');
const db = require('./db');
const { isAdmin } = require('../middleware/isAdmin');
const Pets = require('../models/Pets');

// CRUD Methods

// Retrieve a list of pets
router.get('/api/pets', async (req, res) => {
    try {
        // Make the request to the PetFinder API with API key
        const apiKey = 'uz6vwnORLY4GdyGNXASQTtN75lWsM1eLmlaRu5IAjLzwjWjw55';
        const url = 'https://api.petfinder.com/v2/animals';
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const petData = response.data;

        res.json(petData);
        console.log(response);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get specific pet by id
router.get('/pets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pets.findById(id);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a pet to post
router.post('/pets/create/admin', isAdmin, async (req, res) => {
    try {
        const {name, age, species } = req.body;
        await Pets.create({ name, age, species });
        res.status(201).json({ message: 'Pet successfully created'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update information for a pet
router.put('/pets/:id/update/admin', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Pets.updateById(id, res.body);
        res.json({ message: 'Pet updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ messager})
    }
});

// Delete a pet 
router.put('/pets/:id/delete/admin', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Pets.deleteById(id);
        res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
