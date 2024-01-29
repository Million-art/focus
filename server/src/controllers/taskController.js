const Task = require('../model/Task');
  
const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.getAllTasks();
      res.json(tasks);
    } catch (err) {
      console.error('Error fetching Tasks:', err);
      res.status(500).send('Error fetching Tasks');
    }
  },
  getTaskByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const Tasks = await Task.getTaskByEmail(email);
      if (Tasks) {
        res.json(Tasks);
      } else {
        res.status(404).send('Task not found for this user');
      }
    } catch (err) {
      console.error('Error fetching Task:', err);
      res.status(500).send('Error fetching Task');
    }
  },
  addTask: async (req, res) => {
    const TaskData = req.body;
     try {
      const newTaskId = await Task.addTask(TaskData);
      res.status(201).json({ Task_id: newTaskId });
    } catch (err) {
      console.error('Error adding Task:', err);
      res.status(500).send('Error adding new Task');
    }
  },
  updateTask: async (req, res) => {
    const { id } = req.params;
    const TaskData = req.body;
     try {
      await Task.updateTask(id, TaskData);
      res.status(200).send('Task updated successfully');
    } catch (err) {
      console.error('Error updating Task:', err);
      res.status(500).send('Error updating Task');
    }
  },
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await Task.deleteTask(id);
      res.status(204).send('Task deleted successfully');
    } catch (err) {
      console.error('Error deleting Task:', err);
      res.status(500).send('Error deleting Task');
    }
  },
  login: async (req, res) => {
    const { email, is_login } = req.body;
 
    try {
      const user = await Task.authenticate(email, is_login);
      if (user) {
        res.cookie('user', user);
        res.json({ user });
       } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Error during login' });
    }
  },
  
 
  logout: async (req, res) => {
    const { id } = req.body;
    try {
      const isLogoutSuccessful = await Task.logout(id);
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
 

module.exports = taskController;
