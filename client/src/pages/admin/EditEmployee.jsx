import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {apiBaseUrl} from '../../helper/constant'

const EditEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    hire_date: '',
    department: '',
    position: '',
    salary: '',
  });
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [showEmployeeToEdit, setShowEmployeeToEdit] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
 
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/employee/employees/`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    const selectedEmployee = employees.find((employee) => employee.employee_id === id);
    setFormData({
      first_name: selectedEmployee.first_name,
      last_name: selectedEmployee.last_name,
      email: selectedEmployee.email,
      hire_date: selectedEmployee.hire_date,
      department: selectedEmployee.department,
      position: selectedEmployee.position,
      salary: selectedEmployee.salary,
    });
     setEmployeeToEdit(id);
    setShowEmployeeToEdit(true);
  };

  const handleDelete = (id) => {
    setEmployeeToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${apiBaseUrl}/employee/employees/${employeeToDelete}`);

      if (response.status === 204) {
        const updatedEmployees = employees.filter((employee) => employee.employee_id !== employeeToDelete);
        setEmployees(updatedEmployees);
      } else {
        console.error('Error deleting employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    } finally {
      // Reset state after deletion
      setEmployeeToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setEmployeeToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const cancelEdit = () => {
    setEmployeeToEdit(null);
    setShowEmployeeToEdit(false);
  };

  const confirmEdit = async () => {
    try {
      const response = await axios.put(`${apiBaseUrl}/employee/employees/${employeeToEdit}`, formData);

      if (response.status === 200) {
        // Update the employee in the local state
        const updatedEmployees = employees.map((employee) =>
          employee.employee_id === employeeToEdit ? { ...employee, ...formData } : employee
        );
        setEmployees(updatedEmployees);
        setShowEmployeeToEdit(false);
      } else {
        console.error('Error updating employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating employee:', error.message);
    }
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="pt-10">
      <h1 className="text-xl font-bold pl-4">Available Employees</h1>
      {employees.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-center mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Hire Date</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Salary</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td className="border  px-4 py-2">{employee.first_name}</td>
                  <td className="border  px-4 py-2">{employee.last_name}</td>
                  <td className="border  px-4 py-2">{employee.email}</td>
                  <td className="border  px-4 py-2">{employee.hire_date}</td>
                  <td className="border  px-4 py-2">{employee.department}</td>
                  <td className="border  px-4 py-2">{employee.position}</td>
                  <td className="border  px-4 py-2">{employee.salary}</td>
                  <td className="border  px-4 py-2">
                    <button
                      onClick={() => handleEdit(employee.employee_id)}
                      className="mr-2 text-blue-500 font-medium py-1 px-3 rounded sm:py-2 sm:px-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.employee_id)}
                      className="text-red-700  font-medium py-1 px-3 rounded sm:py-2 sm:px-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded">
            <p className="text-lg font-semibold mb-2">Confirm Deletion</p>
            <p className="mb-4">Are you sure you want to delete this employee?</p>
            <div className="flex justify-end">
              <button onClick={cancelDelete} className="mr-2 px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Popup */}
      {showEmployeeToEdit && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
    <div className="bg-white p-4 rounded max-w-md w-full">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div>
          <label htmlFor="hire_date">Hire Date:</label>
          <input
            type="text"
            id="hire_date"
            name="hire_date"
            value={formData.hire_date}
            onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
            readOnly
          />
        </div>
        <div>
          <label className="block mb-2">Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
              required
            >
               <option value="IT">IT</option>
              <option value="FINANCE">FINANCE</option>
              <option value="HR">HR</option>
            </select>
        </div>
        <div>
          <label className="block mb-2">Position:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
              required
            >
               <option value="Admin">Admin</option>
              <option value="Employee">User</option>
              
            </select>
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={cancelEdit} className="mr-2 px-4 py-2 border rounded">
          Cancel
        </button>
        <button onClick={confirmEdit} className="px-4 py-2 bg-red-500 text-white rounded">
          Change
        </button>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default EditEmployee;
