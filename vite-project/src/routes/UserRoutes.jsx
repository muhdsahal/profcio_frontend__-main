import React from "react";
import Home from "../pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import UserProtected from "./ProtectedRoutes/UserProtected";
import ForgotPassword from "../pages/ForgotPassWord";
import ResetPassword from "../pages/ResetPassword";
import EmployeeListUser from "../pages/Home/EmployeeListPage";

function UserRoutes(){
    return(
        <Routes>
            {/* <Route path="/forgot_password" element={<ForgotPassword />} /> */}
            {/* <Route path="/Reset_password" element={<ResetPassword />} /> */}

            <Route element={<UserProtected />}>
                <Route element={<Home />} path='/' />
            </Route>
                    <Route element={<EmployeeListUser />} path="/employeelist" />
        </Routes>
    )
}
export default UserRoutes;