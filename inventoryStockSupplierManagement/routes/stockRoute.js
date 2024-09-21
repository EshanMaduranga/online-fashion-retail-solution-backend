const express = require('express');
const router = express.Router();
const Stock = require('../models/stockModel');

// Retrieve all stock items
router.get('/', async (req, res) => {
    try {
        const stock = await Stock.find();
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve a specific stock item
router.get('/:id', async (req, res) => {
    try {
        const stockItem = await Stock.findById(req.params.id);
        if (!stockItem) {
            return res.status(404).json({ message: 'Stock item not found' });
        }
        res.json(stockItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new stock item
router.post('/', async (req, res) => {
    try {
        const newStockItem = await Stock.create(req.body);
        res.status(201).json(newStockItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a stock item
router.put('/:id', async (req, res) => {
    try {
        const updatedStockItem = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStockItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a stock item
router.delete('/:id', async (req, res) => {
    try {
        const deletedStockItem = await Stock.findByIdAndDelete(req.params.id);
        if (!deletedStockItem) {
            return res.status(404).json({ message: 'Stock item not found' });
        }
        res.json({ message: 'Stock item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;