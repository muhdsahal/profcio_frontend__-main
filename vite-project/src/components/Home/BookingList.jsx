import React,{useState,useEffect} from "react";
import axios from "axios";
import { BookingUserSide, base_url } from "../../constants/constants";
import { jwtDecode } from "jwt-decode";
import { Button, Card, CardActions, CardContent, Dialog, Input, TextField, Typography } from "@mui/material";
import StarRating from "./ReviewRating/StarRating";

function BookingListUser(){
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const userId = decode.user_id
    const [bookingList,setBookingList] = useState([])
    const [loading,setLoading] = useState(true)
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(null);
    const [reviewEmpId, setReviewEmpid] = useState(null);
    const [open,setOpen] = useState(false)

    const handleOpenModal = (id) => {
        setReviewEmpid(id);
        setOpen((prevOpen) => !prevOpen);
    };

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
   
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setOpen(!open)
        const apiUrl = `${base_url}/employee/review/`
        const reviewRatingForm = new FormData
        reviewRatingForm.append("employee",reviewEmpId)
        reviewRatingForm.append("user",userId)
        reviewRatingForm.append("review_text",reviewText)
        reviewRatingForm.append("rating",rating)
        // for (const [key,value] of reviewRatingForm.entries()){
        //     console.log(`${key}::::${value}`);
        // }
        try {
          await axios.post(apiUrl, reviewRatingForm).then((res)=>{
          })
          setReviewText('');
          setRating(null);
        } catch (error) {
          console.error('Error submitting review:', error);
        }
      };


    return(<>
    <div className="flex flex-col min-h-max items-center ">
                {bookData(userId)}
            <Card className="w-full " >
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
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-prompt-normal leading-none opacity-70"
                                >
                                    Review
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
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#42cef5]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
                                        {(book.booking_status ==='ongoing'? <Typography
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#e4f046]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
                                        {(book.booking_status ==='completed'? <Typography
                                            className="font-prompt-normal border-[1px] border-[#b3b5b5] pl-2 pr-2 rounded-full w-fit  bg-[#0ee865]" 
                                        >
                                            {book.booking_status}
                                        </Typography>  :'')}
                                    </td>
                                    {book.booking_status === 'completed' && (
                                    <td className={classes}>
                                        {book.is_reviewed ? (
                                            <Typography
                                            className="font-prompt-normal"
                                            color="blue-gray"
                                          >
                                            Review Submitted
                                          </Typography>
                                        ):(

                                        <Button
                                            variant="small"
                                            color="blue"
                                            onClick={() => handleOpenModal(book.employeeDetails.id)}
                                        >
                                            Review
                                        </Button>
                                        )}
                                      
                                    </td>
                                )}
                                    
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
        
        <Dialog
        open={open}
        onClose={handleOpenModal}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <Card >
        <CardContent className="h-full">
        <Typography variant="h4" className="flex gap-4">
            Write Review
          </Typography>
          <label className="flex flex-row gap-3">
            Rating:
            <StarRating rating={rating} onRatingChange={(newRating) => setRating(newRating)} />
          </label>
          <div className="flex flex-row gap-3">
            Review:
            <TextField  fullWidth value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          </div>
          </CardContent>
          </Card>
          <CardActions>
          <Button className="bg-green" variant="contained" onClick={handleReviewSubmit} fullWidth>
            Create 
          </Button>
        </CardActions>
      </Dialog>
    </>)
}
export default BookingListUser