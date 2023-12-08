import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

function ServiceList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Make API request to fetch service data
    axios.get('http://127.0.0.1:8000/auth/services/')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching service data:', error);
      });
  }, []);

  console.log(services,'serrrrvidddd');

  return (

    <div className="flex flex-row flex-wrap gap-4">
      {services.map((service) => (
        <Card key={service.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5">
          <CardHeader floated={false} className="h-80">
            <img src={service.service_image} alt="profile-picture" />
            {/* <p>{service.service_image.name} </p> */}
            <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {service.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {service.category}
            </Typography>
          </CardBody>
          </CardHeader>
        </Card>
      ))}
    </div>



  );
}
export default ServiceList;

