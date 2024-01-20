import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Card, Button, Input } from "@material-tailwind/react";
import Grid from "@material-ui/core/Grid";
import {ToastContainer,toast} from 'react-toastify';

import { base_url } from "../../constants/constants";
import AvailableDates from "../Home/AvailableDates";

function EmployeeProfile() {
  const { userId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({});
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/auth/user_profile/${userId}/`
        );
        setEmployee(response.data);
        setUpdatedEmployee(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
  
    fetchData();
  }, [userId]);


  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setUpdatedEmployee(employee);
    setImageFile(null); 
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      // Append profile_photo if an imageFile is selected
      if (imageFile) {
        formData.append("profile_photo", imageFile, imageFile.name);
      }
      
      // Append other fields
      formData.append("username", updatedEmployee.username);
      formData.append("email", updatedEmployee.email);
      formData.append("phone_number", updatedEmployee.phone_number);
      formData.append("work", updatedEmployee.work);
      formData.append("experience", updatedEmployee.experience);
      formData.append("charge", updatedEmployee.charge);
  
      const authToken = localStorage.getItem("token");
      const tok = JSON.parse(authToken);
  
      const response = await axios.put(
        `http://127.0.0.1:8000/auth/user_profile/${userId}/`,  // Use PATCH instead of PUT
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${tok.access}`,
          },
        }
      );
  
      setEmployee(response.data);
      setEditing(false);
      setImageFile(null);
  
      console.log(response.data, "Profile updated successfully");
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className=" flex justify-center pt-10 bg-gray-50" >
      {employee && (
        <div className=" min-h-screen flex justify-center px-2  bg-gray-50" >
          <div className=" py-5 px-10 bg-white rounded-md border shadow  h-fit">

          
            <Typography variant="h3" color="blue" className="flex justify-center">
              Employee Profile
            </Typography>
            <div>
            
              <Card className="shadow-none">
                <div>
                  <div 
                  className="flex flex-col items-center" 
                  >
                    <img
                      src={
                        employee.profile_photo
                          ? `${base_url}${employee.profile_photo}`
                          : "https://bootdey.com/img/Content/avatar/avatar6.png"
                      }
                      alt="Employee"
                      className="rounded-sm"
                      width="200"
                    />
                    <div className="mt-3">
                      {editing ? (
                        // Edit mode
                        <div className="space-y-4">
                          <Input
                            label="upload image"
                            type="file"
                            name="image"
                            onChange={(e) =>
                              setImageFile(e.target.files[0])
                            }
                            placeholder="Profile Image"
                          />
                          <Input
                          label="username"
                            type="text"
                            name="username"
                            value={updatedEmployee.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                          />
                          <Input
                          label="email"
                            type="text"
                            name="email"
                            value={updatedEmployee.email}
                            // onChange={handleInputChange}
                            placeholder="Email"
                          />
                          <Input
                            label="phone_number"
                            type="text"
                            name="phone_number"
                            value={updatedEmployee.phone_number}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                          />
                          <Input
                            label="work"
                            type="text"
                            name="work"
                            value={updatedEmployee.work}
                            // onChange={handleInputChange}
                            placeholder="Work"
                          />
                          <Input
                            label="experience"
                            type="text"
                            name="experience"
                            value={updatedEmployee.experience}
                            onChange={handleInputChange}
                            placeholder="Experience"
                          />
                          <Input
                            label="charge"
                            type="text"
                            name="charge"
                            value={updatedEmployee.charge}
                            onChange={handleInputChange}
                            placeholder="Charge"
                          />

                          <div className="flex justify-between">
                            <Button
                              color="red"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </Button>
                            <Button
                              color="green"
                              onClick={handleUpdateProfile}
                            >
                              Update Profile
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Viewing mode
                        <div className="space-y-4">
                          <div>
                          <Grid container spacing={2} justify="center">
                            <Grid item xs={12}>
                              <Typography variant="h4" className="flex text text-blueGray-700">
                                <Input
                                  label="username"
                                  type="username"
                                  name="username"
                                  value={employee.username}
                                />
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h4" className="text-center text-blueGray-700">
                                <Input
                                  label="email"
                                  type="email"
                                  name="email"
                                  value={employee.email}
                                />
                              </Typography>
                            </Grid>
                          </Grid>


                            <Grid container spacing={2} justify="center">
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                   <Input
                                  label="phone_number"
                                  type="phone_number"
                                  name="phone_number"
                                  value={employee.phone_number}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                   <Input
                                  label="work"
                                  type="work"
                                  name="work"
                                  value={employee.work}
                                  />
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container spacing={2} justify="center">
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                   <Input
                                  label="experience"
                                  type="experience"
                                  name="experience"
                                  value={employee.experience}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                   <Input
                                  label="charge"
                                  type="charge"
                                  name="charge"
                                  value={employee.charge}
                                  />
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                          <Button className="bg-[#4b9cec] text-white"
                            color="primary"
                            variant="outlined"
                            size="regular"
                            onClick={handleEditClick}
                          >
                            Edit Profile
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <AvailableDates  empId={employee.id} role={employee.user_type}/>
                        {/* <p>{employee.user_type}</p> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfile;
