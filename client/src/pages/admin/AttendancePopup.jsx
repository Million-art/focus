
import React from 'react';

const AttendancePopup = ({ employee, onClose }) => {
  const attendanceData = employee.attendanceData || [];

  return (
    <div className="popup p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Attendance for {`${employee.first_name} ${employee.last_name}`}</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Clock In</th>
            <th className="px-4 py-2">Clock Out</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.date}>
              <td className="border px-4 py-2">{new Date(entry.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{entry.clock_in}</td>
              <td className="border px-4 py-2">{entry.clock_out}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button onClick={() => window.print()} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md">Print</button>
        <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">Close</button>
      </div>
    </div>
  );
};

export default AttendancePopup;
