// import { Card,Input,Button,Typography } from "@material-tailwind/react";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import toast,{ Toaster } from "react-hot-toast";
import { UserLoginURL } from "../../constants/constants"; 
import Loader from "../Loading/Loading";
import Signup from "../../pages/signup/Signup";
import EmployeeSignupPage from "../../pages/employee/EmployeeSignupPage";
import { userGoogleLogin } from "../../services/userApis";
import ForgotPassword from "../../pages/ForgotPassWord";
import logo from '../../image/profcio__All.png'


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
    localStorage.removeItem('token')
    const navigate = useNavigate();
    const [user,setUser] = useState({email:"",password:"",user_type:"user"});

    // const SignupButton = () => {
    //   localStorage.getItem('token')
    //     navigate("/signup")
    // }
      
    
    const handleForgotPassword = () =>{
      const dataTosend = { email:user?.email };
      navigate('/forgot_password',{state:{data:dataTosend}})
      console.log(state,"forgot_password....<><><><><><><><><><><><>");
    }
    // const handleForgotPassword = () =>{
    //     navigate('/forgot_password/');
    //     console.log("forgotpassword,<><><><><><><><");
    // };
    //for loading 
    const [loading,setLoading] = useState(false);
    const handleLoading = () =>setLoading((cur)=>!cur);


    //google Login handler
    const [guser,setgUser] = useState();

    const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setgUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
});
    

        useEffect(()=>{
            const handleGoogleAuth = async () =>{
                try{
                    if(guser){
                    handleLoading();
                    const res = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
                    {
                        headers : {
                            Authorization: `Bearer ${guser.access_token}`,
                            Accept : "application/json",
                        },
                    }
                    )
                    console.log(res.data,"goooogledataaa");
                    const value = res.data
                    const values ={
                      email : value.email,
                      username : value.email,
                      first_name : value.given_name,
                      last_name : value.family_name,
                      password : value.id,
                  }
                    const response = await axios.post('http://127.0.0.1:8000/auth/googleauth/',values)
                    console.log(response);
                    const token = JSON.stringify(response.data);

                    localStorage.setItem("token",token);

                    handleLoading();
                    toast.success("Signed with Google..!")
                    navigate("/");
                }
            }catch(err){
                handleLoading();
                console.log(err);
                if (err.response.data){
                    toast.error(err.response.data.email[0])
                }else{
                    toast.error("Google verification failed")
                }
            }
        };
        if (guser){
          handleGoogleAuth();
        } 
      },[guser]);


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
          const response = await axios.post(UserLoginURL, user);
          const token = JSON.stringify(response.data);
          const decoded = jwtDecode(token);

          if (decoded.user_type !== 'user') {
            toast.error(`${decoded.user_type} not valid in this Login`);
          } else {
            toast.success(`Welcome ${decoded.username}....!!`);
            localStorage.setItem("token", token);
            navigate("/");
          }

        } catch (error) {
          if (error.response && error.response.data.detail) {
            toast.error(error.response.data.detail);
          } else {
            toast.error("An Error occurred, please try again");
          }
        } finally {
          handleLoading();
        }
      }
    };

    const customGoogleLoginButton = (
      <button
        type="button"
        className="flex items-center bg-light px-4 py-2 rounded"
        onClick={()=>handleGoogleLogin()}
      >
        {/* <img
          src={userImage}
          alt="Google logo"
          className="google-logo img-fluid"
          width="22"
          height="22"
        /> */}
        <span className="button-text ms-2">Continue with Google</span>
      </button>
    );

    return (
      <div className="flex items-center justify-center h-screen" >
        {loading && <Loader />}
        <Card className="w-96"  >
          <div className="flex justify-center items-center screen" >
            <img  src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
          </div>
          <CardBody className="flex flex-col gap-4">
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
              // label="Password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
            />
          </CardBody>
          <CardFooter className="pt-0">
          <Button
            variant="White"
            fullWidth
            onClick={(e) => handleLogin()}
            className="bg-rose-500 text-gray-700"
          >
            Sign In
          </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Link to='/signup'>Signup</Link>
              <div className="text-center" style={{ margin: '2.5rem' }}>
                {customGoogleLoginButton}
              </div>
            </Typography>
          </CardFooter>
        </Card>
        <Toaster />
      </div>
    );
    }    
