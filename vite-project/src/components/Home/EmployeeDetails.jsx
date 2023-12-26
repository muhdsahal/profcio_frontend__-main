import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loading/Loading';
import { Rating } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import "react-calendar/dist/Calendar.css";
import UserBookingComponent from './UserBooking';
const EmployeeDetails = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // Add selectedDay state

  const { id } = useParams(); 

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/auth/employeelisting/${id}/`);
        setEmployeeData(response.data);
        console.log(response.data,'employeeeeeeeeeeeeeeeeeeeeeeee');
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]); // Fetch data whenever the ID changes
  // console.log(employeeData,'employeeData');

  if (!employeeData){
    return <Loader/>
  }
  return (<>
  <div>
      <h1 className='flex text-center justify-center'>EmployeeDetails</h1>
      
    </div>

    {employeeData ? (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* image gallery */}
        
        <div className="container mx-auto px-4">
          {/* Your image gallery code
           */}
           <img
              src={employeeData.profile_photo}
              alt="card-image"
              className="w-full h-100 object-cover"
            />
        </div>

        {/* description */}
        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">
            {/* Product title */}
            {employeeData.username}
          </h2>
          {/* Other product details */}
         
          
          <Box mt={6}>
            <p className="pb-2 text-xs text-gray-500">Work</p>
            <div className="flex gap-1">
              {/* Mapping through sizes */}
              {employeeData.work}
            </div>
          </Box>

          <Box mt={6}>
            <p className="pb-2 text-xs text-gray-500">Charge :</p>
            <div className="flex gap-1">
            {employeeData.charge}
            </div>
          </Box>

          <Box mt={6}>
            <p className="pb-2 text-xs text-gray-500">Quantity</p>
            <div className="flex">
              <Button>-</Button>
              <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                1
              </div>
              <Button>+</Button>
            </div>
          </Box>

          <Box mt={7} display="flex" flexDirection="row" alignItems="center" gap={6}>
            <Button variant="contained" className="bg-violet-900 text-white hover:bg-blue-800">
              <AddShoppingCart />
              Add to cart
            </Button>
            <Button variant="contained" className="bg-amber-400 hover:bg-yellow-300">
              <Favorite />
              Wishlist
            </Button>
          </Box>
        </div>

        <UserBookingComponent
              selectedDay={selectedDay}
              onSelectUserDay={(day) => setSelectedDay(day)}
            />
      </section>
      
       ) : (
        <p>Loading...</p>)}
   </>
    

    
  );
};

export default EmployeeDetails;

