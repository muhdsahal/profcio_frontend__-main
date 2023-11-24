import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import EmployeeRoutes from '../EmployeeRoutes';
import UserRoutes from '../UserRoutes';
import Login from '../../pages/login/login';

function AdminProtected(){
    const token =localStorage.getItem('token');
    localStorage.clear
    console.log(token,'hhhhhhhhhhhhhhhhhhhhhhhhhh');

    if(token){
        const decoded = jwtDecode(token);
        console.log(decoded,'dddddddddddddddd');
        if (decoded.user_type === 'admin' && decoded.is_admin){
            return <Outlet />
        }else{
            if (decoded.user_type === 'employee'){
                return <EmployeeRoutes />
            }else{
                return <UserRoutes />
            }
        }
    }else{
        return <Login />
    }

}
export default AdminProtected;