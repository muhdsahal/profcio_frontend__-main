import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar&Footer/Navbar'
import FooterPage from '../Navbar&Footer/FooterPage'
import ServiceListPage from './ServiceListPage';
// import carMecanic from '../../image/image_car.png';
// import Plumber from '../../image/Plumber.png';
// import Civil from '../../image/civilone.png'
import { Typography,
        Button,
        
       } from "@material-tailwind/react";

function Home() {

  const customStyle = {
    fontFamily :'monospace'
  }
  const navigate = useNavigate()

  const toEmployeeList =()=>{
    navigate('/employeelist')
  }
  
  
  return (
    <div>
    <Navbar></Navbar>
    <Typography variant="h3" color="black" style={customStyle} className='flex items-center justify-center' >
      Welcome To Profcio
      </Typography>
      <Typography variant="h3" color="black" style={customStyle} >
      professional services <br />
      homes and commercial properties
      </Typography>
      <u variant="h3" color="black" style={customStyle} >_________________________________________________________________</u>
    <Typography variant='h2' color="black" style={customStyle} >
      Hire The Best Employees
      <br />
      <Button variant="outlined" color='black'
       className='flex items-start justify-start'
       onClick={toEmployeeList}>Click here</Button>
    </Typography>
    <br />

    

    <ServiceListPage />
    <FooterPage />
    </div>
  )
}

export default Home


