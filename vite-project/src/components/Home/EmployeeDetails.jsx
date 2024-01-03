import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loading/Loading';
import { Rating } from '@mui/material';
import { Button } from '@material-tailwind/react';
import { Box, } from '@mui/material';
import { IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import AvailableDates from './AvailableDates';


function EmployeeDetails() {
  const [employeeData, setEmployeeData] = useState(null);
  const [bookingData,setBookingData] = useState([])


  const { id } = useParams(); 

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/auth/employeelisting/${id}/`);
        setEmployeeData(response.data);
        // console.log(response.data,'employeeeeeeeeeeeeeeeeeeeeeeee');
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]); // Fetch data whenever the ID changes
  // console.log(employeeData,'employeeData');
  
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/auth/employee/${id}/book/`);
        setBookingData(response.data);
        console.log(response.data,'bookigdataaaaaaaaaaaaaaa');
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchBookingData();
  }, [id]);
 
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
            {/* <Button className='flex align-middle w-45 h-24' color="green">Chat</Button> */}
        </div>
        

        {/* description */}
        <div className="mx-auto px-5 lg:px-5">
            <h2 className="pt-3 text-2xl font-bold lg:pt-0">
            
            Name : {employeeData.username}
          </h2>
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">
        
            Work : {employeeData.work}
          </h2>

          <h2 className="pt-3 text-2xl font-bold lg:pt-0">
        
        Charge : ₹  {employeeData.charge}
        </h2>

      <h2 className="pt-3 text-2xl font-bold lg:pt-0">
        
        Location : {employeeData.place}
      </h2>
      <h2 className="pt-3 text-2xl font-bold lg:pt-0">
        
      Experience : {employeeData.experience} year
      </h2>
      <p className="pt-3 text-xs font-bold lg:pt-0">
        
      Description : {employeeData.description} 
      </p>
      
      

       
         
          
         


          <AvailableDates  empId={employeeData.id} empdetails={employeeData.charge}/>
        </div>

        
      </section>
      
       ) : (
        <p>Loading...</p>)}
   </>
    

    
  );
};

export default EmployeeDetails;

