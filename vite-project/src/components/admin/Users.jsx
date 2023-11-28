import { useState, useEffect } from "react";
import React from "react";
// import { UserBaseUrl,UserDetailsURL } from "../../constants/constants";
import axios from "axios";
import {
    Card,
    Typography,
    Button,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";


function UserList() {
    const [userList, setUserList] = useState([])
    const [loading, setLaoding] = useState(true)

    useEffect(() => {
        const apiUrl = "http://127.0.0.1:8000/auth/userdetails/";

        axios
            .get(apiUrl)
            .then((response) => {
                const responseData = response.data;
                setUserList(responseData)

                
            })
            .catch((error) => {
                console.error("Error Fetching Data:", error);
                setLaoding(false)
            })

    }, [])

    const handleBlockUnblock =(id,is_active) => {
        const apiUrl = `http://127.0.0.1:8000/auth/user_block_unblock/${id}/`
    axios
        .put(apiUrl,{ is_active: !is_active })
        .then((response) => {
            setUserList((prevUserList) =>{
                return prevUserList.map((user) => {
                    if(user.id === id){
                        return { ...user,is_active:!is_active };
                    }
                    return user;
                })
            })
        })
        .catch((error)=>{
            console.error("Error Updating user status:",error);
        })
    }


   

    console.log(userList, '<><><><><><><><><><><><><><><><><><><><><><><>');
    return (
        <div className="flex flex-col h-screen">
            <Card className="flex-1">
                <table className="  text-left">
                    <thead>
                        <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Id
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Name
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Email
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    User Type
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Action
                                </Typography>
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => {

                            const classes =  "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={user.id}>
                                <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.username}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.email}
                                        </Typography>
                                    </td>
                                    
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.user_type}
                                        </Typography>
                                    </td>
                                        <td className={classes}>
                                        {user.is_active ? (
                                            <Button className="bg-[#d11204] w-24" onClick={() => handleBlockUnblock(user.id, user.is_active)}>
                                                Block
                                            </Button>
                                            ) : (
                                            <Button className="bg-[#20d104] w-24" onClick={() => handleBlockUnblock(user.id, user.is_active)}>
                                                <span className="-ml-2">Unblock</span>
                                            </Button>
                                        )}
                                    </td>
                                    
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );

}
export default UserList;