import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from '../../../helper/getUser';
import Nav from '../../../components/Nav';
import {apiBaseUrl} from '../../../helper/constant'

const Attendance = () => {
    const user = getUser();
    const fullName = (user.first_name +""+ user.last_name)
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
        axios.get(`${apiBaseUrl}/attendance/employee-attendance/${user.employee_id}`)
        .then(response => {
     
                // Check if the response data is an array before setting the state
                if (response.data) {
                    // Convert the date format for each entry
                    const formattedData = response.data.map(entry => ({
                        ...entry,
                        date: new Date(entry.date).toISOString().split('T')[0]
                    }));
                    setAttendanceData(formattedData);
                } else {
                    console.error('Invalid data format. Expected an array.');
                }
            })
            .catch(error => {
                console.error('Error fetching attendance data:', error);
            });
    }, [user.employee_id]);

    const handlePrint = () => {
        window.print();
    };
    
    return (
        <div className=""> {/* Apply Tailwind classes */}
        <Nav />
        <h1 className="text-2xl font-bold mb-4 text-center mt-10">{`${fullName}'s Attendance`}</h1>
        <button onClick={handlePrint} className=" flex end mb-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Print Attendance
        </button>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Employee ID</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Clock In</th>
                    <th className="py-2 px-4 border-b">Clock Out</th>
                </tr>
            </thead>
            <tbody>
                {attendanceData.map(entry => (
                    <tr key={entry.record_id}>
                        <td className="py-2 px-4 text-center border-b">{entry.employee_id}</td>
                        <td className="py-2 px-4 text-center border-b">{entry.date}</td>
                        <td className="py-2 px-4 text-center border-b">{entry.clock_in}</td>
                        <td className="py-2 px-4 text-center border-b">{entry.clock_out}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default Attendance;
