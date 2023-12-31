import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/login"; // Correct import
import ConfirmMail from "./pages/ConfirmMail";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes/PrivateRoute";
import UserRoutes from "./routes/UserRoutes";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ForgotPassword from "./pages/ForgotPassWord";
// import ResetPassword from "./pages/ResetPassword";
import UserType from "./components/Home/UserType";
import PrivateRoute from "./routes/ProtectedRoutes/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route  element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" exact element={<Signup />}/>
            <Route path="/confirm" exact element={<ConfirmMail />}/>
            <Route path="/login/" exact element={<Login />}/>
            <Route path="/usertype/" exact element={<UserType />}/>
            <Route path="/password_reset/" element={<ForgotPassword />} />
            {/* <Route path="/reset_password/:ResetToken/" element={<ResetPassword />}  /> */}
          </Route>
          
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/employee/*" element={<EmployeeRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
