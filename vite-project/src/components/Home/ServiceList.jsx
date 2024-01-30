import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel,Button,h2} from "@material-tailwind/react";
import { ServiceCatergoryURL ,ServiceListURL } from '../../constants/constants';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);


  useEffect(() => {
    axios.get(ServiceCatergoryURL)
      .then(response => {
        setCategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching category options:', error);
      });
  }, []);
  

  useEffect(() => {
    axios.get(ServiceListURL)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching service data:', error);
      });
  }, []);

  return (
    <div style={{backgroundColor:'black'}}>
  <h1>Services</h1>
  <Carousel
    transition={{ duration: 2 }}
    className="rounded-xl"
    renderarrowprev={(onClickHandler, hasPrev, label) =>
      hasPrev && (
        <button
          type="button"
          onClick={onClickHandler}
          title={label}
          style={{ color: 'red' }}
        >
          &lt;
        </button>
      )
    }
    renderarrownext={(onClickHandler, hasNext, label) =>
      hasNext && (
        <button
          type="button"
          onClick={onClickHandler}
          title={label}
          style={{ color: 'red' }}
        >
          &gt;
        </button>
      )
    }
  >
    {services.map((service, index) => (
      <div key={index} className="relative">
        <img
          src={
            service.service_image
              ? service.service_image
              : 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80'
          }
          alt={`image ${index + 1}`}
          className="h-96 min-w-full object-cover rounded-xl border-2 border-r-emerald-600-500" // Adjust height and width as needed
        />
        <div className="absolute top-0 left-0 w-full text-center text-blue-gray-800 p-4">
          <h2 
            className="text-5xl  font-bold animated-gradien text-transparent bg-clip-text bg-gradient-to-l from-light-green-400 via-emerald-400 to-blue-600">

            {service.name}</h2>
          <h2 
            className="text-5xl  font-bold animated-gradien text-transparent bg-clip-text bg-gradient-to-l from-light-green-400 via-emerald-400 to-blue-600">
            {categoryOptions.find(category => category.id === service.category)?.name || 'N/A'}
          </h2>
          <p
          className="text-3xl   animated-gradien text-transparent bg-clip-text bg-gradient-to-l from-light-green-400 via-emerald-400 to-blue-600">
          {service.description}</p>
        </div>
      </div>
    ))}
  </Carousel>
</div>


  );
};

export default ServiceList;


