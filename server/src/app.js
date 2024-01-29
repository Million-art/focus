const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const employeeRoutes = require('./router/employeeRoutes');
const remotemployeeRoutes = require('./router/remotEmployeeRouter');
const attendanceRoutes = require('./router/attendanceRoutes');
const routerRoutes = require('./router/RouterRoute');
const taskRouter = require('./router/TaskRouter');
const accountRouter = require('./router/accountRouter');

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


// Routes
 app.use('/employee', employeeRoutes);
 app.use('/remotemployee', remotemployeeRoutes);
 app.use('/attendance', attendanceRoutes);
app.use('/router', routerRoutes);
app.use('/tasks', taskRouter);
app.use('/account', accountRouter);
  
 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
