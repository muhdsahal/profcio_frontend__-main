import React from "react";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import logo from '../../assets/profcio__All.png'
import { jwtDecode } from "jwt-decode";
import { useApiContext } from "../../context/context";
 
export function SidebarWithSearch() {
  const token = localStorage.getItem('token')
  const decode = jwtDecode(token)
  const userId = decode.user_id;
  const [open, setOpen] = useState(0);
  const navigate = useNavigate()
  const {employeeCredentials} = useApiContext()
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
   const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/employee_login/')
    
   }
   function toProfile() {
    navigate(`/employee/profile/${userId}`);
    // console.log(userId,'userID>>>>>>>>>>>>>>>>>');
  }

  const toBookings = () => {
    navigate(`/employee/booking_list/${userId}`)
  }

  const toChat = () => {
    navigate('/employee/chat')
  }
  // console.log(employeeCredentials,'context is working ');
 
  return (
    <>
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src={logo} alt="logo" color='green' width="150" height="100" />
      </div>
      
        <Typography variant="h4" style={{color:'lightseagreen'}}>
          Employee Dashboard
        </Typography>
      <div className="p-2">
        {/* <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" /> */}
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
          </ListItem>
         
        </Accordion>
        <ListItem  onClick={toProfile}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
              
        <ListItem onClick={toBookings}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Bookings
        </ListItem>
        
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Reviews
        </ListItem>
        {/* <hr className="my-2 border-blue-gray-50" /> */}
        <ListItem onClick={toChat}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Chat
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
    </>
  );
}