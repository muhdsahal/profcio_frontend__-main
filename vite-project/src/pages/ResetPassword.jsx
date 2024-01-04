import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
import axios from 'axios';
import { Password } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [uid, setUid] = useState('')
    const navigate = useNavigate()
    const apiUrl = "http://127.0.0.1:8000/auth/password_change/"

    const handlePasswordResetConfirmation = async () => {
        console.log(newPassword,'password');
        try {
          const response = await axios.post(apiUrl, {
            
            new_password: newPassword,
            uid: uid,
        });
            console.log(response.data,'response.datresponse.datresponse.datresponse.dat');
            setMessage(response.data.detail);
            navigate("/employee/employee_login")
        } catch (error) {
          console.error(error, 'reset error');
          setMessage(error.response.data.detail);
        }
      };


      useEffect(() => {
        // Get the current URL
        const currentUrl = window.location.href;
    
        // Splitting the URL by '/'
        const urlParts = currentUrl.split('/');
    
        // Extracting data from the last two positions
        setUid(urlParts[urlParts.length - 2])
        const data1 = urlParts[urlParts.length - 2];
        const data2 = urlParts[urlParts.length - 1];
    
        console.log("Data from the second-to-last position:", data1);
        console.log("Data from the last position:", data2);
      }, []); // Run this effect only once when the component mounts
    
  return (
    <>
    
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardBody className="flex flex-col gap-4">
         
            
         
            <>
              <Typography style={{ fontWeight: "500" }}>
                Reset Password{" "}
              </Typography>

              <Input
                placeholder="Enter new password"
                type="password"
                size="lg"
                label="newPassword"
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </>
        
        </CardBody>
        <CardFooter className="pt-0">
        <Button
          variant="White"
          fullWidth
          onClick={ handlePasswordResetConfirmation}
          className="bg-rose-500 text-gray-700"
        >
          submit
        </Button>

          {/* {message && <p>{message}</p>} */}
        </CardFooter>
      </Card>
      {/* <Toaster /> */}
    </div>

    
    </>
    
  )
}

export default ResetPassword

{/* <>
              <Typography style={{ fontWeight: "500" }}>
                Reset Password{" "}
              </Typography>

              <Input
                placeholder="Enter new password"
                type="password"
                size="lg"
                label="newPassword"
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </> */}



// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { ResetPasswordUrl } from "../constants/constants";
// const ResetPassword =()=>{
//     const {ResetToken} = useParams();
//     const [newPassword,setNewPassword] = useState('');
//     const [message,setMessage] = useState('');

//     const handleResetPassword = async ()  => {
//         try{
//             const response = await axios.post(`${ResetPasswordUrl}/${ResetToken}`,{
//             new_password:newPassword,
//             })
//             setMessage(response.data.detail);
//         }catch(error){
//             setMessage(error.response.data.detail)
//         }
//     };
//     return(
//         <div>
//             <h2>reset Password</h2>
//         <input type="password" placeholder="new passowrd" onChange={(e)=> setNewPassword(e.target.value)}/>
//         <Button onclick={handleResetPassword}>Submit</Button>
//         {message && <p>message</p>}
//         </div>
//     )
// }   
// export default ResetPassword