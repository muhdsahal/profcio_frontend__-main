import React, { useState } from 'react';
import { Calendar, 
  // momentLocalizer 
} from 'react-calendar';
import axios from 'axios'; // Assuming Axios for API calls

function EmployeeAvailabilityCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (newDates) => {
    setSelectedDates(newDates);
  };

  const handleSaveAvailability = async () => {
    try {
      const response = await axios.post('/api/employees/my-availability/', {
        available_dates: selectedDates.map((date) => date.format('YYYY-MM-DD')),
      });
      // Handle successful saving
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <Calendar
      // localizer={momentLocalizer}
      value={selectedDates}
      onChange={handleDateSelect}
      selectRange={true} // Allow multi-date selection
      onSelect={handleSaveAvailability}
      returnValue="range"
      // Customize appearance of available and unavailable dates
    />
  );
}

export default EmployeeAvailabilityCalendar