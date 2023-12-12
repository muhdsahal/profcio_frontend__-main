import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchError, setSearchError] = useState(false);
  const cardsPerPage = 6;

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/auth/services/')
      .then(response => {
        setServices(response.data);
        const uniqueCategories = [...new Set(response.data.map(service => service.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error('Error fetching service data:', error);
      });
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchError(true);
      return;
    }

    setSearchError(false);
    setCurrentPage(0);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(0);
  };

  const filteredServices = services.filter(service => (
    (selectedCategory === '' || service.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  const indexOfLastCard = (currentPage + 1) * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstCard, indexOfLastCard);

  const pageCount = Math.ceil(filteredServices.length / cardsPerPage);

  const handlePageChange = (_, page) => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <select value={selectedCategory} onChange={handleCategoryChange} className="p-2 rounded border mr-2">
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Input
            type="text"
            placeholder="Search services"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {searchError && (
        <p className="text-red-500 text-sm">Please enter a valid search term.</p>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {filteredServices.length === 0 ? (
          <p className="text-red-500 text-lg">
            {selectedCategory ? `No services found for category '${selectedCategory}'` : 'No services found'}
          </p>
        ) : (
          currentServices.map((service) => (
            <Card key={service.id} className="w-1/4 md:w-1/4 sm:w-1/2 lg:w-1/4 xl:w-1/4 mb-4">
              <CardHeader floated={false} className="h-80">
                <img
                  src={service.service_image}
                  alt="profile-picture"
                  className="object-cover w-full h-64"
                />
                <CardBody className="text-center">
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    {service.name}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    {service.category}
                  </Typography>
                </CardBody>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
        <Pagination
          count={pageCount}
          page={currentPage + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
}

export default ServiceList;
