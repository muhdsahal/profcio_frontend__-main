import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/login"; // Correct import
import ConfirmMail from "./pages/ConfirmMail";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes/ProtectedRoutes";
import UserRoutes from "./routes/UserRoutes";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ForgotPassword from "./pages/ForgotPassWord";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<ConfirmMail />} path="/confirm" />
          <Route element={<ProtectedRoutes />} >
          <Route element={<Login />} path="/login" />
          <Route element={<ForgotPassword />}  path="/forgot_password/" />
          <Route  element={<ResetPassword />} path="/reset_password/:ResetToken/" />
          </Route> 
          <Route element={<UserRoutes />} path="/*" />
          <Route element={<EmployeeRoutes />} path="/employee/*" />
          <Route element={<AdminRoutes />} path="/admin/*" />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
