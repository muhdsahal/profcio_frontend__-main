import React from "react";
import AdminHome from "../pages/admin/AdminHome";
import { Route,Routes } from "react-router-dom";
import AdminProtected from './ProtectedRoutes/AdminProtected'
function AdminRoutes(){
    return(
        <Routes>
            <Route element={<AdminProtected />}>
            <Route path="/" element={<AdminHome />}/>
            </Route>
        </Routes>
    )
}
export default AdminRoutes;