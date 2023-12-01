import React from "react";
import EmployeeHomePage from "../../components/empolyee/employeeHomePage";
import EmpSideBar from "./EmpSideBar";
// import EmployeeProfilePage from "./EmployeeProfilePage";
function EmployeeHome(){
    return(
        <>
        <EmpSideBar />
        <EmployeeHomePage/>
        {/* <EmployeeProfilePage /> */}
        </>
    )
}
export default EmployeeHome