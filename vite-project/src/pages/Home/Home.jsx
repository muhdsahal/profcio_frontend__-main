import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar&Footer/Navbar'
import FooterPage from '../Navbar&Footer/FooterPage'
import ServiceListPage from './ServiceListPage';
import emp from '../../image/constrution_image1.png'
// import carMecanic from '../../image/image_car.png';
// import Plumber from '../../image/Plumber.png';
// import Civil from '../../image/civilone.png'
import { Typography,
        Button } from "@material-tailwind/react";
        
       

function Home() {

  const customStyle = {
    fontFamily :'monospace'
  }
  const navigate = useNavigate()

  const toEmployeeList =()=>{
    navigate('/employeelist')
  }
  
  
  return (
    <div style={{ textAlign: 'center' }}>
    <Navbar />
      <Typography variant="h3" color="black" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>
        Welcome To Profcio
      </Typography>

      
    
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <img src={emp} alt="" style={{ width: '100%', height: 'auto' }} />
      <Typography variant="h3" color="black" style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>
        Professional services <br />
        Homes and commercial properties
      </Typography>
    </div>

    <u style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>_________________________________________________________________</u>

    <Typography variant='h2' color="black" style={{ textAlign: 'center' }}>
      Hire The Best Employees
      <br />
      <Button variant="outlined" color='black' onClick={toEmployeeList}>
        Click here
      </Button>
    </Typography>

    <br />

    <ServiceListPage />
    <FooterPage />
  </div>

  )
}

export default Home


