import React  from "react";
import CategoryService from "../../components/admin/CategoryService";
import AdminSideBar from "./AdminSIdeBar";
function ServiceCategoryPage(){
    
    return(
        <div className="flex w-screen">
        <AdminSideBar />
        <CategoryService />
      </div>
      
    )
}
export default ServiceCategoryPage;