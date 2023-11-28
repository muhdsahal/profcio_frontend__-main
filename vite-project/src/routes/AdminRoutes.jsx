import React from "react";
import AdminHome from "../pages/admin/AdminHome";
import { Route, Routes } from "react-router-dom";
import AdminProtected from './ProtectedRoutes/AdminProtected'
import AdminLoginPage from "../pages/admin/adminLoginPage";
import UserLists from "../pages/admin/UserList";
function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin_login" element={<AdminLoginPage />} />

            <Route element={<AdminProtected />}>
                <Route path="/" element={<AdminHome />} />
                    <Route path="/users" element={<UserLists />} />
            </Route>
        </Routes >
    )
}
export default AdminRoutes;