import React, { useState, useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import {apiBaseUrl} from '../../helper/constant'

 
const ViewRouter = () => {
    const [routerList, setRouterList] = useState([]);


    
  // Function to fetch the list of router s
  const fetchRouterList = async () => {

    try {
      const endpoint = `${apiBaseUrl}/router/set/`;
      const response = await axios.get(endpoint);
      setRouterList(response.data);
    } catch (error) {
      console.error('Error fetching Routers:', error);
    }
  };

  // Function to delete a router 
  const deleteRouter = async (id) => {
    try {
      const endpoint = `${apiBaseUrl}/router/set/${id}`;
      await axios.delete(endpoint);
      await fetchRouterList(); // Refresh the  list after deletion
        // Display success message
        toast.success('Router deleted successfully!', { position: toast.POSITION.TOP_RIGHT });
    } catch (error) {
              // Display error message
        toast.warning('Router canot be deleted', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  // Function to handle the delete button click with confirmation
  const handleDeleteRouter = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this router?');
    if (confirmDelete) {
      await deleteRouter(id);
    }
  };

     // Fetch  addresses and  list on component mount
  useEffect(() => {
    fetchRouterList();
 }, []);
  return (
    <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">Router List:</h2>
        <ul className="divide-y divide-gray-200">
        {routerList && routerList.length > 0 ? (
            routerList.map((router) => (
            <li key={router.id} className="flex justify-between items-center px-3 py-2 text-gray-800 text-1xl rounded-lg hover:bg-red-500 hover:text-white">
                <span className=""><FaWifi className="mr-2 text-3xl bg-blue-500 rounded-full text-white p-1" />{router.ssid}</span>
                <button
                onClick={() => handleDeleteRouter(router.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                Delete
                </button>
            </li>
            ))
        ) : (
            <li className="flex justify-between items-center py-2">
            <span className="text-gray-800">No Added Router</span>
            </li>
        )}
        </ul>
        <ToastContainer />

    </div>
    )
}

export default ViewRouter