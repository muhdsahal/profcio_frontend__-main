import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button,} from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom";
import { EmployeeListingURL } from "../../constants/constants";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Make API request to fetch employee data
    axios
      .get(EmployeeListingURL)
      .then((response) => {
       
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-4">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="max-w-xs bg-white border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={employee.profile_photo}
              alt="card-image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{employee.work}</h3>
              <h3 className="text-xl font-semibold mb-2">{employee.username}</h3>
              <p className="text-gray-700 mb-2">₹{employee.charge}</p>
              <p className="text-gray-600">{employee.description}</p>
              <div className="mt-4">
                <Button
                  color="blue"
                  ripple="light"
                  className="px-4 py-2 rounded"
                  onClick={() =>
                    navigate(`/employeedetails/${employee.id}/`)
                  }
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
