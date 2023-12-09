import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import AdminHome from '../../pages/admin/AdminHome';
import EmployeeHome from '../../pages/employee/EmployeeHome';


function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function AdminProtected(){
    const token =localStorage.getItem('token');


    if(token){
        const decoded = parseJwt(token);
        console.log(decoded,'dddddddddddddddd');
        if (decoded.user_type == 'admin' && decoded.is_admin){
            return <Outlet />
        }else if(decoded.user_type == 'user'){
            return <Home />
        }else if(decoded.user_type == 'employee'){
            return <EmployeeHome />
        }else{
        }
    

    }
}
export default AdminProtected;