const Employee = require('../models/Employee');
const AuditTrail = require('../models/AuditTrail');

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    // Validate the request body
    const { name, address, age, department, status } = req.body;
    if (!name || !address || !age || !department || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new employee instance
    const employee = new Employee(req.body);

    // Save the new employee to the database
    const savedEmployee = await employee.save();

    // Return a success response
    res.status(201).json(savedEmployee);
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Create employee error:', err);
    // Return an error response
    res.status(400).json({ error: err.message });
  }
};



exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);

    // Check if the employee exists
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if the user is authorized to perform the update
    if (!req.userId) {
      return res.status(401).json({ message: 'User authentication required' });
    }

    // Update the employee and return the updated employee
    const updatedEmployee = await Employee.findByIdAndUpdate(id, newData, { new: true });

    // Send the updated employee data in the response
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



// Delete an existing employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id); // Use findByIdAndDelete to remove the employee

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get a single employee
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all audit trails
exports.getAuditTrails = async (req, res) => {
  try {
    const auditTrails = await AuditTrail.find()
      .populate('userId', 'name')
      .populate('employeeId', 'name');

    res.status(200).json(auditTrails);
  } catch (error) {
    console.error('Error fetching audit trails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
