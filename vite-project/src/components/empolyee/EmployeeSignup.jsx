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
        user_type : "employee",
        is_active : false,
        phone_number:"",
        work : "",
        place : "",
        description : "",
        experience : "",
        charge:""
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
        else if(formData.phone_number.trim() === ""){
          toast.error("phone number should not be empty")
          return false
        }
        else if(formData.phone_number < 10 && phone_number > 10){
          toast.error("phone number should be 10 digit")
          return false
        }
        else if(formData.work.trim()=== ""){
          toast.error("work should not be empty!")
          return false
        }
        else if(formData.place.trim()=== ""){
          toast.error("place should not be empty!")
          return false
        }
        else if(formData.description.trim()=== ""){
          toast.error("description should not be empty!")
          return false
        }
        else if(formData.description.trim()=== ""){
          toast.error("description should not be empty!")
          return false
        }
        else if(formData.experience < 1 & formData.experience > 50 ){
          toast.error(" experience should minimum 1 year !")
          return false
        }
        else if(formData.charge  < 300 & formData.charge> 1500){
          toast.error("description should not be empty!")
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
          username:"",
          email:"",
          password:"",
          user_type : "employee",
          is_active : false,
          phone_number:"",
          work : "",
          place : "",
          description : "",
          experience : "",
          charge:""
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
        <div className="flex items-center justify-center h-screen">
  {loading && <Loader />}
  <Card className="text-center" color="transparent" shadow={false}>
    <Typography variant="h4" color="blue-gray">
      Sign Up
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Welcome To Profcio! Enter Employee details.
    </Typography>
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-1 flex flex-col gap-6">
        <div className="flex gap-6">
          {/* First Line */}
          <div className="flex-1">
          <Input
               size="lg"
               placeholder="Enter your username"
               value={formData.username} name="username"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <div className="flex-1">
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
          </div>

        </div>
        <div className="flex gap-6">
          {/* First Line */}
          <div className="flex-1">
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
          </div>
          <div className="flex-1">
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
        </div>
        <div className="flex gap-6">
        <div className="flex-1">
        <Input
               size="lg"
               placeholder="Enter your Phone number"
          
               value={formData.phone_number} name="phone_number"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <div className="flex-1">
          <Input
               size="lg"
               placeholder="Enter your  work"
          
               value={formData.work} name="work"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          </div>
          <div className="flex gap-6">
          <div className="flex-1">
          <Input
               size="lg"
               placeholder="Enter your  place"
          
               value={formData.place} name="place"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <div className="flex-1">
          <Input
               size="lg"
               placeholder="Enter your  description"
          
               value={formData.description} name="description"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          </div>
          <div className="flex gap-6">
          <div className="flex-1">
          <Input
               size="lg"
               placeholder="Enter your  experience"
          
               value={formData.experience} name="experience"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          <div className="flex-1">
          <Input
               size="lg"
               placeholder="Enter your  Charge"
          
               value={formData.charge} name="charge"
               onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}
               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
               labelProps={{
                 className: "before:content-none after:content-none",
               }}
             />
          </div>
          </div>
        <Button className="mt-6" fullWidth onClick={(e) => handleSubmit()}>
          Sign Up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/employee/employee_login">Login</Link>
        </Typography>
      </div>
    </form>
  </Card>
  <Toaster />
</div>

     );


}