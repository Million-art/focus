import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {apiBaseUrl} from '../../helper/constant'

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/tasks/task`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'finished':
        return 'bg-green-200';
      case 'Pending':
        return 'bg-yellow-200';
      case 'on progress':
        return 'bg-blue-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {tasks.length ? tasks.map((task) => (
        <div
          key={task.id}
          className={`max-w-sm m-4 shadow-md rounded-md overflow-hidden ${getStatusColor(task.status)}`}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{task.name}</div>
            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
            <p className="text-gray-700 text-base">
              Assigned to: {task.assign_to}<br />
              Status: {task.status}<br />
              Start Time: {formatDateTime(task.start_time)}<br />
              End Time: {formatDateTime(task.end_time)}<br />
            </p>
          </div>
        </div>
      ))
      : <h1>No available tasks</h1>}
    </div>
  );
};

export default ViewTask;
