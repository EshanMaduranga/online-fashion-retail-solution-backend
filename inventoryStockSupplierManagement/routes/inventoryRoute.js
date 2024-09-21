const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventoryModel');

// Retrieve all inventory items
router.post('/', async (req, res) => {
    try {
        const inventory = await Inventory.find().populate('supplier', 'supplierName'); // Populate supplier field with supplierName
        res.status(200).json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve  inventory item
router.get('/', async (req, res) => {
    try {
        const inventory = await Inventory.find().populate('supplier', 'supplierName');
        res.status(200).json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new inventory item
router.post('/add', async (req, res) => {

    const {desc,clothType,colorData,gender,age,price,supplier,qty,date,img,fullDesc} = req.body


        const inv = new Inventory({
            desc,
            fullDesc,
            clothType,
            colorData,
            gender,
            age,
            price,
            supplier,
            qty,
            date,
            img
        })

        inv.save()
        .then(resp => res.json({resp}))
        .catch(err => console.log(err))


});

// Update an inventory item
router.put('/:id', async (req, res) => {
    try {
        const updatedInventoryItem = await Inventory.findOneAndUpdate({_id: req.params.id}, req.body, { new: true });
        res.json({updatedInventoryItem});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
    try {
        const deletedInventoryItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:clothId', async (req, res) => {
    try {
        const clothId = req.params.clothId;
        const inventoryItem = await Inventory.findOne({ _id: clothId });
        res.json({inventoryItem});
    } catch (err) {
        res.json({ message: err.message });
    }
});
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Eshan///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

//get inventory by id
router.post('/gtProbyid', (req, res) => {
    const id = req.body._id

    Inventory.findOne({_id: id})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})

//get product by age and gender
router.post('/getprobyageandgender', (req, res) => {
    const {ageCategory, gender} = req.body

    Inventory.find({age: ageCategory, gender})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))




})

//get product by age and gender(inverse)
router.post('/getprobyageandgenderinv', (req, res) => {
    const {ageCategory, gender} = req.body

    var inverseGender = ''
    if(gender == 'Male') inverseGender = 'Female'
    else if(gender == 'Female') inverseGender = 'Male'
 
    Inventory.find({$or: [{gender: inverseGender}, {$and: [{gender: gender}, {age: {$ne:ageCategory}}]}] })
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
}) 

//get product by gender but inverse age cat
router.post('/getproductbygender', (req, res) => {
    const {ageCategory, gender} = req.body

    Inventory.find({$and: [{gender: gender}, {age: {$ne:ageCategory}}]})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})

//get product by inverse gender but same age cat
router.post('/getproductbyinvgendersameage', (req, res) => {
    const {ageCategory, gender} = req.body

    var inverseGender = ''
    if(gender == 'Male') inverseGender = 'Female'
    else if(gender == 'Female') inverseGender = 'Male'

    Inventory.find({$and: [{gender: inverseGender}, {age:ageCategory}]})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})

//get product by inverse gender but inverse age cat
router.post('/getproductbyinvgenderinvage', (req, res) => {
    const {ageCategory, gender} = req.body

    var inverseGender = ''
    if(gender == 'Male') inverseGender = 'Female'
    else if(gender == 'Female') inverseGender = 'Male'

    Inventory.find({$and: [{gender: inverseGender}, {age: {$ne:ageCategory}}]})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})

//get product by age gender clothtype
router.post('/getproductbyagegendercltype', (req, res) => {
    const {_id, ageCategory, clothType, gender} = req.body

    Inventory.find({$and: [{gender: gender}, {age:ageCategory}, {clothType},  {_id: {$ne:_id}}]})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})

//get product by inv age gender clothtype
router.post('/getproductbyinvagegendercltype', (req, res) => {
    const { ageCategory, clothType, gender} = req.body

    Inventory.find({$and: [{gender: gender}, {age: {$ne:ageCategory}}, {clothType}]})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})

//get product by  age gender inv clothtype
router.post('/getproductbyagegenderinvcltype', (req, res) => {
    const { ageCategory, clothType, gender} = req.body

    Inventory.find({$and: [{gender: gender}, {age:ageCategory}, {clothType: {$ne:clothType}}]})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})

//get product by  inv age gender inv clothtype
router.post('/getproductbyinvagegenderinvcltype', (req, res) => {
    const { ageCategory, clothType, gender} = req.body

    Inventory.find({$and: [{gender: gender}, {age: {$ne:ageCategory}}, {clothType: {$ne:clothType}}]})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})


// product page
//get product gender
router.post('/getproductbygender', (req, res) => {
    const {gender} = req.body

    Inventory.find({gender})
    .then(response => res.json({response}))
    .catch(err => res.json({err}))
})






module.exports = router;



