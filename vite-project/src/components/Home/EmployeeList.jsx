import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Input,
  Select,
} from "@material-tailwind/react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(8);

  useEffect(() => {
    // Make API request to fetch employee data
    axios
      .get("http://127.0.0.1:8000/auth/employeelisting/")
      .then((response) => {
        setEmployees(response.data); // Assuming the API response contains an array of employee objects
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter employees based on search term
    const filtered = employees.filter((employee) =>
      employee.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        {/* Add other filters as needed */}
        {/* Example: <Select options={...} onChange={...} /> */}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentEmployees.map((employee) => (
          <div key={employee.username} className="max-w-xs bg-white border rounded-lg overflow-hidden shadow-lg">
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
                <Button color="blue" ripple="light" className="px-4 py-2 rounded">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <ul className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }).map((_, index) => (
          <li key={index}>
            <Button
              color={currentPage === index + 1 ? "blue" : "gray"}
              ripple="light"
              onClick={() => paginate(index + 1)}
              className="px-3 py-1 mx-1 rounded"
            >
              {index + 1}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
