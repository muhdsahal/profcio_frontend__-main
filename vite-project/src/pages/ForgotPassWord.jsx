import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import {  ResetPasswordUrl } from "../constants/constants"; // Make sure to import your ResetPasswordUrl

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1 for forgot password, 2 for password reset

  const handleForgotPassword = async () => {
    console.log(email,'email print');
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/password_reset/", {
        email: email,

      });
      console.log(response,'email reaponse');
      setMessage(response.data.detail)
     
    } catch (error) {
      console.error(error, 'forgot error');
      setMessage(error.response.data.detail);
    }
  };
  
  
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardBody className="flex flex-col gap-4">
          
            <>
              <Typography style={{ fontWeight: "500" }}>
                Forgot Password{" "}
              </Typography>

              <Input
                placeholder="Enter your email"
                type="email"
                size="lg"
                label="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
         
            
        
        </CardBody>
        <CardFooter className="pt-0">
        <Button
          variant="White"
          fullWidth
          onClick={ handleForgotPassword }
          className="bg-rose-500 text-gray-700"
        >
           "Send Reset Link
        </Button>

          {message && <p>{message}</p>}
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}

export default ForgotPassword;
