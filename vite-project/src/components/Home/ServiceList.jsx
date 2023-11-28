import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4">All Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <div key={service.id} className="border border-black p-4 rounded-md bg-white text-black text-center">
          <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
          {/* <p className="text-gray-700"><strong>Description:</strong> {service.description}</p> */}
          {/* <p className="text-gray-700"><strong>Category:</strong> {service.category}</p> */}
        </div>
      ))}
    </div>
  </div>
  
  );
}

export default ServiceList;
