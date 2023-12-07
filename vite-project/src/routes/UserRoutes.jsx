import React from "react";
import Home from "../pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import UserProtected from "./ProtectedRoutes/UserProtected";
import ForgotPassword from "../pages/ForgotPassWord";
import ResetPassword from "../pages/ResetPassword";
import EmployeeListUser from "../pages/Home/EmployeeListPage";
import UserProfilePage from "../pages/Home/UserProfilePage";

function UserRoutes(){
    return(
        <Routes>
            {/* <Route path="/forgot_password" element={<ForgotPassword />} /> */}
            {/* <Route path="/Reset_password" element={<ResetPassword />} /> */}

            <Route element={<UserProtected />}>
                <Route element={<Home />} path='/' />
            </Route>
                    <Route element={<EmployeeListUser />} path="/employeelist" />
                    <Route element={<UserProfilePage />} path="/userprofile" />
        </Routes>
    )
}
export default UserRoutes;