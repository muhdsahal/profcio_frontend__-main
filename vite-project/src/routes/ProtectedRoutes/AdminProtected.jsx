// import { jwtDecode } from 'jwt-decode';
import { Outlet, useNavigate } from 'react-router-dom'
import Home from '../../pages/Home/Home'
// import AdminHome from '../../pages/admin/AdminHome';
import EmployeeHome from '../../pages/employee/EmployeeHome';
import { jwtDecode } from 'jwt-decode';


// function parseJwt(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }

function AdminProtected(){
    const token =localStorage.getItem('token');
    console.log(token,"adminprotected");
    const navigate = useNavigate()


    if(token){
        const decoded = jwtDecode(token);
        console.log(decoded,'adminprotectred');
        if (decoded.user_type === 'admin' && decoded.is_admin){
            return <Outlet />
        }else if(decoded.user_type === 'user'){
            return <Home />
        }else if(decoded.user_type === 'employee'){
            return <EmployeeHome />
        }
    }else{
        navigate("/admin_login")
    }
}
export default AdminProtected;