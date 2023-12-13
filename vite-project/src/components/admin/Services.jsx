import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import Modal from 'react-modal';
import { ServiceListURL } from '../../constants/constants';
import { ServiceDialog } from './ServiceDialog';
Modal.setAppElement('#root');

const ServiceListPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    service_image: null,
  });

  useEffect(() => {
    axios.get(ServiceListURL)
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleEditService = (service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category,
      service_image: null,
    });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedService(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      service_image: null,
    });
    setModalOpen(false);
  };

  const handleSaveService = () => {
    if (selectedService) {
      axios.put(`${ServiceListURL}/${selectedService.id}/`, formData)
        .then(response => {
          const updatedServices = services.map(service =>
            service.id === selectedService.id ? response.data : service
          );
          setServices(updatedServices);
        })
        .catch(error => {
          console.error('Error updating service:', error);
          // Handle error display or other actions as needed
        });
    } else {
      axios.post(ServiceListURL, formData)
        .then(response => setServices([...services, response.data]))
        .catch(error => {
          console.error('Error creating service:', error);
          // Handle error display or other actions as needed
        });
    }
    handleModalClose();
  };
  console.log(formData,'formdataaaaaaaaaaaaaaaaaaaaa');

  const classes = "p-4 border-b border-blue-gray-50";

  return (
    <div className="flex flex-col min-h-screen">
      <Card className="flex-1 w-full xl:w-[1005px]">
        <input
          onChange={(e) => SearchService(e.target.value)}
          className='w-96 rounded-lg h-11 ml-16 border-2 border-gray-300  font-roboto-mono text-black'
          type="text"
          placeholder='  Search'
        />

        <div className="my-4 ml-16">
          <Button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setSelectedService(null);
              setModalOpen(true);
            }}
          >
            Create Service
          </Button>
        </div>

        <table className="text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Id
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Description
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Category
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {service.id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {service.name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {service.description}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {service.category}
                  </Typography>
                </td>
                <td className={classes}>
                  <Button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEditService(service)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel="Edit/Create Service Modal"
        >
          <ServiceDialog
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSave={handleSaveService}
            title={selectedService ? 'Edit Service' : 'Create Service'}
            initialFormData={{
              name: formData.name,
              description: formData.description,
              category: formData.category,
              service_image: null,
            }}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default ServiceListPage;
