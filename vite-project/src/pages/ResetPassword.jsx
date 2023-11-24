import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ResetPasswordUrl } from "../constants/constants";
const ResetPassword =()=>{
    const {ResetToken} = useParams();
    const [newPassword,setNewPassword] = useState('');
    const [message,setMessage] = useState('');

    const handleResetPassword = async ()  => {
        try{
            const response = await axios.post(`${ResetPasswordUrl}/${ResetToken}`,{
            new_password:newPassword,
            })
            setMessage(response.data.detail);
        }catch(error){
            setMessage(error.response.data.detail)
        }
    };
    return(
        <div>
            <h2>reset Password</h2>
        <input type="password" placeholder="new passowrd" onChange={(e)=> setNewPassword(e.target.value)}/>
        <Button onclick={handleResetPassword}>Submit</Button>
        {message && <p>message</p>}
        </div>
    )
}   
export default ResetPassword