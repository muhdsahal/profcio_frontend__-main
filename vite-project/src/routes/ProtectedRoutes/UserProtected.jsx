import { jwtDecode } from 'jwt-decode';
import { Outlet, useNavigate } from 'react-router-dom'
import EmployeeHome from '../../pages/employee/EmployeeHome';
import AdminHome from '../../pages/admin/AdminHome';


function UserProtected(){
    const token =localStorage.getItem('token');
    const navigate = useNavigate()
    console.log(token,'hhhhhhhhhhhhhhhhhhhhhhhhhh');

    if(token){
        const decoded = jwtDecode(token);
        // console.log(decoded,'checked');
        if(decoded.user_type === 'user'){
            return <Outlet/>
        }else if(decoded.user_type === 'employee'){
            return <EmployeeHome/>
        }else if(decoded.user_type === 'admin' && decoded.is_admin){
            return <AdminHome />
        }
    }else{
        navigate("/login")
    }
       
}
export default UserProtected;