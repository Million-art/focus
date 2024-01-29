const connection = require('../../connection');

const task = {
    getAllTasks: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM task';
            connection.query(sql, (err, results) => {
                if (err) {
                    console.error('Error in getAllTasks:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getTaskByEmail: (email) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM task WHERE assign_to = ?';
          // Pass the email as an array in the second argument
          connection.query(sql, [email], (err, results) => {
            if (err) {
              console.error('Error in getTaskByEmail:', err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      },

    addTask: (newTask) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO task SET ?';
            connection.query(sql, newTask, (err, result) => {
                if (err) {
                    console.error('Error in newTask:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    updateTask: (id, TaskData) => {
        return new Promise((resolve, reject) => {
         const query = 'UPDATE task SET ? WHERE id = ?';
         connection.query(query, [TaskData, id], (err, results) => {
           if (err) {
             reject(err);
           } else {
             resolve(results);
           }
         });
       });
     },
    deleteTask: (taskId) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM task WHERE id = ?';
            connection.query(sql, [taskId], (err, result) => {
                if (err) {
                    console.error('Error in deleteTask:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};

module.exports = task;
