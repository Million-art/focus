const Employee = require('../model/Employee');
const wifi = require('node-wifi');
const Router = require('../model/Router');
const employeeController = {
  
  getAllEmployees: async (req, res) => {
    try {
      
      const employees = await Employee.getAllEmployees();
      res.json(employees);
    } catch (err) {
      console.error('Error fetching employees:', err);
      res.status(500).send('Error fetching employees');
    }
  },
  getEmployeeById: async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await Employee.getEmployeeById(id);
      if (employee) {
        res.json(employee);
        
      } else {
        res.status(404).send('Employee not found');
        
      }
    } catch (err) {
      console.error('Error fetching employee:', err);
      res.status(500).send('Error fetching employee');

    }
  },
  addEmployee: async (req, res) => {
    const employeeData = req.body;
     try {
      const newEmployeeId = await Employee.addEmployee(employeeData);
      res.status(201).json({ employee_id: newEmployeeId });
    } catch (err) {
      console.error('Error adding employee:', err);
      res.status(500).send('Error adding new employee');
    }
  },
  updateEmployee: async (req, res) => {
    const { id } = req.params;
    const employeeData = req.body;
     try {
      await Employee.updateEmployee(id, employeeData);
      res.status(200).send('Employee updated successfully');
    } catch (err) {
      console.error('Error updating employee:', err);
      res.status(500).send('Error updating employee');
    }
  },
  deleteEmployee: async (req, res) => {
    const { id } = req.params;
    try {
      await Employee.deleteEmployee(id);
      res.status(204).send('Employee deleted successfully');
    } catch (err) {
      console.error('Error deleting employee:', err);
      res.status(500).send('Error deleting employee');
    }
  },
  login: async (req, res) => {
    const { email, is_login } = req.body;
    console.log(email)
    try {

        wifi.init({ iface: null });
        const currentConnections = await wifi.getCurrentConnections();

        if (currentConnections.length > 0) {
            const connectedNetwork = currentConnections[0].mac;  
            const router = await Router.getRouterBySSID(connectedNetwork);
            
            if (router) {
                const user = await Employee.authenticate(email, is_login);
                
                if (user) {
                    // Log the successful login action
                    console.log(`User ${email} logged in successfully.`);
                    
                    res.cookie('user', user);
                    res.json({ user, connectedNetwork: currentConnections[0] });
                } else {
                    // Log failed login attempt
                    console.log(`Failed login attempt for user ${email}. Invalid credentials.`);
                    
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } else {
                // Log unauthorized router
                console.log('User is not connected to an allowed router.');
                
                res.status(403).json({ message: 'Unauthorized router' });
            }
        } else {
            // Log no WiFi network detected
            console.log('User is not connected to any WiFi network.');
            
            res.status(403).json({ message: 'Cannot login: No WiFi network detected' });
        }
    } catch (err) {
        // Log error during login
        console.error('Error logging in:', err);
        
        res.status(500).send('Error logging in');
    }
},

    
 
  logout: async (req, res) => {
    const { id } = req.body;
    try {
      const isLogoutSuccessful = await Employee.logout(id);
      if (isLogoutSuccessful) {
        res.status(200).send('Logout successful');
      } else {
        res.status(401).send('Invalid user or already logged out');
      }
    } catch (err) {
      console.error('Error during logout:', err);
      res.status(500).send('Error during logout');
    }
  },
};
 

module.exports = employeeController;
