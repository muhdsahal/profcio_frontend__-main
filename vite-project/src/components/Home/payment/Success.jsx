import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../../constants/constants";

function SuccessFullPayment (){
    const queryParameters = new URLSearchParams(window.location.search);
    const userId = queryParameters.get("userId")
    const empId = queryParameters.get("empId")
    const date = queryParameters.get("date")
    console.log(userId,empId,date);
    const [success,setSuccess] = useState(false)
    const [loading, setLoading] = useState(true);


    const isInitializedRef = useRef(false);
    useEffect(() =>{
        if(!isInitializedRef.current){
            const fetchData = async () => {
                try{
                    const response = await axios.post(`${base_url}/auth/employee/booking/register/`, {
                        userId,
                        empId,
                        date,
                    });
                    console.log(response,'response of register');
                    if (response.status === 200){
                        setSuccess(true)
                    }else{
                        setSuccess(false)
                    }
                }catch(error){
                    console.error("error",error);
                    setSuccess(false)
                }
            }
            fetchData();
            isInitializedRef.current = true;
        }
    },[userId,empId,date]);
    

    return(
        <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className={`w-16 h-16 mx-auto my-6 ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="20"
          >
            {success ? "✅" : "❌"}
          </text>
        </svg>
        <div className="text-center">
          {loading && <p>Loading...</p>}
          {!loading && success && (
            <>
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for doing business with us.
              </p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <Link to="/">
                  <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                  </button>
                </Link>
              </div>
            </>
          )}
          {!loading && !success && (
            <>
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Failed
              </h3>
              <p>
                There was an issue processing your payment. Please try again
                later.
              </p>
              <div className="py-10 text-center">
                <Link to="/">
                  <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    )
}
export default SuccessFullPayment
