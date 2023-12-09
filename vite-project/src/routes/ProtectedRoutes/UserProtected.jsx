import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import EmployeeRoutes from '../EmployeeRoutes'
import AdminRoutes from '../AdminRoutes'


function UserProtected(){
    const token =localStorage.getItem('token');
    // localStorage.clear
    // console.log(token,'hhhhhhhhhhhhhhhhhhhhhhhhhh');

    if(token){
        const decoded = jwtDecode(token);
        console.log(decoded,'checked');
        if(decoded.user_type === 'user'){
            return <Outlet/>
        }else if(decoded.user_type === 'employee'){
            return <EmployeeRoutes/>
        }else if (decoded.user_type === 'admin' && decoded.is_admin){
            return <AdminRoutes />
        }else{
            return <Home/>
        }
    }else{
        return <Home/>
    }
       
}
export default UserProtected;