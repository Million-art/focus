import React, { useState } from 'react';
import CheckAttendance from './Checkattendance';
import SetRouter from './setRouter';
import EditEmployee from './EditEmployee';
import AddEmployee from './AddEmployee';
import AddRemotEmployee from './AddRemotEmployee';
import ViewRouter from './viewRouter';
import Report from './Report';
import AssignTask from './AssignTask';
import ViewTask from './ViewTask';
import Account from './Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserClock, faUserPlus, faEdit, faTasks, faWifi , faChartBar, faUnlockAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isRemotAccordionOpen, setIsRemotAccordionOpen] = useState(false);
  const [isFullTimeAccordionOpen, setIsFullTimeAccordionOpen] = useState(false);

  const handleOptionClick = (option) => {
    if (option === 'remotAccordion') {
      // Toggle only the accordion for Remot Employees
      setIsRemotAccordionOpen(!isRemotAccordionOpen);
    } else if (option === 'fullTimeAccordion') {
      // Toggle only the accordion for Full-Time Employees
      setIsFullTimeAccordionOpen(!isFullTimeAccordionOpen);
    }
    setSelectedOption(option);
  };
  
  

  const handleLogout = () => {
    setSelectedOption('logout');
    window.location.href = '/login';
  };

  return (
    <section>
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="w-62 bg-gray-800 text-white border-r overflow-y-auto">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <div className="space-y-2 mt-32">
            <button
              className={`block w-full text-left px-4 py-2 rounded ${
                selectedOption === 'remotAccordion' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500'
              }`}
              onClick={() => handleOptionClick('remotAccordion')}
            >
              <FontAwesomeIcon icon={faUserClock} className="mr-2" /> Remot Employees
            </button>
            {isRemotAccordionOpen && (
              <div className="mt-2">
                <ul>
                  <li
                    className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                      selectedOption === 'assignTask' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleOptionClick('assignTask')}
                  >
                    <FontAwesomeIcon icon={faTasks} className="mr-2" /> Assign Task
                  </li>
                  <li
                    className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                      selectedOption === 'addRemotEmployees' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleOptionClick('addRemotEmployees')}
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Add Remot Employee
                  </li>
                  <li
                    className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                      selectedOption === 'viewTask' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleOptionClick('viewTask')}
                  >
                    <FontAwesomeIcon icon={faTasks} className="mr-2" /> View Tasks
                  </li>
                </ul>
              </div>
            )}
            <button
              className={`block w-full text-left px-4 py-2 rounded ${
                selectedOption === 'fullTimeAccordion' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500'
              }`}
              onClick={() => handleOptionClick('fullTimeAccordion')}
            >
              <FontAwesomeIcon icon={faUserClock} className="mr-2" /> Full-Time Employees
            </button>
            {isFullTimeAccordionOpen && (
              <div className="mt-2">
                <ul>
                  <li
                    className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                      selectedOption === 'checkAttendance' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleOptionClick('checkAttendance')}
                  >
                    <FontAwesomeIcon icon={faUserClock} className="mr-2" /> Check Attendance
                  </li>
                  <li
                    className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                      selectedOption === 'addEmployees' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleOptionClick('addEmployees')}
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Add Employees
                  </li>
                  <li
                    className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                      selectedOption === 'editEmployees' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleOptionClick('editEmployees')}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Employees
                  </li>
                </ul>
              </div>
            )}
            <button
              className={`block w-full text-left px-4 py-2 rounded ${
                selectedOption === 'setRouter' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500'
              }`}
              onClick={() => handleOptionClick('setRouter')}
            >
              <FontAwesomeIcon icon={faWifi } className="mr-2" /> Add Router
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded ${
                selectedOption === 'viewRouter' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500'
              }`}
              onClick={() => handleOptionClick('viewRouter')}
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-2" /> View Router
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded ${
                selectedOption === 'viewReport' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500'
              }`}
              onClick={() => handleOptionClick('viewReport')}
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-2" /> View Report
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded ${
                selectedOption === 'unlockAccount' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500'
              }`}
              onClick={() => handleOptionClick('unlockAccount')}
            >
              <FontAwesomeIcon icon={faUnlockAlt} className="mr-2" /> Unlock Accounts
            </button>
            <button
              className={`block text-red-500 w-full text-left px-4 py-2 rounded ${
                selectedOption === 'logout' ? 'text-red-500' : 'hover:bg-blue-500'
              }`}
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Log Out
            </button>
          </div>
        </div>
      </div>

        {/* Right Panel */}
        <div className="flex-1 p-4 overflow-y-auto text-black ">
          <h1>👋 WELCOME BACK ADMIN!</h1>
          {/* Render content based on selectedOption */}
          {selectedOption === 'checkAttendance' && <CheckAttendance />}
          {selectedOption === 'addEmployees' && <AddEmployee />}
          {selectedOption === 'addRemotEmployees' && <AddRemotEmployee />}
          {selectedOption === 'editEmployees' && <EditEmployee />}
          {selectedOption === 'assignTask' && <AssignTask />}
          {selectedOption === 'viewTask' && <ViewTask />}
          {selectedOption === 'setRouter' && <SetRouter />}
          {selectedOption === 'viewRouter' && <ViewRouter />}
          {selectedOption === 'viewReport' && <Report />}
          {selectedOption === 'unlockAccount' && <Account />}
         </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
