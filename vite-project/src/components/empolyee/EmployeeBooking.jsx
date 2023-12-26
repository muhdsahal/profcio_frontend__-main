import React, { useState } from 'react';
import Calendar from 'react-calendar';

const EmployeeBookingPage = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDaysSelect = (date) => {
    if (date instanceof Date) {
      const updatedSelectedDays = [...selectedDays];
      const dateIndex = updatedSelectedDays.findIndex((d) => d.getTime() === date.getTime());

      if (dateIndex !== -1) {
        updatedSelectedDays.splice(dateIndex, 1); // Remove the date if it exists
      } else {
        if (updatedSelectedDays.length < 3) {
          updatedSelectedDays.push(date); // Add the date if less than 3 dates are selected
        } else {
          // Alert or message indicating the limit of selected days
          alert('Maximum of 3 days can be selected');
        }
      }

      setSelectedDays(updatedSelectedDays);
    } else {
      console.error('Invalid date object received:', date);
    }
  };
  const date = new Date();
  const dateString = date.toDateString();
  return (
    <div>
      <h1>Employee Booking Page</h1>
      
      <div>
        <h2>Select at most 3 days:</h2>
        <Calendar onChange={handleDaysSelect} value={selectedDays} selectRange />
        <div>
          <h3>Selected Days:</h3>
          <ul>
            {selectedDays.map((date, index) => (
              <li key={index}>{dateString}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBookingPage;
