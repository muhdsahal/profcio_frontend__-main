// ServiceListCreatePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceListCreatePage = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'home',
    service_image: null,
  });

  useEffect(() => {
    // Fetch services on component mount
    axios.get('/api/services/')
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      service_image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    formDataObj.append('category', formData.category);
    formDataObj.append('service_image', formData.service_image);

    // Post new service to the backend
    axios.post('/api/services/', formDataObj)
      .then(response => {
        setServices([...services, response.data]);
        setFormData({
          name: '',
          description: '',
          category: 'home',
          service_image: null,
        });
      })
      .catch(error => console.error('Error creating service:', error));
  };

  return (
    <div>
      <h2>Service List</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.name} - {service.description} - {service.category}
            <img src={service.service_image} alt={service.name} style={{ maxWidth: '100px' }} />
          </li>
        ))}
      </ul>

      <h2>Create Service</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="all_rounder">All Rounder</option>
            <option value="commercial">Commercial</option>
            <option value="home">Home</option>
          </select>
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="service_image" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default ServiceListCreatePage;
