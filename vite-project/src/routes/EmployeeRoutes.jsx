import React from "react";
import EmployeeHome from "../pages/employee/EmployeeHome";
import { Route,Routes } from "react-router-dom";
import EmployeeProtected from "./ProtectedRoutes/EmployeeProtected";
import EmployeeSignupPage from "../pages/employee/EmployeeSignupPage";
// import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import EmployeeLoginPage from "../pages/employee/EmployeeLoginPage";
import EmployeeProfilePage from "../pages/employee/EmployeeProfilePage";



function EmployeeRoutes(){
    return(
        <Routes>
            
            <Route path="/signup" element={<EmployeeSignupPage />} />
            <Route path="/employee_login" element={<EmployeeLoginPage />} />

            

            <Route element={<EmployeeProtected />}>
                <Route path="/" element={<EmployeeHome />} />
                    <Route path="/profile" element={<EmployeeProfilePage />} />

                
            </Route>
        </Routes>
    )
}
export default EmployeeRoutes;