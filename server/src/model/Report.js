const connection = require('../../connection');

const report = {
    getAllReports: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM reports';
            connection.query(sql, (err, results) => {
                if (err) {
                    console.error('Error in getAllReports:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    addReport: (newReport) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO reports SET ?';
            connection.query(sql, newReport, (err, result) => {
                if (err) {
                    console.error('Error in addReport:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    deleteReport: (reportId) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM reports WHERE id = ?';
            connection.query(sql, [reportId], (err, result) => {
                if (err) {
                    console.error('Error in deleteReport:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};

module.exports = report;
