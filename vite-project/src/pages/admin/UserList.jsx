import React from "react";
import UserList from "../../components/admin/Users";
import AdminSideBar from "./AdminSIdeBar";

function UserLists() {
    return (<><div className="flex w-screen">
    <AdminSideBar />
    <UserList /></div>
        {/* // <div className="flex">

        
        // <div className="w-full ">
        // 
        // </div>
        // </div> */}
    </>
    )
}
export default UserLists;