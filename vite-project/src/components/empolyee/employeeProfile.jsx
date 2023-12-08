import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Button,
  Input,
} from "@material-tailwind/react";

function EmployeeProfile() {
  const { userId } = useParams();
  console.log(userId, 'ascvgsacvgsac');
  const [employee, setEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // if (!userId) {
  //   navigate("/");
  //   return null; 
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/user_profile/${userId}/`
        );
        console.log(response.data,'dataaaaaaaaaaaaaaaaaaaaaaaaa');
        setEmployee(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      // Exclude password field if not being changed
      const { password, ...requestData } = employee;
  
      // Make a PUT request to update the employee profile on the server
      await axios.put(
        `http://127.0.0.1:8000/auth/user_profile/${userId }/`,
        requestData
      );
  
      // Switch back to viewing mode after saving changes
      setEditMode(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCancel = () => {
    // Cancel editing and switch back to viewing mode
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  console.log(employee,'lllllllllllllllllllllllllllllllllllllllllllllllllllllll');

  return (
    <div>
      {employee && (
        <main className="profile-page">
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <Card>
                <div className="px-6">
                  <div key={employee.username} className="text-center mt-12">
                    <Typography
                      variant="h3"
                      className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
                    >
                      {employee.username}
                    </Typography>
                    {editMode ? (
                      // Edit mode
                      <div className="flex justify-center mb-4">
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                          onClick={handleSave}
                          className="mr-2"
                        >
                          Save Changes
                        </Button>
                        <Button
                          color="blueGray"
                          variant="outlined"
                          size="large"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      // Viewing mode
                      <Button
                        color="primary"
                        variant="outlined"
                        size="regular"
                        onClick={handleEditClick}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  {editMode ? (
                    // Render edit form
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <Input
                          type="text"
                          name="username"
                          label="Username"
                          value={employee.username}
                          onChange={handleInputChange}
                        />

                        <br />
                        <Input
                          type="text"
                          name="work"
                          label="work"
                          value={employee.work}
                          onChange={handleInputChange}
                        />
                        <br />
                        <Input
                          type="text"
                          name="phone_number"
                          label="phone_number"
                          value={employee.phone_number}
                          // onChange={handleInputChange}
                        />
                        <br />
                        <Input
                          type="text"
                          name="email"
                          label="email"
                          value={employee.email}
                          // onChange={handleInputChange}
                        />
                        <br />
                        <Input
                          type="text"
                          name="place"
                          label="place"
                          value={employee.place}
                          onChange={handleInputChange}
                        />
                        <br />
                        <Input
                          type="text"
                          name="experience"
                          label="experience"
                          value={employee.experience }
                          onChange={handleInputChange}
                        />
                        <br />
                        <Input
                          type="text"
                          name="charge"
                          label="charge"
                          value={employee.charge}
                          onChange={handleInputChange}
                        />
                      <br />

                      <Input
                          type="text"
                          name="description"
                          label="description"
                          value={employee.description}
                          onChange={handleInputChange}
                        />
                        <br />
                      </div>

                      

                    </div>
                  ) : (
                    // Render profile details
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <Typography
                            variant="body1"
                            className="mb-4 text-lg leading-relaxed text-blueGray-700"
                          >
                            <Typography
                              variant="h5"
                              color="black"
                              gutterBottom
                            >
                              Phone Number : {employee.phone_number}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="black"
                              gutterBottom
                            >
                              Email: {employee.email}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="black"
                              gutterBottom
                            >
                              Work: {employee.work}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="black"
                              gutterBottom
                            >
                              Place : {employee.place}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="black"
                              gutterBottom
                            >
                              Experience : {employee.experience} , Charge Per
                              hour {employee.charge}
                            </Typography>
                            <Typography variant="h7" color="black">
                              {employee.description}
                            </Typography>
                          </Typography>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default EmployeeProfile;
