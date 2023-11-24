import React from "react";
import Home from "../pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import UserProtected from "./ProtectedRoutes/UserProtected";
import ForgotPassword from "../pages/ForgotPassWord";
import ResetPassword from "../pages/ResetPassword";

function UserRoutes(){
    return(
        <Routes>
            
            <Route element={<UserProtected />}>
                <Route element={Home} path='/' />
            </Route>
        </Routes>
    )
}
export default UserRoutes;