import React from "react";
import ProfcioFooter from "../../components/Navbar&Footer/Footer";
import { LinearProgress } from "@mui/material";

function FooterPage(){
    return(
        <div>
            <LinearProgress  className=' bg-gradient-to-r from-light-green-400 via-emerald-400 to-blue-600 ' />
            <ProfcioFooter />
        </div>
    )
}
export default FooterPage