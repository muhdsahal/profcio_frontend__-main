import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Input, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/user_profile/${userId}/`
        );
        setUser(response.data);
        setUpdatedUser(response.data);
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
    setUpdatedUser(user);
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/auth/user_profile/${userId}/`,
        updatedUser
      );

      setUser(response.data);
      setEditing(false);

      console.log(response.data, "Profile updated successfully");
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      {user && (
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-8/12 xl:w-7/12 xxl:w-6/12 px-4">
              <Card>
                <div className="card-body">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      alt="Admin"
                      className="rounded-circle p-1 bg-primary"
                      width="110"
                    />
                    <div className="mt-3">
                      <Typography
                        variant="h4"
                        className="text-center text-blueGray-700"
                      >
                        {user.username}
                      </Typography>
                      <p className="text-secondary mb-1">Full Stack Developer</p>
                      <p className="text-muted font-size-sm">
                        Bay Area, San Francisco, CA
                      </p>
                      {editing ? (
                        <div className="space-y-4">
                          <Input
                            type="text"
                            name="username"
                            value={updatedUser.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                          />
                          <Input
                            type="text"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                          />
                          <Input
                            type="password"
                            name="password"
                            value={updatedUser.password}
                            onChange={handleInputChange}
                            placeholder="New Password"
                          />
                          {/* Add additional input fields as needed */}
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
                        <div>
                          <Button
                            color="primary"
                            onClick={handleEditClick}
                            className="mt-4"
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
