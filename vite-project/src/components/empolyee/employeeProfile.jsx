import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Card, Button, Input } from "@material-tailwind/react";
import Grid from "@material-ui/core/Grid";

import toast from "react-hot-toast";

function EmployeeProfile() {
  const { userId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/user_profile/${userId}/`
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
    setImageFile(null); // Clear the imageFile state
    setPassword("");
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
      formData.append("password", password);
  
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
      setPassword("");
  
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

  console.log(imageFile, "imageFile");

  return (
    <div>
      {employee && (
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-8/12 xl:w-7/12 xxl:w-6/12 px-4">
              <Card>
                <div className="card-body">
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        employee.image
                          ? employee.image
                          : "https://bootdey.com/img/Content/avatar/avatar6.png"
                      }
                      alt="Employee"
                      className="rounded-circle p-1 bg-primary"
                      width="110"
                    />
                    <div className="mt-3">
                      {editing ? (
                        // Edit mode
                        <div className="space-y-4">
                          <Input
                            type="file"
                            name="image"
                            onChange={(e) =>
                              setImageFile(e.target.files[0])
                            }
                            placeholder="Profile Image"
                          />
                          <Input
                            type="text"
                            name="username"
                            value={updatedEmployee.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                          />
                          <Input
                            type="text"
                            name="email"
                            value={updatedEmployee.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                          />
                          <Input
                            type="text"
                            name="phone_number"
                            value={updatedEmployee.phone_number}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                          />
                          <Input
                            type="text"
                            name="work"
                            value={updatedEmployee.work}
                            onChange={handleInputChange}
                            placeholder="Work"
                          />
                          <Input
                            type="text"
                            name="experience"
                            value={updatedEmployee.experience}
                            onChange={handleInputChange}
                            placeholder="Experience"
                          />
                          <Input
                            type="text"
                            name="charge"
                            value={updatedEmployee.charge}
                            onChange={handleInputChange}
                            placeholder="Charge"
                          />
                          <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
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
                              <Grid item xs={6}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  Username: {employee.username}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  Email: {employee.email}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container spacing={2} justify="center">
                              <Grid item xs={6}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  Phone Number:{" "}
                                  {employee.phone_number}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  Work: {employee.work}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container spacing={2} justify="center">
                              <Grid item xs={6}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  Experience:{" "}
                                  {employee.experience}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="h4"
                                  className="text-center text-blueGray-700"
                                >
                                  Charge: {employee.charge}
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                          <Button
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
            <div className="w-full lg:w-4/12 xl:w-5/12 xxl:w-6/12 px-4">
              {/* ... Rest of the code remains unchanged */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfile;
