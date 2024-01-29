const connection = require('../../connection');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const Attendance = {
  getAllEmployeeAttendance: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM clock_records";
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getEmployeeAttendanceById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM clock_records WHERE employee_id = ?';
      connection.query(query, [id], (err, results) => {
        
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  
  addEmployeeClockIn: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO clock_records (record_id,employee_id, date, clock_in) VALUES (uuid(), ?, CURDATE(), CURTIME())';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  addEmployeeClockOut: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE clock_records SET clock_out = CURTIME() WHERE employee_id = ? AND date = CURDATE()';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  addEmployeeClockInAndOut: (id) => {
    return new Promise((resolve, reject) => {
      const currentDate = new Date().toLocaleDateString();
      const checkExistingQuery = 'SELECT * FROM clock_records WHERE employee_id = ? AND date = ?';
      const clockInQuery = 'UPDATE clock_records SET clock_in = CURTIME() WHERE employee_id = ? AND date = ?';
      const clockOutQuery = 'UPDATE clock_records SET clock_out = CURTIME() WHERE employee_id = ? AND date = ?';
      const insertNewRowQuery = 'INSERT INTO clock_records (employee_id, date, clock_in) VALUES (?, ?, CURTIME())';

      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
        }

        // Check if there is an existing record for the current date
        connection.query(checkExistingQuery, [id, currentDate], (err, results) => {
          if (err) {
            connection.rollback(() => {
              reject(err);
            });
          }

          if (results.length > 0) {
            // Update the existing row with clock-in and clock-out times
            connection.query(clockInQuery, [id, currentDate], (err, results) => {
              if (err) {
                connection.rollback(() => {
                  reject(err);
                });
              }

              connection.query(clockOutQuery, [id, currentDate], (err, results) => {
                if (err) {
                  connection.rollback(() => {
                    reject(err);
                  });
                }

                connection.commit((err) => {
                  if (err) {
                    connection.rollback(() => {
                      reject(err);
                    });
                  }
                  resolve(results);
                });
              });
            });
          } else {
            // Insert a new row for the current date with clock-in time
            connection.query(insertNewRowQuery, [id, currentDate], (err, results) => {
              if (err) {
                connection.rollback(() => {
                  reject(err);
                });
              }

              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => {
                    reject(err);
                  });
                }
                resolve(results);
              });
            });
          }
        });
      });
    });
  },
  
};
 

module.exports = Attendance;
