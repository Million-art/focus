import React ,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../../features/action';  
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; 
import {apiBaseUrl} from '../../helper/constant'
import axios from 'axios'
 
const AddEmployee = () => {

  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees);

  const currentDate = new Date().toISOString().split('T')[0];  

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    hire_date: currentDate,
    department: 'Select Department',
    position: 'Select Position',
    salary: '',
    is_login: false,
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
 
    // Set the hire_date to the current date
    const currentDateString = new Date().toISOString().split('T')[0];
    const formDataWithCurrentDate = { ...formData, hire_date: currentDateString };
  
      // Add new employee
      try {
        const response = await axios.post(`${apiBaseUrl}/employee/employees`, formDataWithCurrentDate);
        if (response.status === 201) {  
            const { data } = response; // Extract the response data

            toast.success('Employee added successfully!', { position: toast.POSITION.TOP_RIGHT });

            // Dispatch the action to add employee to Redux store
            dispatch(addEmployee(data,'data'));

           setEmployees([...employees, data]);
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            hire_date: '',
            department: 'Select Department',
            position: 'Select Position',
            salary: '',
            is_login:false
          });
        } else {
          toast.warning('Employee already Exist', { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        toast.error('Error while registering Employee', { position: toast.POSITION.TOP_RIGHT });
      }
    
  };

  



  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">Blih Employees Attendance Manager</h1>

      <form onSubmit={handleFormSubmit} className="mb-8 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          />

          <label className="block mb-2">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          />

          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Hire Date:</label>
          <input
            type="text"
            name="hire_date"
            value={formData.hire_date} // Display formatted date
            className="border p-2 mb-4 w-full"
            readOnly // Make the input non-editable
            required
          />

          <label className="block mb-2">Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          >
            <option value="Select Department" disabled>Select Department</option>
            <option value="IT">IT</option>
            <option value="FINANCE">FINANCE</option>
            <option value="HR">HR</option>
          </select>

          <label className="block mb-2">Position:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          >
            <option value="Select Position" disabled>Select Position</option>
            <option value="Admin">Admin</option>
            <option value="Employee">User</option>
            
          </select>

          <label className="block mb-2">Salary:</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            required
          />
        </div>

        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 w-64">
        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />

          Add Employee
        </button>
      </form>
    
      <ToastContainer />
     
    </div>
  );
};

export default AddEmployee;
