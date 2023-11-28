
import { useState,useRef } from "react";
import toast,{ Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'

import {Card,
    Input,
    Checkbox,
    Button,
    Typography } from "@material-tailwind/react";

import {userRegisterURL} from '../../constants/constants'
import Loader from '../Loading/Loading'
import logo from '../../image/profcio__All.png'

export function SimpleRegistrationForm() {
  const navigate = useNavigate();

  const [other, setOther] = useState({ conf_Password: "", check: false });

  // form
  const [formData, setFormData] = useState({
    // first_name:"",
    // last_name:"",
    username: "",
    email: "",
    password: "",
    user_type: "user",
  });

  // for loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  // email validation Handler
  const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

 

  // form data validation error
  const validForm = (e) => {
    if (formData.username.trim() === "") {
      toast.error("Username should not be empty");
      return false;
    } else if (formData.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!validEmail(formData.email.trim())) {
      toast.error("Enter a valid email");
      // Display an alert message for an invalid email
      alert("Invalid email");
      return false;
    } else if (formData.password.trim() === "") {
      toast.error("Password should not be empty");
      return false;
    } else if (other.conf_Password.trim() === "") {
      toast.error("Please confirm password");
      return false;
    } else if (formData.password !== other.conf_Password) {
      toast.error("Password mismatch!");
      return false;
    }
    return true;
  };

  // form submit handler
  const handleSubmit = async (e) => {
    console.log(formData);
    if (validForm()) {
      handleLoading();
      try {
        const response = await axios.post(userRegisterURL, formData);

        const user_type = response.data.user_type;
        toast.success("Registration success..!");

        setFormData({
          // first_name:"",
          // last_name:"",
          username: "",
          email: "",
          password: "",
          user_type: "user",
        });
        setOther({ conf_Password: "", check: false });
        handleLoading();
        console.log(formData, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        navigate("/confirm");
      } catch (error) {
        handleLoading();
        if (error.response.data) {
          console.log(error.response.data.email);
          if (error.response.data.email) {
            toast.error(error.response.data.email[0]);
          }
          if (error.response.data.username) {
            toast.error(error.response.data.username[0]);
          }
        } else {
          toast.error("An error occurred during registration..");
        }
      }
    }
  };
  return(
      
        
        <div className="flex items-center justify-center h-screen text-black">
          
    
          {loading && <Loader />}
    
          <Card className="text-center bg-transparent shadow-none">
          
            <Typography variant="h4" color="white">
              Sign Up
            </Typography>
    
            <Typography color="white" className="mt-1 font-normal">
              Welcome To Profcio ! Enter your details to register.
              <div className="flex justify-center items-center screen" >
              <img  src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
            </div>
            </Typography>
            
    
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  size="lg"
                  placeholder="Enter your username"
                  value={formData.username}
                  name="username"
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
    
                <Input
                  size="lg"
                  placeholder="Enter your email"
                  value={formData.email}
                  name="email"
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
    
                <Input
                  size="lg"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  name="password"
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
    
                <Input
                  size="lg"
                  placeholder="Enter your confirm password"
                  type="password"
                  value={other.conf_Password}
                  name="conf_Password"
                  onChange={(e) => setOther({ ...other, [e.target.name]: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
              </div>
                  <br />
              <Button variant="White" fullWidth className="bg-rose-500 text-gray-700" onClick={handleSubmit}>
                Signup
              </Button>
    
              <Typography color="black" className="mt-4 text-center font-normal">
                Already have an account?{' '}
                <Link color="black" to="/login">Login</Link>
              </Typography>
            </form>
          </Card>
    
          <Toaster />
        </div>
      );

}







































// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios'
// import { Card, Input, Button, Typography } from "@material-tailwind/react";
// import { userRegisterURL } from '../../constants/constants'
// import Loader from '../Loading/Loading'
// import logo from '../../image/profcio__All.png'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// export function SimpleRegistrationForm() {
//   const navigate = useNavigate();

//   // form validation schema
//   const validationSchema = Yup.object({
//     username: Yup.string().required("Username should not be empty"),
//     email: Yup.string().email("Invalid email address").required("Email should not be empty"),
//     password: Yup.string().required("Password should not be empty"),
//     conf_Password: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Please confirm password'),
//   });

//   // Formik hook
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       conf_Password: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       handleLoading();
//       try {
//         const response = await axios.post(userRegisterURL, values);
//         const user_type = response.data.user_type;
//         toast.success("Registration success..!");
//         formik.resetForm(); // Reset form after successful submission
//         handleLoading();
//         navigate("/confirm");
//       } catch (error) {
//         handleLoading();
//         if (error.response && error.response.data) {
//           if (error.response.data.email) {
//             toast.error(error.response.data.email[0]);
//           }
//           if (error.response.data.username) {
//             toast.error(error.response.data.username[0]);
//           }
//         } else {
//           toast.error("An error occurred during registration..");
//         }
//       }
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const handleLoading = () => setLoading((cur) => !cur);

//   const toLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-black text-white">
//       {loading && <Loader />}

//       <Card className="text-center bg-transparent shadow-none">
//         <Typography variant="h4" color="white">
//           Sign Up
//         </Typography>

//         <Typography color="white" className="mt-1 font-normal">
//           Welcome To Profcio ! Enter your details to register.
//           <div className="flex justify-center items-center screen" >
//             <img src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
//           </div>
//         </Typography>

//         <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
//           <div className="mb-1 flex flex-col gap-6">
//             <Input
//               size="lg"
//               placeholder="Enter your username"
//               value={formik.values.username}
//               name="username"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: 'before:content-none after:content-none',
//               }}
//             />
//             {formik.touched.username && formik.errors.username && <div>{formik.errors.username}</div>}

//             <Input
//               size="lg"
//               placeholder="Enter your email"
//               value={formik.values.email}
//               name="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: 'before:content-none after:content-none',
//               }}
//             />
//             {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

//             <Input
//               size="lg"
//               placeholder="Enter your password"
//               type="password"
//               value={formik.values.password}
//               name="password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: 'before:content-none after:content-none',
//               }}
//             />
//             {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}

//             <Input
//               size="lg"
//               placeholder="Enter your confirm password"
//               type="password"
//               value={formik.values.conf_Password}
//               name="conf_Password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: 'before:content-none after:content-none',
//               }}
//             />
//             {formik.touched.conf_Password && formik.errors.conf_Password && <div>{formik.errors.conf_Password}</div>}
//           </div>
//           <br />
//           <Button type="submit" variant="White" fullWidth className="bg-rose-500 text-gray-700">
//             Signup
//           </Button>

//           <Typography color="white" className="mt-4 text-center font-normal">
//             Already have an account?{' '}
//             <Link to="/login">Login</Link>
//           </Typography>
//         </form>
//       </Card>

//       <Toaster />
//     </div>
//   );
// }
