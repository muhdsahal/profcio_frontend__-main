import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar&Footer/Navbar'
import FooterPage from '../Navbar&Footer/FooterPage'
import ServiceListPage from './ServiceListPage';
import coverPhoto from '../../assets/coverPhoto.avif'
import { Typography, Button } from "@material-tailwind/react";
import { useApiContext } from '../../context/context';
import { LinearProgress } from '@mui/material';


function Home() {

  const { userCredentials } = useApiContext()

  const customStyle = {
    fontFamily: 'monospace'
  }
  const navigate = useNavigate()

  const toEmployeeList = () => {
    navigate('/employeelist')
  }
  console.log(userCredentials, '================================________________________');

  return (
    <div style={{ textAlign: 'center' }}>
      <Navbar />
      <div className="p-6" style={{ backgroundColor: 'black' }}>
        <div className='text-center'>
          <h1 className="leading-[160px] text-[130px] md:text-[130px] font-bold animated-gradien text-transparent bg-clip-text bg-gradient-to-r from-light-green-400 via-emerald-400 to-blue-600">
            Elevate through
            <br /> service, inspire<br />
            change
            <br />
          </h1>
          <div className="flex justify-center">
            <h3
              className="w-[800px] mt-10 text-center font-bold animated-gradien text-transparent bg-clip-text bg-gradient-to-r from-light-green-400 via-emerald-400 to-blue-600">
              Professional services
              <br /> for your
              <br />Homes and commercial properties <br />
              Book Now Best  Employees <br />
        
              {/* <u style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>_________________________________________________________________</u> */}
              <Link to={"/employeelist"}>
                <Button className="btn-gradiant bg-gradient-to-r from-light-green-400 via-emerald-400 to-blue-600 mt-10">Click here</Button>
              </Link>
            </h3>
          </div>
        </div>
      </div>
      <ServiceListPage style={{backgroundColor:'black'}} />
      <FooterPage />

    </div>

  )
}

export default Home


