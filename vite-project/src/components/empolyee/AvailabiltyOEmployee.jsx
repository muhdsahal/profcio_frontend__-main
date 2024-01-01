import React, { useState } from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import tw from '@material-tailwind/react';

function AvailabilitySettings() {
  const [availableDays, setAvailableDays] = useState([]);

  const handleDayChange = (day) => {
    const updatedDays = [...availableDays];
    updatedDays.includes(day) ? updatedDays.remove(day) : updatedDays.push(day);
    setAvailableDays(updatedDays);
  };

  // ... handle saving availability to backend
  const handleSaveAvailability = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/employees/available/<str:date>/', {
        available_days: availableDays,
      });
      console.log('Availability saved:', response.data);
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  return (
    <ThemeProvider>
      <div className={tw`p-4 border border-gray-200 rounded-md`}>
        <h2 className={tw`text-2xl font-bold mb-4`}>My Availability</h2>
        <p className={tw`mb-4`}>Select the days you're available to work:</p>
        <ul className={tw`list-none p-0`}>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <li key={day} className={tw`mb-2`}>
              <label className={tw`flex items-center`}>
                <input
                  type="checkbox"
                  value={day}
                  checked={availableDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className={tw`rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                />
                <span className={tw`ml-2`}>{day}</span>
              </label>
            </li>
          ))}
        </ul>
        <button className={tw`bg-blue-500 text-white px-4 py-2 rounded font-medium w-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
          Save Availability
        </button>
        {availableDays.length >= 3 && availableDays.length <= 7 ? (
          <p className={tw`mt-4 text-green-600`}>
            You've selected {availableDays.length} days, which is valid!
          </p>
        ) : (
          <p className={tw`mt-4 text-red-600`}>Please select between 3 and 7 days.</p>
        )}
      </div>
    </ThemeProvider>
  );
}

export default AvailabilitySettings;
