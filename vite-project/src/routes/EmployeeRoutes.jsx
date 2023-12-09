import React from "react";
import EmployeeHome from "../pages/employee/EmployeeHome";
import { Route,Routes } from "react-router-dom";
import EmployeeProtected from "./ProtectedRoutes/EmployeeProtected";
import EmployeeSignupPage from "../pages/employee/EmployeeSignupPage";
import EmployeeLoginPage from "../pages/employee/EmployeeLoginPage";
import EmployeeProfilePage from "../pages/employee/EmployeeProfilePage";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";



function EmployeeRoutes(){
    return(
        <Routes>
            
            <Route exact element={<PrivateRoute />}>
                <Route path="/signup" element={<EmployeeSignupPage />} />
                <Route path="/employee_login" element={<EmployeeLoginPage />} />
            </Route>

            

            <Route exact element={<EmployeeProtected />}>
                <Route path="/" element={<EmployeeHome />} />
                    <Route path="/profile/:userId" element={<EmployeeProfilePage />} />

                
            </Route>
        </Routes>
    )
}
export default EmployeeRoutes;