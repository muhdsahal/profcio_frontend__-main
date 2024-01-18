import React from "react";
import Home from "../pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import UserProtected from "./ProtectedRoutes/UserProtected";
import EmployeeListUser from "../pages/Home/EmployeeListPage";
import UserProfilePage from "../pages/Home/UserProfilePage";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import Login from "../pages/login/login";
import Signup from "../pages/signup/Signup";
import EmployeeDetailsPage from "../pages/Home/EmployeeDetailsPage";
import SuccessFullPayment from "../components/Home/payment/Success";
import CanceledPayment from "../components/Home/payment/fail";
import ForgotPassword from "../pages/ForgotPassWord";
import ResetPassword from "../pages/ResetPassword";
import BookingListUser from "../components/Home/BookingList";
import BookingListPage from "../pages/Home/BookingListPage";
import ChatUser from "../components/Home/ChatUser";
function UserRoutes(){
    return(
        <Routes>
            <Route exact element={<PrivateRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/password_reset/" element={<ForgotPassword />} />
                <Route path="/reset_password/:uid/:token" element={<ResetPassword />} />

            </Route>

            <Route exact element={<UserProtected />}>
                <Route element={<Home />} path='/' />
            </Route>
                    <Route element={<EmployeeListUser />} path="/employeelist" />
                    <Route element={<UserProfilePage />} path="/userprofile/:userId" />
                    <Route element={<EmployeeDetailsPage />} path="/employeedetails/:id/" />
                    <Route element={<BookingListPage/>} path="/booking_list/:userId"/>
                    <Route element={<SuccessFullPayment />} path="/employeedetails/payment/success/" />
                    <Route element={<CanceledPayment />} path="/employeedetails/payment/canceled/" />
                    <Route element={<ChatUser />} path="/chat" />

                    

                    
        </Routes>
    )
}
export default UserRoutes;