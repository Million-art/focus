const connection = require('../../connection');
const Employee = {
  authenticate: (email, is_login) => {
    return new Promise((resolve, reject) => {

      const selectQuery = 'SELECT * FROM employees WHERE email = ? AND is_login = ?';
      connection.query(selectQuery, [email, is_login], (err, results) => {
         if (err) {
          reject(err);
         } else {
          if (results.length > 0) {
            const updateQuery = 'UPDATE employees SET is_login = true WHERE email = ?';
            connection.query(updateQuery, [email], (updateErr, updateResults) => {
              if (updateErr) {
                reject(updateErr);
              } else {
                resolve(results[0]);
              }
            });
          } else {
             resolve(null);
           }
        }
      });
    });
  },
  
  getAllEmployees: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM employees';
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  getEmployeeById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM employees WHERE employee_id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  addEmployee: (employeeData) => {
     return new Promise((resolve, reject) => {
      const query = 'INSERT INTO employees SET ?';
      connection.query(query, [employeeData], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },
  updateEmployee: (id, employeeData) => {
     return new Promise((resolve, reject) => {
      const query = 'UPDATE employees SET ? WHERE employee_id = ?';
      connection.query(query, [employeeData, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  deleteEmployee: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM employees WHERE employee_id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  logout: (id) => {
    return new Promise((resolve, reject) => {
      const updateQuery = 'UPDATE employees SET is_login = false WHERE employee_id = ?';
      connection.query(updateQuery, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Check if any rows were affected to determine the success of the update
          const isLogoutSuccessful = results.affectedRows > 0;
          resolve(isLogoutSuccessful);
        }
      });
    });
    
  },
  
};

module.exports = Employee;
