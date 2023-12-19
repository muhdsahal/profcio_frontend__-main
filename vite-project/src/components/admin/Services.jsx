

import React, { useState, useEffect } from 'react';
import { Button, Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, } from "@material-tailwind/react";
import axios from 'axios';
import Modal from 'react-modal';
import {  ServiceListURL ,ServiceCatergoryURL } from '../../constants/constants';
import Select from 'react-select';
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

  const handleFileInputChange = (e) => {

    console.log(e.target.files[0], 'jjjjjjjjjjjjjjjj');
    // setShowprofileImage(URL.createObjectURL(event.target.files[0]));
    const file = e.target.files[0];
    setserviceImage(file);
  };




  const [services, setServices] = useState([]);

      useEffect(() => {
        

        axios
            .get(ServiceListURL)
            .then((response) => {
                const responseData = response.data;
                console.log(responseData,'dataaaaaaaaa');

                
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
  console.log(categoryOptions,'optionsssssssssss');


  const serviceCreate = () => {
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
        console.log('shafi successfull'))
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


  const serviceEdit =()=>{
    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('description', serviceDiscription);
    formData.append('category', serviceCategory);
    // formData.append('service_image', serviceImage);

    axios.patch(`${ServiceListURL}${editService_id}/`, formData)
      .then(response => service_list(),
        setserviceName(''),
        setserviceDiscription(''),
        setserviceCategory(''),
        setserviceImage(null),
        console.log(' edit successfull'))
      .catch(error => {
        console.error('Error creating service:', error);
        // Handle error display or other actions as needed
      });
      editOpenModal()

  }


  // console.log(serviceCategory, 'formdataaaaaaaaaaaaaaaaaaaaa');

  const classes = "p-4 border-b border-blue-gray-50";

  return (
    <div className="flex flex-col min-h-screen">
      <Card className="flex-1 w-full xl:w-[1005px]">
        {/* <input
          // onChange={(e) => SearchService(e.target.value)}
          className='w-96 rounded-lg h-11 ml-16 border-2 border-gray-300  font-roboto-mono text-black'
          type="text"
          placeholder='  Search'
        /> */}

        <div className="my-4 ml-16">
          <Button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleOpenModal}
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
                  <Typography variant="small" color="blue-gray" className="font-normal">
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


      <>

        <Dialog
          size="xs"
          open={open}
          handler={handleOpenModal}
          className="bg-transparent shadow-none"
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
    </div>
  );
};

export default ServiceListPage;














