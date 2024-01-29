const connection = require('../../connection');

const Router = {
  getAllRouters: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT id, ssid FROM router';

      connection.query(sql, (err, results) => {
        if (err) {
          console.error('Error in getAllRouters:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getRouterBySSID: (mac) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM router WHERE mac = ?';
      connection.query(sql, [mac], (err, results) => {
        if (err) {
          console.error('Error in getRouterBySSID:', err);
          reject(err);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  },

  addRouter: (router) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO router (ssid, mac) VALUES (?, ?)';
      const values = [router.ssid, router.macAddress]; 

      connection.query(sql, values, (err, results) => {
        if (err) {
           reject(err);
        } else {
           resolve(results);
        }
      });
    });
  },

  deleteRouter: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM router WHERE id = ?';
      const values = [id];

      connection.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error in deleteRouter:', err);
          reject(err);
        } else {
          console.log('Successfully deleted router:', results);
          resolve(results);
        }
      });
    });
  },
};

module.exports = Router;
