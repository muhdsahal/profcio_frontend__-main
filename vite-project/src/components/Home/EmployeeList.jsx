import React,{ useState,useEffect } from "react";
import axios from "axios"
import {
  Typography, Button, Card, CardContent
} from "@material-tailwind/react";
import car_mec from "../../image/car_mechanic.jpeg";
// import plumber from "../../image/plumber.jpg"





function EmployeeList  () {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Make API request to fetch employee data
    axios.get('http://127.0.0.1:8000/auth/employeelisting/')
      .then(response => {
        setEmployees(response.data); // Assuming the API response contains an array of employee objects
        console.log(setEmployees,'#######################################');
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);
  return(
    <div>
        <h2 className="text-2xl font-semibold mb-4">Employees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {employees.map((employee) => (
              <div key={employee.username} className="max-w-xs bg-white border rounded-lg overflow-hidden shadow-lg">
                <img
                  src={car_mec} // Assuming `employee.username` contains the image URL
                  alt="card-image"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{employee.work}</h3>
                  <h3 className="text-xl font-semibold mb-2">{employee.username}</h3>
                  <p className="text-gray-700 mb-2">₹{employee.charge}</p>
                  <p className="text-gray-600">
                    {employee.description}
                  </p>
                  <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
};
  



export default EmployeeList;
