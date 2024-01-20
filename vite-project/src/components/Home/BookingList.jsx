import React,{useState,useEffect} from "react";
import axios from "axios";
import { BookingUserSide } from "../../constants/constants";
import { jwtDecode } from "jwt-decode";
import {Card,Typography} from "@material-tailwind/react";

function BookingListUser(){
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const userId = decode.user_id
    const [bookingList,setBookingList] = useState([])
    const [loading,setLoading] = useState(true)
   
    useEffect(()=>{
        axios.get(`${BookingUserSide}${userId}`)
        .then((response)=>{
            const responseData = response.data
            setBookingList(responseData)
        })
        .catch((error)=>{
            console.error("an error occured data fectcing..",error);
            setLoading(false)
        })
    },[])
    const bookData = (userId) => {
        if(bookingList.length!== 0 ){
            return <h1>My Bookings </h1>;
        }else{
            return <h1>No Bookings Found</h1>;  
        }
    }
    console.log(bookData,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    return(<>
    <div className="flex flex-col min-h-max items-center ">
                {bookData(userId)}
            <Card className="w-full " style={{height:"350px"}}>
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
                                    Employee
                                </Typography>
                            </th>

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
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Booking Status
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
                                            {book.employeeDetails.username}
                                        </Typography>
                                    </td>
                                    
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
                                    <td className={classes} >
                                       {(book.booking_status ==='pending'? <Typography
                                            // variant="small"
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#42cef5]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
                                        {(book.booking_status ==='ongoing'? <Typography
                                            // variant="small"
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#e4f046]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
                                        {(book.booking_status ==='completed'? <Typography
                                            // variant="small"
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#0ee865]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
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
export default BookingListUser