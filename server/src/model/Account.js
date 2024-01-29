const connection = require('../../connection');

const Account = {
    checkEmailExists: (email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT email FROM employees WHERE email = ?';
            connection.query(sql, email, (err, result) => {
                if (err) {
                    console.error('Error in checkEmailExists:', err);
                    reject(err);
                } else {
                    resolve(result[0]> 0);  
                 }
            });
        });
    },

    unlockAccount: (email) => {
        return new Promise((resolve, reject) => {
            // First, check if the email exists
            Account.checkEmailExists(email)
                .then((emailExists) => {
                    if (emailExists) {
                        // Proceed with unlocking the account
                        const sql = 'UPDATE employees SET is_login = false WHERE email = ?';
                        connection.query(sql, email, (err, result) => {
                            if (err) {
                                console.error('Error in unlockAccount:', err);
                                console.log('error')
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    } else {
                        // Email does not exist
                        resolve({ message: 'Email does not exist' });
 
                    }
                })
                .catch((error) => {
                    console.error('Error in unlockAccount:', error);
                    reject(error);
                    
                });
        });
    },
};

module.exports = Account;
