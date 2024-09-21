const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    default: 0
  },
  otrate: {
    type: Number,
    required: true,
    default: 0
  },
  totalot: {
    type: Number,
    required: true,
    default: 0
  },
  totalsalary: {
    type: Number,
    required: true,
    default: 0
  },
  password: {
    type: String
  },
  role: {
    type: String
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;