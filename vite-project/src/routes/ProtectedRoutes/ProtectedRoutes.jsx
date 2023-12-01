import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import EmployeeRoutes from '../EmployeeRoutes'
import AdminRoutes from '../AdminRoutes'
import Login from '../../pages/login/login';
import UserRoutes from '../UserRoutes';
// import AdminLoginPage from '../../pages/admin/adminLoginPage';
// import EmployeeLoginPage from '../../pages/employee/EmployeeLoginPage';

function ProtectedRoutes(){
    const token = localStorage.removeItem('token');
    localStorage.clear
    
    

    if(token){
        const decoded = jwtDecode(token);
        if(decoded.user_type === 'admin' && decoded.is_admin){
            return <AdminRoutes />
        }
        else{
            if(decoded.user_type === 'employee'){
                return <EmployeeRoutes />
            }else{
                return <UserRoutes />
            }
        }
    
    }else{
       
        return <Login />
        
    }
}
export default ProtectedRoutes