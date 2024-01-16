// import { Card,Input,Button,Typography } from "@material-tailwind/react";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import toast,{ Toaster } from "react-hot-toast";
import { GoogleLoginURL, Gooogle_Access_Token, UserLoginURL } from "../../constants/constants"; 
import Loader from "../Loading/Loading";
import Signup from "../../pages/signup/Signup";
import EmployeeSignupPage from "../../pages/employee/EmployeeSignupPage";
import { userGoogleLogin } from "../../services/userApis";
import ForgotPassword from "../../pages/ForgotPassWord";
import logo from '../../image/profcio__All.png'
import login_img from  '../../image/login_illu.png'


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { useGoogleLogin } from "@react-oauth/google";

export function LoginForm(){
    // localStorage.removeItem('token')
    const navigate = useNavigate();
    const [user,setUser] = useState({email:"",password:"",user_type:"user"});

 
    //for loading 
    const [loading,setLoading] = useState(false);
    const handleLoading = () =>setLoading((cur)=>!cur);


    //google Login handler
    const [guser, setgUser] = useState();
    let googleData = ''
    const LoginWithGoogleAuth = useGoogleLogin({
        onSuccess: (codeResponse) => {
            googleData = codeResponse
            console.log(googleData.access_token, 'googleDataTOken');
            GoogleAuth();
        },
        onError: (error) => {
            toast.error(error);
            console.log("Login Failed:", error);
        }
    });
    const GoogleAuth = async () => {
      try {
          if (!googleData) return;
          const tokenData = await axios.get(
              `${Gooogle_Access_Token}access_token=${googleData.access_token}`,
              {
                  headers: {
                      Authorization: `Bearer ${googleData.access_token}`,
                      Accept: "application/json",
                  },
              }
          );
          const backend_access = googleData.access_token
          console.log(backend_access, '<<<<<<<<<<<<<<<< google acccses token>>>>>>>>>>>>>>');
          googleData = tokenData.data;
          const googleUser = {
              email: googleData.email,
              access_token: backend_access
          }
          try {
              const googleResponse = await axios.post(GoogleLoginURL, googleUser);
              const response = googleResponse.data
              if (response.status === 406) {
                  setTimeout(() => {
                      toast.error(response.message)
                  }, 500);
                  navigate('/login')
              }
              if (response.status === 403) {
                  setTimeout(() => {
                      toast.error(response.message)
                  }, 500);
                  navigate('/login')
              }
              if (response.status === 202) {
                  setTimeout(() => {
                      toast.error(response.message)
                  }, 500);
                  navigate('/login')
              }
              // if already signup with form work this 

              if (response.status === 201) {
                  setTimeout(() => {
                      toast.success(response.message)
                  }, 500);
                  const data = (response.token)
                  localStorage.setItem('token', JSON.stringify(data));

                  console.log(data, '<<<<<accses>>>>>jwttoken');
                  try {
                      const token = jwtDecode(data.access)
                      console.log(token, '>>>>>>>>>>>>>>decoded');
                      const setUser = {
                          "id": token.user_id,
                          "email": token.email,
                          "is_superuser": token.is_superuser,
                          "user_type": token.user_type,
                          "is_google": token.is_google,
                          "is_active": token.is_active,
                      }
                      setgUser(setUser);
                       if (token.is_active) {
                          // toast.success('Login successfully!')
                          navigate('/');
                      }
                      else {
                          toast.error('Invalid Credentials!')
                          navigate('/login');
                      }

                  } catch (error) {
                      console.error('Error decoding JWT:', error);
                  }

              }
          } catch (error) {
              console.error('Error during signup:', error);
              toast.error(error.message);
          }
      } catch (error) {
          console.log(error.response);
          toast.error(error.message);
      }
  };

    
    

    //email validation
    const validEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };
    
    //form valiadation
    const validForm = () =>{
        if(user.email.trim()==""){
            toast.error("Email should not be blank..")
            return false
        }else if(!validEmail(user.email.trim())){
            toast.error("enter valid email id")
            return false
        }else if(user.password.trim()==""){
            toast.error("password should be filled");
            return false
        }
        return true;
    };

      const handleLogin = async (e) => {
      if (validForm()) {
        handleLoading();

        try {
          const  {data:response} = await axios.post(
            UserLoginURL,
            user,
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            }
          );
          localStorage.clear()
          localStorage.setItem('access_token',response.access)
          localStorage.setItem('refresh_token',response.refresh)
          axios.defaults.headers.common['Authorization'] = 
                                         `Bearer ${response['access']}`
          const token = JSON.stringify(response.access);
          const decoded = jwtDecode(token);
          console.log({response}, 'data response,.............................');
          if (decoded.user_type !== 'user') {
            toast.error(`${decoded.user_type} not valid in this Login`);
          } else {
            toast.success(`Welcome ${decoded.username}....!!`);
            localStorage.setItem('token', token);
            navigate('/');
          }
        } catch (error) {
          console.log(error);
          if (error.response && error.response.data.detail) {
            toast.error(error.response.data.detail);
          } else {
            toast.error('An Error occurred, please try again');
          }
        } finally {
          handleLoading();
        }
        
      }
    };

    

    return (
      <div className="flex items-center justify-center h-screen">
      {loading && <Loader />}
      <div className="flex flex-col md:flex-row md:max-w-screen-xl">
        {/* Left side (image) */}
        <div className="order-2 md:order-1 md:w-1/2">
          <img src={login_img} alt="Login" className="w-full h-auto" />
        </div>

        <br />
        <br />
        <br />
        <br />
        <div className="order-1 md:order-2 md:w-1/2">
          <Card className="w-full md:max-w-md mx-auto">
            <div className="flex justify-center items-center mt-4">
              <img src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
            </div>
            <CardBody className="flex flex-col gap-4 mt-4">
              <Typography style={{ fontWeight: '500' }}>User Login</Typography>
              <Input
                size="lg"
                placeholder="Enter Your Email"
                value={user.email}
                name="email"
                type="email"
                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
              />
              <Input
                placeholder="Enter your Password"
                type="password"
                size="lg"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="White"
                fullWidth
                onClick={handleLogin}
                style={{backgroundColor: 'lightseagreen'}}
              >
                Sign In
              </Button>
              <br />
              <Button
                variant="White"
                fullWidth
                onClick={()=>LoginWithGoogleAuth()}
                style={{backgroundColor: 'blue'}}
              >
                Sign In with Google
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account? <Link to="/signup">Signup</Link>
              
                <Link to="/password_reset/" className="text-sm sm:mt-0 mt-4 text-black font-bold flex justify-center">
                  Forgot password
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
    );
    }    
