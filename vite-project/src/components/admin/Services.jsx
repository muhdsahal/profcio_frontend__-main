

import React, { useState, useEffect } from 'react';
import { Button, Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, } from "@material-tailwind/react";
import axios from 'axios';
import Modal from 'react-modal';
import { ServiceListURL, ServiceCatergoryURL } from '../../constants/constants';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
// import 'react-select/dist/react-select.css';

Modal.setAppElement('#root');

const ServiceListPage = () => {

  const [open, setOpen] = React.useState(false);
  const [editOpen, seteditOpen] = React.useState(false);
  const handleOpenModal = () => setOpen((cur) => !cur);
  const editOpenModal = () => seteditOpen((cur) => !cur);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [serviceName, setserviceName] = useState('');
  const [serviceDiscription, setserviceDiscription] = useState('');
  const [serviceCategory, setserviceCategory] = useState('');
  const [serviceImage, setserviceImage] = useState(null);
  const [editServiceData, seteditServiceData] = useState([])
  const [editService_id, seteditService_id] = useState('')
  const [services, setServices] = useState([]);


  const handleFileInputChange = (e) => {

    console.log(e.target.files[0], 'jjjjjjjjjjjjjjjj');
    // setShowprofileImage(URL.createObjectURL(event.target.files[0]));
    const file = e.target.files[0];
    setserviceImage(file);
  };





  useEffect(() => {
    axios
      .get(ServiceListURL)
      .then((response) => {
        setServices(response.data)
      })
      .catch((error) => {
        console.error("Error Fetching Data:", error);
        // setLaoding(false)
      })

  }, [])







  useEffect(() => {
    // Fetch category options when the component mounts
    axios.get(ServiceCatergoryURL)
      .then(response => {
        setCategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching category options:', error);
      });
  }, []);



  const serviceCreate = () => {
   
    if (!serviceName.trim()) {
      toast.error("Service name cannot be empty");
      return;
  }

  // Validation: Check if serviceName is at least 3 characters long
  if (serviceName.trim().length < 3) {
      toast.error("Service name must be at least 3 characters long");
      return;
  }

  // Validation: Check if serviceName contains only letters and is not a number or minus number
  if (!/^[a-zA-Z]+$/.test(serviceName.trim()) || !isNaN(serviceName.trim())) {
      toast.error("Service name can only contain letters. Numbers and minus numbers are not allowed.");
      return;
  }

  // Validation: Check if serviceName is not a repeating name
  if (services.some(service => service.name === serviceName)) {
      toast.error("Service name already exists. Please choose a different name.");
      return;
  }

  // Validation: Check if serviceDiscription is empty
  if (!serviceDiscription.trim()) {
      toast.error("Service description cannot be empty");
      return;
  }

  

    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('description', serviceDiscription);
    formData.append('category', serviceCategory);
    formData.append('service_image', serviceImage);

    axios.post(ServiceListURL, formData)
      .then(response => setServices([...services, response.data]),
        setserviceName(''),
        setserviceDiscription(''),
        setserviceCategory(''),
        setserviceImage(null),
        console.log('daata successfull')),
      toast.success("service createed Successfully")
        .catch(error => {
          console.error('Error creating service:', error);
          // Handle error display or other actions as needed
        });
    handleOpenModal()
  }

  const editHandleService = (e) => {
    seteditService_id(e)
    axios.get(`${ServiceListURL}${e}/`)
      .then(response => {
        setserviceName(response.data.name);
        setserviceDiscription(response.data.description);
        setserviceCategory(response.data.category);
        setserviceImage(response.data.service_image);
        console.log(editServiceData, 'llllllllllll');
        return response.data;
      })
      .catch(error => {
        console.error('Error creating service:', error);
        // Handle error display or other actions as needed
      });

    editOpenModal()
  }


  const serviceEdit = () => {
    if (!serviceName.trim()) {
      toast.error("Service name cannot be empty");
      return;
  }

  if (serviceName.trim().length < 3) {
      toast.error("Service name must be at least 3 characters long");
      return;
  }

  if (!/^[a-zA-Z]+$/.test(serviceName.trim()) || !isNaN(serviceName.trim())) {
      toast.error("Service name can only contain letters. Numbers and minus numbers are not allowed.");
      return;
  }

  if (services.some(service => service.name === serviceName)) {
      toast.error("Service name already exists. Please choose a different name.");
      return;
  }

  if (!serviceDiscription.trim()) {
      toast.error("Service description cannot be empty");
      return;
  }
    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('description', serviceDiscription);
    formData.append('category', serviceCategory);
    // formData.append('service_image', serviceImage);

    axios.put(`${ServiceListURL}${editService_id}/`, formData)
      .then(response =>
        setserviceName(''),
        setserviceDiscription(''),
        setserviceCategory(''),
        setserviceImage(null),
        toast.success("Service Edited  successfully!"),
        console.log(' edit successfull'))
      .catch(error => {
        console.error('Error creating service:', error);
        // Handle error display or other actions as needed
      });
    editOpenModal()

  }
  
  const getSortedServices = () => {
    return services.slice().sort((a, b) => a.id - b.id);
};



  const classes = "p-4 border-b border-blue-gray-50";

  return (
    <div className="flex flex-col min-h-screen items-center ">

      <Card className="my-4 mx-4 overflow-x-auto">
        <div >
          <Button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleOpenModal}
          >
            Create Service
          </Button>
        </div>
      </Card>

      <Card className="h-full w-full overflow-scroll">
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Id
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Description
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Category
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-prompt-semibold"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>

          <tbody>
            {getSortedServices().map((service) => (
              <tr key={service.id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-prompt-semibold"
                  >
                    {service.id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-prompt-semibold"
                  >
                    {service.name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-prompt-semibold"
                  >
                    {service.description}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-prompt-semibold">
                    {categoryOptions.find(category => category.id === service.category)?.name || 'N/A'}
                  </Typography>
                </td>
                <td className={classes}>
                  <Button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={(e) => editHandleService(service.id)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </Card>


      {/* </Card> */}


      <>

        <Dialog
          size="xs"
          open={open}
          handler={handleOpenModal}
          className="bg-transparent"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                create Service
              </Typography>
              <label>
                Name:
                <Input
                  type="text"
                  name="name"
                  value={serviceName}
                  onChange={(e) => setserviceName(e.target.value)}

                />
              </label>
              <label>
                Description:
                <Input
                  type="text"
                  name="description"
                  value={serviceDiscription}
                  onChange={(e) => setserviceDiscription(e.target.value)}

                />
              </label>
              <label>
                Category:
                <select
                  name="category"
                  value={serviceCategory}
                  onChange={(e) => setserviceCategory(e.target.value)}
                >
                  <option value="" disabled>Select a service category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Image:
                <Input
                  type="file"
                  name="service_image"
                  // value={serviceImage}
                  onChange={handleFileInputChange} />
              </label>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={serviceCreate} fullWidth>
                Create Service
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </>

      <>

        <Dialog
          size="xs"
          open={editOpen}
          handler={editOpenModal}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Edit Service
              </Typography>
              <label>
                Name:
                <Input
                  type="text"
                  name="name"
                  value={serviceName}
                  onChange={(e) => setserviceName(e.target.value)}

                />
              </label>
              <label>
                Description:
                <Input
                  type="text"
                  name="description"
                  value={serviceDiscription}
                  onChange={(e) => setserviceDiscription(e.target.value)}

                />
              </label>
              <label>
                Category:
                <select
                  name="category"
                  value={serviceCategory}
                  onChange={(e) => setserviceCategory(e.target.value)}
                >
                  <option value="" disabled>Select a service category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Image:
                <Input
                  type="file"
                  name="service_image"
                  // value={editServiceData.service_image}
                  onChange={handleFileInputChange} />
              </label>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={serviceEdit} fullWidth>
                Edit Service
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </>
      <Toaster />
    </div>
  );
};

export default ServiceListPage;














