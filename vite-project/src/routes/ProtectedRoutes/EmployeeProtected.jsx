import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import AdminRoutes from '../AdminRoutes'
import UserRoutes from '../UserRoutes';
import EmployeeLoginPage from '../../pages/employee/EmployeeLoginPage'

function EmployeeProtected(){
    const token =localStorage.getItem('token');
    localStorage.clear
    console.log(token,'hhhhhhhhhhhhhhhhhhhhhhhhhh');

    if(token){
        const decoded = jwtDecode(token);
        console.log(decoded,'dddddddddddddddd');
        if (decoded.user_type === 'admin' && decoded.is_admin){
            return <AdminRoutes />
        }else{
            if (decoded.user_type === 'employee'){
                return <Outlet />
            }else{
                return <UserRoutes />
            }
        }
    }else{
        return <EmployeeLoginPage />
    }

}
export default EmployeeProtected;