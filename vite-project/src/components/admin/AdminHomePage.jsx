import React, { useState ,useEffect} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Chart from "react-apexcharts";
import { AdminDashboardUrl } from "../../constants/constants";
import axios  from "axios";
function AdminHomePage() {
    const [countOfUser, setCountOfUser] = useState([])
    const [bookingDetails,setBookingDetails] = useState([])
    const [manageState, setManageState] = useState(false)


    useEffect(() => {
        setManageState(false)
      axios.get(`${AdminDashboardUrl}admin/usercount/`).then((response)=>{
       const responseData = response.data
       setCountOfUser(responseData)
      }).catch((error)=>{
        console.error("An error occured during fetch data",error);
      })
    

      setManageState(false)
      axios.get(`${AdminDashboardUrl}admin/booking_detials/`).then((response)=>{
       const responseData = response.data
       setBookingDetails(responseData)
      }).catch((error)=>{
        console.error("An error occured during fetch data",error);
      })
      
    }, [manageState])
    
    return (
           <div>
            <h1 className='flex text-center justify-center font-roboto-mono text-black'>Admin Dashboard</h1>
        <div className="flex flex-wrap justify-between mb-5 mt-5 ml-5 gap-1">
            <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                <div className="flex flex-col items-center">
                    <Typography className='font-prompt mt-2' variant="h5">Total Users</Typography>
                    <Typography variant="h2">90</Typography>
                </div>
            </div>
            <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                <div className="flex flex-col items-center">
                    <Typography className='font-prompt mt-2' variant="h5">Employees</Typography>
                    <Typography variant="h2">90</Typography>
                </div>
            </div>
            <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                <div className="flex flex-col items-center">
                    <Typography className='font-prompt mt-2' variant="h5">Users</Typography>
                    <Typography variant="h2">90</Typography>
                </div>
            </div>
            <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-[#000000]">
                <div className="flex flex-col items-center">
                    <Typography className='font-prompt mt-2' variant="h5">Bookings</Typography>
                    <Typography variant="h2">90</Typography>
                </div>
            </div>
            <div className="flex ml-10 ">
    {/* <div className=" row">
        <div className="mixed-chart">
            <Chart
                // options={chartData.options}
                // series={chartData.series}
                type="donut"
                width="400"
            />
        </div>
    </div>

    <div className=" row ml-10">
        <div className="mixed-chart">
            <Chart
                // options={amountData.options}
                // series={amountData.series}
                type="donut"
                width="390"
            />
        </div>
    </div> */}
</div>



        </div>
        </div>

    )
}
export default AdminHomePage;