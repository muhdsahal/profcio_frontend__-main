import React, { useState } from "react";
import axios from "axios";
import { forgotPasswordUrl } from "../constants/constants";




const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('');

    const handleForgotPassword = async () =>{
        try{
            const response = await axios.post(forgotPasswordUrl,
            {email:email,
            });
            setMessage(response.data.detail);
        }catch(error){
            setMessage(error.response.data.detail);
        }
    }
    return(
        <div>
            <h2>Forgot Password</h2>
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <Button onclick={handleForgotPassword}>Submit</Button>
            {message && <p>{message}</p>}
        </div>
    )

}
export default ForgotPassword