import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import AdminHome from '../../pages/admin/AdminHome';

function EmployeeProtected(){
    const token =localStorage.getItem('token');
    

    if(token){
        const decoded = jwtDecode(token);
        console.log(decoded,'dddddddddddddddd');
        if(decoded.user_type === 'user'){
            return <Home />
        }else if(decoded.user_type === 'employee'){
            return <Outlet/>
        }else if(decoded.user_type === 'admin' && decoded.is_admin){
            <AdminHome />
        }
    }else{
        console.log(decode, "the else case of Employee Protected if this was null it means no data there to decode")
 
    }   
       
}
export default EmployeeProtected;