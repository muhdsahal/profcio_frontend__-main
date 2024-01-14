import React,{useState,useEffect} from "react";
import axios from "axios";
import { BookingEmployeeSide } from "../../constants/constants";
import { jwtDecode } from "jwt-decode";
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

function BookingListEmployee(){
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const userId = decode.user_id
    console.log(userId,'userserserserserser');
    const [bookingList,setBookingList] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        axios.get(`${BookingEmployeeSide}${userId}`)
        .then((response)=>{
            const responseData = response.data
            setBookingList(responseData)
        })
        .catch((error)=>{
            console.error("an error occured data fectcing..",error);
            setLoading(false)
        })
    },[])
    return(<>
    <div className="flex flex-col min-h-max items-center ">
                <h1>My Orders</h1>
            <Card className="h-full w-full">
                <table className='w-full min-w-max table-auto text-left'>
                    <thead>
                        <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Id
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    User
                                </Typography>
                            </th>
                            {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Employee
                                </Typography>
                            </th> */}

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Date
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Price
                                </Typography>
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {bookingList.map((book) => {

                            const classes =  "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={book.id}>
                                <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {book.id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {book.userDetails.username}
                                        </Typography>
                                    </td>

                                    {/* <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {book.employeeDetails.username}
                                        </Typography>
                                    </td> */}
                                    
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            {book.booking_date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-prompt-normal"
                                        >
                                            ₹{book.price}
                                        </Typography>
                                    </td>
                                       
                                    
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    </>)
}
export default BookingListEmployee