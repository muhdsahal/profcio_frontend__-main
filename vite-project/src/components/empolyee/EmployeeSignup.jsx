import { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate ,Link} from "react-router-dom";
import axios from 'axios'
import {Card,
    Input,
    Checkbox,
    Button,
    Typography } from "@material-tailwind/react";

import {empRegisterURL} from '../../constants/constants'
import Loader from '../Loading/Loading'

export function EmployeeRegistrationForm(){
    const navigate = useNavigate()

    const toLogin = () =>{
      navigate("/employee/employee_login")
    }

    const [other,setOther] = useState({conf_Password:"",check:false});

    // form 
    const [formData,setFormData] =useState({
        username:"",
        email:"",
        password:"",
        user_type : "employee"
    });

    const [user,setUser] = useState([]);

    // for loading
    const [loading,setLoading] = useState(false);
    const handleLoading = () => setLoading((cur)=> !cur);

    //email validation Handler
    const validEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex .test(email)
    }

    //form data validation error
    const  validForm = (e) => {
  

         if (formData.username.trim()===""){
            toast.error("username not should be empty")
            return false;
        }
        
        else if (formData.email.trim()===""){
            toast.error("email not should be empty")

            return false;
        }
        else if(!validEmail(formData.email.trim())){
            toast.error("enter valid email")

            return false;
        }
        else if (formData.password.trim()===""){
            toast.error("password not should be empty")

            return false;
        }
        else if (other.conf_Password.trim()==""){
            toast.error("please confirm password")


            return false
        }
        else if(formData.password != other.conf_Password){
            toast.error("password mismatch !")
 

            return false
        } 
        return true;
        
    }
        // form submit handler
        const handleSubmit = async(e) => {
          
          console.log(formData);
            if (validForm()){
            handleLoading();
        try{
            const response = await axios.post(empRegisterURL,formData);

            const user_type = response.data.user_type
            toast.success("Registraion success..!")
            
            

        setFormData({
            // first_name:"",
            // last_name:"",
            username:"",
            email:"",
            password:"",
            user_type:"employee"
        })
        setOther({conf_Password:"",check:false})
        handleLoading();
        console.log(formData,'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        navigate("/confirm")
        }catch(error){
            
            handleLoading();
              if (error.response.data){
                console.log(error.response.data.email);
                if (error.response.data.email){
                    toast.error(error.response.data.email[0])
                }
                if (error.response.data.username){
                    toast.error(error.response.data.username[0])
                }
              }else{
                toast.error("An error occurred during registration..")
           
            }
          }

        }
      }
      return (
        <div className="flex items-center justify-center h-screen" >
           {loading && <Loader />}
        <Card className="text-center" color="transparent" shadow={false}>
         <Typography variant="h4" color="blue-gray">
           Sign Up
         </Typography>
         <Typography color="gray" className="mt-1 font-normal">
           Welcome To Profcio ! Enter Employee details.
         </Typography>
         <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
           <div className="mb-1 flex flex-col gap-6">
             {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
               Your Name
             </Typography> */}
             {/* <Input
               size="lg"
               placeholder="Enter your first name"
               value={formData.first_name} name="first_name"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             /> */}
             <Input
               size="lg"
               placeholder="Enter your last username"
               value={formData.username} name="username"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
           <Input
               size="lg"
               placeholder="Enter your  email"
              
               value={formData.email} name="email"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
             <Input
               size="lg"
               placeholder="Enter your password"
              
               value={formData.password} name="password" type="password"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
             <Input
               size="lg"
               placeholder="Enter your confirm password"
              
               value={other.conf_Passwordpassword} name="conf_Password" type="password"
               onChange={(e)=>{setOther({...other,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
           </div>
           <Button className="mt-6" fullWidth
           onClick={(e)=>{handleSubmit()}}>
             signup
           </Button>
           <Typography color="gray" className="mt-4 text-center font-normal">
             Already have an account?{" "}
             <Link to="/employee/employee_login">
                 Login
              </Link>
             
           </Typography>
         </form>
       </Card>
       <Toaster/>
       </div>
     );


}