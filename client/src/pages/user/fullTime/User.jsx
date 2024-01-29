import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUser } from '../../../helper/getUser';
import { apiBaseUrl } from '../../../helper/constant';

const User = () => {
  const [entries, setEntries] = useState([]);
  const [clockInClicked, setClockInClicked] = useState(false);
  const [clockOutClicked, setClockOutClicked] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const user = getUser();

  useEffect(() => {
    // Reset clockInClicked state every morning
    const resetClockIn = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 7 && !clockInClicked) {
        setClockInClicked(false);
        setClockOutClicked(false); // Enable Clock Out button at the start of the day
        setClockInTime(null);
        setClockOutTime(null);
        // Remove clock-in and clock-out cookies
        Cookies.remove('clockInTime');
        Cookies.remove('clockOutTime');
      }
    };
    const intervalId = setInterval(resetClockIn, 1000 * 60 * 60); // Check every hour

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [clockInClicked]);

  useEffect(() => {
    // Load clock-in and clock-out times from cookies
    const savedClockInTime = Cookies.get('clockInTime');
    const savedClockOutTime = Cookies.get('clockOutTime');

    if (savedClockInTime) {
      setClockInTime(new Date(savedClockInTime));
    }
    if (savedClockOutTime) {
      setClockOutTime(new Date(savedClockOutTime));
    }
  }, []);

  const handleClockIn = async () => {
    // Check if the Clock In button has already been clicked and it's before 7 AM
    if (!clockInClicked && new Date().getHours() >= 7) {
      const currentDate = new Date().toLocaleDateString();
      const clockInTime = new Date();
      setClockInTime(clockInTime);
      Cookies.set('clockInTime', clockInTime.toUTCString()); // Save clock-in time in cookies
      setClockInClicked(true); // Disable Clock In button
      // Set a timeout to unhide the Clock Out button after 30 seconds
      setTimeout(() => {
        setClockOutClicked(true);
      }, 30000);
    } else {
      alert('Clock In button can only be clicked once after 7 AM.');
    }
  };

  const handleClockOut = async () => {
    // Check if the Clock Out button has not been clicked
    if (!clockOutClicked) {
      const currentDate = new Date().toLocaleDateString();
      const clockOutTime = new Date();
      setClockOutTime(clockOutTime);
      Cookies.set('clockOutTime', clockOutTime.toUTCString()); // Save clock-out time in cookies
      setClockOutClicked(true); // Disable Clock Out button
    } else {
      alert('Clock Out button can only be clicked once.');
    }
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <div>
        <button onClick={handleClockIn} disabled={clockInClicked} className="bg-blue-500 text-white px-4 py-2 mr-2">
          Clock In
        </button>
        <button onClick={handleClockOut} disabled={clockOutClicked} className="bg-green-500 text-white px-4 py-2">
          Clock Out
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Entries</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Clock In</th>
              <th className="border px-4 py-2">Clock Out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{new Date().toLocaleDateString()}</td>
              <td className="border px-4 py-2">{clockInTime ? clockInTime.toLocaleTimeString() : 'Not recorded'}</td>
              <td className="border px-4 py-2">{clockOutTime ? clockOutTime.toLocaleTimeString() : 'Not recorded'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
