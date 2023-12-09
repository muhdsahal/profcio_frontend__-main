import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom'
import EmployeeHome from '../../pages/employee/EmployeeHome';
import AdminHome from '../../pages/admin/AdminHome';


function UserProtected(){
    const token =localStorage.getItem('token');
    // console.log(token,'hhhhhhhhhhhhhhhhhhhhhhhhhh');

    if(token){
        const decoded = jwtDecode(token);
        console.log(decoded,'checked');
        if(decoded.user_type === 'user'){
            return <Outlet/>
        }else if(decoded.user_type === 'employee'){
            return <EmployeeHome/>
        }else if (decoded.user_type === 'admin' && decoded.is_admin){
            return <AdminHome />
        }else{
            // return <Home/>
            console.log(decoded,"else case employee protected");
        }
    }else{
        console.log("token not found");
    }
       
}
export default UserProtected;