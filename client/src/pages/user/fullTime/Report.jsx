import React, { useState } from 'react';
import Nav from '../../../components/Nav';
import axios from 'axios';
import {apiBaseUrl} from '../../../helper/constant'


const Report = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    validateForm();
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    validateForm();
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    validateForm();
  };

  const validateForm = () => {
    const isValidDates = startDate !== '' && endDate !== '' && startDate <= endDate;
    const isValidReason = reason.trim() !== '';
    setIsValid(isValidDates && isValidReason);
  };

  const handleSubmitRequest = async () => {
    if (isValid) {
      setIsSubmitting(true); // Enable form submission

      try {
        const response = await axios.post(
          `${apiBaseUrl}/leave/request`,
          { startDate, endDate, reason },
          { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );

        console.log('Leave request submitted:', response.data);
        alert('Leave request sent!');

        setStartDate('');
        setEndDate('');
        setReason('');
        setErrorMessage('');
      } catch (error) {
        console.error('Error submitting leave request:', error);
        setErrorMessage('Error submitting leave request. Please try again.');
      }

      setIsSubmitting(false); // Disable form submission
    } else {
      setErrorMessage('Please fill in all fields correctly before submitting.');
    }
  };

  return (
    <div className="bg-gray-200 h-screen">
      <Nav />

      <div className="container mx-auto mt-10 p-8 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Leave Request</h1>

        <div className="flex flex-col space-y-4">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border p-2 resize-none"
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border p-2 resize-none"
            />
          </label>

          <label>
            Reason:
            <textarea
              placeholder="Enter reason for leave..."
              rows="5"
              value={reason}
              onChange={handleReasonChange}
              className={`border p-2 flex-1 w-full resize-none ${isValid ? 'border-gray-300' : 'border-red-500'}`}
            ></textarea>
          </label>

          <button
            className={`bg-blue-500 text-white p-2 rounded-md ${isValid ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={handleSubmitRequest}
            disabled={!isValid || isSubmitting} // Disable the button when form is submitting
          >
            {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
          </button>

          {!isValid && (
            <p className="text-red-500 text-sm">{errorMessage || 'Please fill in all fields correctly before submitting.'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;