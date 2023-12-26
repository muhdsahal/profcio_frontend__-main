import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import moment from 'moment-timezone';
import axios from 'axios';
import toast from "react-hot-toast";

function EmployeeCalendarView({ data, employeeDetails }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/auth/employeedetails/${id}/book/`)
            .then((response) => {
                const bookedDatesArray = response.data.map((booking) => new Date(booking.booking_date));
                setBookedDates(bookedDatesArray);
            })
            .catch((error) => {
                console.log("Error fetching booked dates", error);
            });
    }, [id]); // Make sure to provide the dependency array if using variables from the outer scope

    const getEmployeeForDate = (date) => {
        const localDate = moment.tz(date, 'Asia/Kolkata');
        const formattedSelectedDate = localDate.format('YYYY-MM-DD');

        if (!data) {
            return employeeDetails;
        }

        const selectedData = data.find((entry) => entry.date === formattedSelectedDate);
        return selectedData;
    };

    const customDayCell = ({ date }) => {
        const leftEmployee = getEmployeeForDate(date);
        const isZeroOrNegative = leftEmployee <= 0;

        return (
            <div>
                {leftEmployee !== null && (
                    <p style={{ color: isZeroOrNegative ? "red" : "green" }}>
                        {leftEmployee}
                    </p>
                )}
            </div>
        );
    };

    const handleSelectedDay = (date) => {
        if (date <= new Date() || getEmployeeForDate(date) <= 0) {
            toast.error("Slots are full or date is invalid");
        } else {
            setSelectedDate(date);
        }
    };

    const handleBooking = () => {
        if (!selectedDate) {
            toast.error("Please select a valid date.");
            return;
        }

        if (bookedDates.some((bookedDate) => selectedDate.toDateString() === bookedDate.toDateString())) {
            toast.error("This date is already booked. Please select another date.");
        } else {
            const data = {
                date: selectedDate,
                employeeDetails: employeeDetails,
                bookingDate: bookedDates,
            };
            // Navigate or perform the booking logic here
            // navigate('http://127.0.0.1:8000/auth/employeedetails/book/')
        }
    };

    return (
        <div>
            <Calendar
                onChange={handleSelectedDay}
                value={selectedDate}
                tileContent={customDayCell}
                selectRange={false}
                tileDisabled={({ date }) => date <= new Date() || getEmployeeForDate(date) <= 0}
            />

            {selectedDate ? (
                <>
                    <p>Date: {selectedDate.toLocaleDateString()}</p>
                    <Button onClick={handleBooking} className="bg-blue-500 text-white p-2 rounded-md">Click To Proceed</Button>
                </>
            ) : null}
        </div>
    );
}

export default EmployeeCalendarView;
