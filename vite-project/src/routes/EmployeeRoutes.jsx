import React from "react";
import EmployeeHome from "../pages/employee/EmployeeHome";
import { Route,Routes } from "react-router-dom";
import EmployeeProtected from "./ProtectedRoutes/EmployeeProtected";
import EmployeeSignupPage from "../pages/employee/EmployeeSignupPage";
// import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Login from "../pages/login/login";




function EmployeeRoutes(){
    return(
        <Routes>
            
            <Route path="/signup" element={<EmployeeSignupPage />} />
            <Route path="/login" element={<Login />} />

            

            <Route element={<EmployeeProtected />}>
                <Route path="/" element={<EmployeeHome />} />
                
            </Route>
        </Routes>
    )
}
export default EmployeeRoutes;