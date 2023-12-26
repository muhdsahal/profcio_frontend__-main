import React from 'react';

const UserBookingComponent = ({ selectedDay, onSelectUserDay }) => {
  const handleSelectDay = (day) => {
    onSelectUserDay(day);
  };

  return (
    <div>
      <h2>Choose a day to book:</h2>
      <p>Selected Day: {selectedDay ? selectedDay.toDateString() : 'No day selected'}</p>
      <button onClick={() => handleSelectDay(selectedDay)}>Book this day</button>
    </div>
  );
};

export default UserBookingComponent;
