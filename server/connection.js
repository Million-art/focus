const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'blih_attendance'
  });

  if(connection){
    console.log('connected')
  }
  else{
    console.log('not connected')
  }

  module.exports = connection;