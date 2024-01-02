import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@material-tailwind/react';
import toast, { Toaster } from "react-hot-toast";

function AvailableDates(props) {
  const empId = props.empId;
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userId = decode.user_id;

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/auth/employee/${empId}/book/`);
        const bookedDatesArray = response.data.map((dateInfo) => new Date(dateInfo.booking_date));
        setBookedDates(bookedDatesArray);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, [userId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const bookEmployee = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Directly use selectedDate

      console.log('userId:', userId);
      console.log('empId:', empId);
      console.log('formattedDate:', formattedDate);

      const response = await axios.post('http://127.0.0.1:8000/auth/employee/booking/register/', {
        userId,
        empId,
        formattedDate // Date format as per your requirement
      });
      toast.success("booking succcessfully completed !");
      console.log('Booking successful:', response.data.message);
      // You can perform any action after successful booking here
      return response.data; // Return the response if needed
    } catch (error) {
      toast.error("an error during booking!");
      // Handle error
      console.error('Error booking:', error);
    }
  };

  return (
    <div>
      <h1>Available Dates</h1>
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileDisabled={({ date }) =>
          bookedDates.some((bookedDate) => bookedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]) ||
          date.getTime() <= new Date().setHours(0, 0, 0, 0) // Disable today and previous days
        }
      />
      <p>
        Selected Date: {selectedDate && selectedDate.toLocaleDateString()}
        {selectedDate && selectedDate.getTime() > new Date().setHours(0, 0, 0, 0) && ( // Enable button only for future dates
          <Button color='blue' onClick={bookEmployee}>
            Book Now
          </Button>
        )}
      </p>
      <Toaster />
    </div>
  );
}

export default AvailableDates;
