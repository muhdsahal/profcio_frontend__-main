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

  return (

    <div className="flex flex-row gap-4">
      {services.map((service) => (
        <Card key={service.id} className="w-96">
          <CardHeader floated={false} className="h-80">
            <img src={service.Service_image} alt="profile-picture" />
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

