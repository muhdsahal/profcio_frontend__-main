import React from "react";
import AdminHomePage from "../../components/admin/AdminHomePage";
import AdminSideBar from "./AdminSIdeBar";
import UserLists from "./UserList";

function AdminHome(){
    return(
        <div className="flex">

        <AdminSideBar />
        <div className="w-full ">
        </div>
       
        </div>
    )
}
export default AdminHome;