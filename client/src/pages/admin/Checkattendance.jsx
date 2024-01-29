import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendancePopup from './AttendancePopup';
import {apiBaseUrl} from '../../helper/constant'

const Checkattendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
      const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/employee/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error.message);
      }
    };

    fetchEmployees();
  }, []);

  const openAttendancePopup = async (employee) => {
    try {
       const response = await axios.get(`${apiBaseUrl}/attendance/employee-attendance/${employee.employee_id}`);
      const attendanceData = response.data;
      setSelectedEmployee({ ...employee, attendanceData });
    } catch (error) {
      console.error('Error fetching attendance data:', error.message);
    }
  };

  const closeAttendancePopup = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="relative">
      <h1 className="ml-12 mt-12 mb-4 font-medium text-2xl">Available Employees</h1>
      <table className="table-auto ml-12">
        <thead>
          <tr>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id} className="">
              <td className="border px-4 py-2">
                <button
                  onClick={() => openAttendancePopup(employee)}
                  className="text-blue-500 font-medium"
                >
                  {`${employee.first_name} ${employee.last_name}`}
                </button>
              </td>
              <td className="border px-4 py-2">{employee.department}</td>
              <td className="border px-4 py-2">{employee.email}</td>
              <td className="border px-4 py-2">{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <AttendancePopup employee={selectedEmployee} onClose={closeAttendancePopup} />
        </div>
      )}
    </div>
  );
};

export default Checkattendance;
