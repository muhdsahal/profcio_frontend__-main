import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loading/Loading';
import { ListItem, Rating, Typography } from '@mui/material';
import { Button, ListItemPrefix } from '@material-tailwind/react';
import { Box, } from '@mui/material';
import AvailableDates from './AvailableDates';
import { base_url } from '../../constants/constants';
import blankImage from '../../assets/blankprofile.png'

function EmployeeDetails() {
  const [employeeData, setEmployeeData] = useState(null);
  const [bookingData,setBookingData] = useState([])
  const [reviewData,setReViewData] = useState([])


  const { id } = useParams(); 

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${base_url}/auth/employeelisting/${id}/`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]); 
  // Fetch data whenever the ID changes
  
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${base_url}/employee/employee/${id}/book/`);
        setBookingData(response.data);
        
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchBookingData();
  }, [id]);

  useEffect(()=> {
    const fetchReviewData = async () =>{
      try{
        const response = await axios.get(`${base_url}/employee/review/${id}`);
        setReViewData(response.data);
        console.log(response.data,'reviewdataaaaaaaaaaaaaaa');
      } catch (error) {
        console.error('Error fetching Review data:', error);
      }
    };
    fetchReviewData()
  },[id])
 
  if (!employeeData){
    return <Loader/>
  }

 
  
  return (<>
  <div>
      <h1 className='flex text-center justify-center'>EmployeeDetails</h1>
      
    </div>

    {employeeData ? (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        
        <div className="container mx-auto px-4">
           <img
              src={employeeData.profile_photo}
              alt="card-image"
              className="w-full h-100 object-cover"
            />
        </div>
        
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
        <section>
        <div className="flex justify-center">
          <Typography variant='h5' className="text-black text-3xl font-poppins font-medium">
            Ratings And Reviews
          </Typography>
        </div>

        {reviewData.map((review, index) => (
          <div key={index} className="border rounded-md p-6 md:flex-col max-h-96 overflow-y-auto">
            <div className="container w-full mb-6 p-6 border shadow-xl rounded-md">
              <div className="w-full flex justify-between">
              <ListItem>
              <ListItemPrefix>
              {review.userDetails.profile_photo ? (
                <img className='rounded-full w-12' src={review.userDetails.profile_photo} />
              ) : (
                <img alt="img" src={blankImage} className='rounded-full w-12' />
              )}
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {review.userDetails.username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {review.userDetails.email}
              </Typography>
            </div>
        </ListItem>
              </div>
                <Rating ratedColor="amber" value={review.rating} readonly />
              <div className="flex gap-2 mb-2">
                <p className="font-poppins font-medium">{review.review_text}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
   
   </>  
   
   
  );
};

export default EmployeeDetails;

