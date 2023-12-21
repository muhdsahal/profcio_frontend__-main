import React from "react";
import Home from "../pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import UserProtected from "./ProtectedRoutes/UserProtected";
import EmployeeListUser from "../pages/Home/EmployeeListPage";
import UserProfilePage from "../pages/Home/UserProfilePage";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import Login from "../pages/login/login";
import Signup from "../pages/signup/Signup";
function UserRoutes(){
    return(
        <Routes>
            <Route exact element={<PrivateRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            <Route exact element={<UserProtected />}>
                <Route element={<Home />} path='/' />
            </Route>
                    <Route element={<EmployeeListUser />} path="/employeelist" />
                    <Route element={<UserProfilePage />} path="/userprofile/:userId" />
                    
        </Routes>
    )
}
export default UserRoutes;