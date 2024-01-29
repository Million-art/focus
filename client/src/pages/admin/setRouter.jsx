import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWifi } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiBaseUrl} from '../../helper/constant'

const SetRouter = () => {
  const [scannedRouter, setScannedRouter] = useState([]);
 
  // Function to add a new router
  const addRouter = async (router) => {
    try {
      const endpoint = 'http://localhost:3001/router/set/';
      await axios.post(endpoint, { router });
      // Refresh scanned routers after successful addition
      scanRouter();
      // Display success message
      toast.success('Router added successfully!', { position: toast.POSITION.TOP_RIGHT });
    } catch (error) {
        // Display error message
      toast.warning('Router already Exist', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  // Function to scan for available addresses
  const scanRouter = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/router/scan`);
      setScannedRouter(response.data);
    } catch (error) {
      console.error('Error fetching routers:', error);
      setErrorMessage('Error fetching routers. Please try again later.');
    }
  };

  // Fetch scanned addresses and list on component mount
  useEffect(() => {
    scanRouter();
  }, []);

  // Function to handle adding router from scanned list
  const handleAddRouterFromScan = (router) => {
    addRouter(router);
  };

  return (
    <div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Scanned Router:</h2>
        <ul className="divide-y divide-gray-200">
           
          {scannedRouter && scannedRouter.networks && scannedRouter.networks.map((network, index) => (
            <li key={index} className="flex justify-between items-center py-2 text-gray-800 hover:text-white px-3 hover:bg-blue-400 rounded-md">
              <span className=" "><FaWifi className="mr-2 text-3xl bg-blue-500 rounded-full text-white p-1" />{network.ssid}</span>
              <button
                onClick={() => handleAddRouterFromScan(network)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Router
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SetRouter;
