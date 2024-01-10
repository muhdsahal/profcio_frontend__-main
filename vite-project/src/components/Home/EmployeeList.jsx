import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { EmployeeListingURL, ServiceListURL } from "../../constants/constants";
import CitiesData from "../../components/empolyee/locations.json"

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  const cityOptions = CitiesData.cities.map((city) => ({
    value: city.City,
    label: city.City,
  }));
  

  useEffect(() => {
    axios
      .get(EmployeeListingURL)
      .then((response) => {
        setEmployees(response.data || []); // Ensure employees array is not undefined
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });

    axios
      .get(ServiceListURL)
      .then((response) => {
        setServices(response.data || []); // Ensure services array is not undefined
      })
      .catch((error) => {
        console.error("Error fetching service data:", error);
      });
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [selectedCity, selectedService, searchQuery, employees]);

  const objectToFormData = (data) => {
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    return formData;
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const filterEmployees = () => {
    const filtered = employees.filter((employee) => {
      const cityMatches =
        selectedCity === "" || (employee.place && employee.place === selectedCity);
      const serviceMatches =
        selectedService === "" || (employee.work && employee.work === selectedService);
      const searchMatches =
        searchQuery === "" ||
        (employee.username &&
          employee.work &&
          employee.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (employee.work &&
          employee.work.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (employee.charge && String(employee.charge).includes(searchQuery));

      return cityMatches && serviceMatches && searchMatches;
    });
    setFilteredEmployees(filtered);
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-4">
        {filteredEmployees.length > 0 ? "Employees" : "No Employees Found"}
      </h2>
      <div className="mt-12 flex flex-col items-center justify-center w-full md:w-auto ">
      <div className="mt-4 mb-6 w-full md:w-80 h-10 ">
        <Input label="Search" value={searchQuery} onChange={handleSearch}   />
      </div>
      <div className="flex gap-4 md:w-86 h-10">
        <select className="border-[1px] border-[#747676]"
          label="City"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Select Your Location</option>
          {cityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className="border-[1px] border-[#747676]"
          label="Service"
          value={selectedService}
          onChange={handleServiceChange}
        >
          <option value="" disabled>Select a service</option>
          {Object.values(services).map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
    </div>
    <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="max-w-xs bg-white border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={employee.profile_photo}
              alt={`Profile photo of ${employee.username}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-2">{employee.username}</h4>
              <h4 className="text-xl font-semibold mb-2">{employee.work}</h4>
              <p className="text-gray-700 mb-2">₹{employee.charge}</p>
              <p className="text-gray-600">{employee.place}</p>
              <div className="mt-4">
                <Button
                  color="blue"
                  ripple="light"
                  className="px-4 py-2 rounded"
                  onClick={() => navigate(`/employeedetails/${employee.id}/`)}
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
