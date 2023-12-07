import React,{useState,useCallback, useEffect} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Typography,Card, Button } from "@material-tailwind/react";
function UserProfile(){
    const [user,setUser] =useState([])



    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/auth/user_profile/${decode.user_id}/`);
                setUser(response.data);
                console.log(response.data,'data apiiiiiiiiiiiiiiiiiiii'); // Assuming the response directly contains the User data
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
    
        fetchData();
    }, [decode.user_id]); // Ensure the dependency array is closed properly
    
          console.log(user,'lllllllllllllll');

          

  return(
    <div>
      {user && (
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <Card>
              
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                      {/* <input
                            type="file"
                            accept="image/*"
                            // onChange={handleFileChange}
                          /> */}
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <Button
                           color="primary"
                           variant="contained"
                           size="large"
                        //    onClick={handleImageUpload}
                         >
                           Upload Image
                        </Button>
                      </div>
                      
                      
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        {/* ... Skipped content for brevity ... */}
                      </div>
                    </div>
                  </div>

                  <div
                    key={user.username}
                    className="text-center mt-12"
                  >
                    <Typography
                      variant="h3"
                      className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
                    >
                      {user.username}
                    </Typography>

                    
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
                            Email: {user.email}
                          </Typography>
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </main>
      )}
    </div>
)
           
};
export default UserProfile;