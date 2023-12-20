import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Input, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import toast,{ Toaster } from "react-hot-toast";
import { base_url } from "../../constants/constants";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setupdatedUser] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/user_profile/${userId}/`
        );
        setUser(response.data);
        setupdatedUser(response.data);
        console.log(response.data, "data apiiiiiiiiiiiiiiiiiiiiii");
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
    setupdatedUser(user);
    setImageFile(null); // Clear the imageFile state
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      // Append profile_photo if an imageFile is selected
      if (imageFile) {
        formData.append("profile_photo", imageFile, imageFile.name);
      }
      
      // Append other fields
      formData.append("username", updatedUser.username);
      formData.append("email", updatedUser.email);
      formData.append("phone_number", updatedUser.phone_number);
      formData.append("place", updatedUser.place);
  
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
  
      setUser(response.data);
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
    setupdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen flex justify-center pt-10 bg-gray-50" >
      {user && (
        <div className="w-screen min-h-screen flex justify-center px-2  bg-gray-50" >
          <div className="md:w-2/4 py-5 px-10 bg-white rounded-md border shadow  h-fit">

          
            <Typography variant="h3" color="blue" className="flex justify-center">
              user Profile
            </Typography>
            <div>
            
              <Card className="shadow-none">
                <div>
                  <div 
                  className="flex flex-col items-center" 
                  >
                    <img
                      src={
                        user.profile_photo
                          ? `${base_url}${user.profile_photo}`
                          : "https://bootdey.com/img/Content/avatar/avatar6.png"
                      }
                      alt="user"
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
                            value={updatedUser.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                          />
                          <Input
                          label="email"
                            type="text"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                          />
                          <Input
                            label="phone_number"
                            type="text"
                            name="phone_number"
                            value={updatedUser.phone_number}
                            onChange={handleInputChange}
                            // placeholder="Phone Number"
                          />
                          <Input
                            label="place"
                            type="text"
                            name="work"
                            value={updatedUser.place}
                            onChange={handleInputChange}
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
                                  value={user.username}
                                />
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h4" className="text-center text-blueGray-700">
                                <Input
                                  label="email"
                                  type="email"
                                  name="email"
                                  value={user.email}
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
                                  value={user.phone_number}
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
                                  value={user.place}
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
            <div className="w-full lg:w-4/12 xl:w-5/12 xxl:w-6/12 px-4">
              {/* ... Rest of the code remains unchanged */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
