import React from "react";
import  ServiceListCreatePage  from "../../components/admin/Services";
import AdminSideBar from "./AdminSIdeBar";

function ServiceList(){
    return(
        <><div className="flex w-screen">
    <AdminSideBar />
    <ServiceListCreatePage /></div>

    </>
       
    )
}
export default ServiceList