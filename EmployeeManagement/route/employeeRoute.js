const express = require('express');
const router = express.Router();
const Employee = require('../model/employee.model');
const auth = require('../../middleware/auth')

// Route to get all employees
router.get('/',  async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    otrate: req.body.otrate,
    totalot: req.body.totalot,
    totalsalary: req.body.totalsalary,
    password:  req.body.password,
    role:  req.body.role
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update an employee
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Parse salary and otrate from request body as numbers
    const salary = parseFloat(req.body.salary);
    const otrate = parseFloat(req.body.otrate);

    // Calculate totalot and totalsalary based on salary and otrate
    const totalot = salary * otrate/100;
    const totalsalary = totalot + salary;

    // Update the employee record with the calculated values
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          salary: salary || 0, // Set default to 0 if salary is not provided
          otrate: otrate || 0, // Set default to 0 if otrate is not provided
          totalot: totalot || 0, // Set default to 0 if totalot is not calculated
          totalsalary: totalsalary || 0, // Set default to 0 if totalsalary is not calculated
        },
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete an employee
router.delete('/:id' , async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get employee by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;