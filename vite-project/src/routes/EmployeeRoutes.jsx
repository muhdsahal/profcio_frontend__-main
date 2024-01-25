import React from "react";
import EmployeeHome from "../pages/employee/EmployeeHome";
import { Route,Routes } from "react-router-dom";
import EmployeeProtected from "./ProtectedRoutes/EmployeeProtected";
import EmployeeSignupPage from "../pages/signup/EmployeeSignupPage";
import EmployeeLoginPage from "../pages/login/EmployeeLoginPage";
import EmployeeProfilePage from "../pages/employee/EmployeeProfilePage";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import ForgotPassword from "../pages/ForgotPassWord";
import ResetPassword from "../pages/ResetPassword";
import BookingListPage from "../pages/employee/BookingListPage";
import ChatPageEmployee from "../pages/employee/ChatPageEmployee";
import CustomerPage from "../pages/employee/CustomerPage";

function EmployeeRoutes(){
    return(
        <Routes>
            
            <Route exact element={<PrivateRoute />}>
                <Route path="/employee_signup" element={<EmployeeSignupPage />} />
                <Route path="/employee_login" element={<EmployeeLoginPage />} />
                <Route path="/password_reset/" element={<ForgotPassword />} />
                <Route path="/reset_password/:uid/:token" element={<ResetPassword />} />

            </Route>

            

            <Route exact element={<EmployeeProtected />}>
                <Route path="/" element={<EmployeeHome />} />
                <Route path="/profile/:userId" element={<EmployeeProfilePage />} />
                <Route path="/booking_list/:userId" element={<BookingListPage />} />
                <Route path="/customer/:userId" element={<CustomerPage />} />
                <Route path="/chat" element={<ChatPageEmployee />} />
            </Route>
        </Routes>
    )
}
export default EmployeeRoutes;