const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierModel');

// Retrieve all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve a specific supplier
router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findOne({_id: req.params.id});
        if (supplier == null) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new supplier
router.post('/', async (req, res) => {
    try {
        const newSupplier = await Supplier.create(req.body);
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a supplier
router.put('/:id', async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true });
        res.json(updatedSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete({_id: req.params.id});
        if (deletedSupplier == null) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json({ message: 'Supplier deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find({}, 'supplierName clothType'); // Only retrieve supplierName and clothType
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;