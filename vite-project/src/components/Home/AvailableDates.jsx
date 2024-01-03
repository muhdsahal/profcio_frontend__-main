import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@material-tailwind/react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../../constants/constants';
import moment from 'moment-timezone';

function AvailableDates(props) {
  const empId = props.empId;
  const employeeCharge = props.empdetails;

  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${base_url}/auth/employee/${empId}/book/`);
        const bookedDatesArray = response.data.map((dateInfo) =>
          moment(dateInfo.booking_date).tz('Asia/Kolkata').toDate()
        );
        setBookedDates(bookedDatesArray);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, [userId]);

  const isSunday = (date) => {
    return date.getDay() === 0; // Sunday is represented by 0 in JavaScript's getDay()
  };

  const handleDateChange = (date) => {
    console.log(date, 'genuine date');
    setSelectedDate(date);
  };

  const bookEmployee = async () => {
    try {
      if (!selectedDate) {
        toast.error('Please select a valid date!');
        return;
      }

      const formattedDate = moment(selectedDate).tz('Asia/Kolkata').format('YYYY-MM-DD');

      // Check if the selected date is a Sunday and prevent booking if true
      if (isSunday(selectedDate)) {
        toast.error('Booking is not allowed on Sundays!');
        return;
      }

      const data = {
        userId: userId,
        empId: empId,
        currency: 'INR',
        unit_amount: employeeCharge * 100,
        quantity: 1,
        mode: 'payment',
        date: formattedDate,
        
      };

      const response = await axios.post(`${base_url}/auth/booking/payment/`, data);
      window.location.href = response.data.message.url;

      return response.data;
    } catch (error) {
      toast.error('An error occurred during booking!');
      console.error('Error booking:', error);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      return (
        <div style={{ position: 'absolute', bottom: '5px', left: '5px' }}>
          {isSunday(date) && <span style={{ color: 'red' }}>Holiday</span>}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Available Dates</h1>
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileDisabled={({ date }) =>
          bookedDates.some(
            (bookedDate) => bookedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
          ) ||
          date.getTime() <= new Date().setHours(0, 0, 0, 0) || // Disable today and previous days
          isSunday(date) // Disable Sundays
        }
        />
       <h4 className='font-bold text-red-600' >Sunday Holiday</h4>
        
      <p>
        Selected Date: {selectedDate && selectedDate.toLocaleDateString()}
        {selectedDate && selectedDate.getTime() > new Date().setHours(0, 0, 0, 0) && (
          <Button color="blue" onClick={bookEmployee}>
            Book Now
          </Button>
        )}
      </p>
      <Toaster />
    </div>
  );
}

export default AvailableDates;
