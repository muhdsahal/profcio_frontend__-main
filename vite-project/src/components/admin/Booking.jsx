import { useState, useEffect } from "react";
import React from "react";
import { BookingListUrl } from "../../constants/constants";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'

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


function BookingList() {
    const [BookingList, setBookingList] = useState([])
    const [loading, setLaoding] = useState(true)
    // const [users,setUsers ] = useState([])

    useEffect(() => {
        // const apiUrl = "http://127.0.0.1:8000/employee/employee_bookings_list/";

        axios
            .get(BookingListUrl)
            .then((response) => {
                const responseData = response.data;
                setBookingList(responseData)

                
            })
            .catch((error) => {
                console.error("Error Fetching Data:", error);
                setLaoding(false)
            })

    }, [])

    

   


    return (
        <div className="flex flex-col min-h-screen items-center ">
            
            {/* <input onChange={(e) => SearchUser(e.target.value)} className='w-96 rounded-lg h-11 ml-16 border-2 border-gray-300  font-roboto-mono text-black' type="text" placeholder='  Search' /> */}
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
                            
                        </tr>
                    </thead>
                    <tbody>
                        {BookingList.map((book) => {

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
                                       
                                    
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );

}
export default BookingList;