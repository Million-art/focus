const connection = require('../../connection');


const RemotEmployee = {

    authenticate: (email,password) => {
         return new Promise((resolve, reject) => {
          const selectQuery = 'SELECT * FROM remot_employees WHERE email = ? && password = ?';
          connection.query(selectQuery, [email,password], (err, results) => {
            if (err) {
              reject(err);
            } else {
                resolve(results[0]);
            }
          });
        });
      },
      getAllEmployees: () => {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM remot_employees';
          connection.query(query, (err, results) => {
            if (err) {
              reject(err);
            } else {
              // Check if results is an array before resolving
              if (Array.isArray(results)) {
                resolve(results);
              } else {
                // If results is not an array, handle it accordingly
                reject(new Error('Unexpected result from the database'));
              }
            }
          });
        });
      },
      
      getEmployeeByEmail: (email) => {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM remot_employees WHERE email = ?';
          connection.query(query, [email], (err, results) => {
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
          const query = 'INSERT INTO remot_employees SET ?';
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
          const query = 'UPDATE remot_employees SET ? WHERE employee_id = ?';
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
          const query = 'DELETE FROM remot_employees WHERE employee_id = ?';
          connection.query(query, [id], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      },
}

module.exports = RemotEmployee;
