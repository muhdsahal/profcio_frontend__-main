// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   Card,
//   CardBody,
//   Typography,
//   Input,
//   Textarea,
// } from '@material-tailwind/react';

// const EmployeeProfile = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     profilePhoto: '',
//     phoneNumber: '',
//     work: '',
//     place: '',
//     description: '',
//     experience: '',
//     charge: '',
//   });
//   const [employeeList, setEmployeeList] = useState([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/auth/employeelisting/')
//       .then(response => response.json())
//       .then(data => setEmployeeList(data))
//       .catch(error => console.error('Error fetching employee list:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
//     // Handle form submission, e.g., send data to the API
//     fetch('http://127.0.0.1:8000/auth/employeelisting/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Success:', data);
//         setShowModal(false);
//         // You can update the employeeList state here if needed
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         // Handle errors, e.g., display an error message to the user
//       });
//   };

//   return (
//     <div>
//       <Button onClick={() => setShowModal(true)}>Open Profile</Button>

//       <Dialog size="sm" open={showModal} onClose={() => setShowModal(false)}>
//         <Card>
//           <CardBody>
//             <Typography variant="h6" color="blue-gray">
//               Employee Profile
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <Input
//                 type="text"
//                 label="First Name"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <br />
//               <Input
//                 type="text"
//                 label="Last Name"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <br />
//               <Input
//                 type="text"
//                 label="Profile Photo URL"
//                 name="profilePhoto"
//                 value={formData.profilePhoto}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <br />
//               <Input
//                 type="text"
//                 label="Phone Number"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <br />
//               <Input
//                 type="text"
//                 label="Work"
//                 name="work"
//                 value={formData.work}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <br />
//               <Input
//                 type="text"
//                 label="Place"
//                 name="place"
//                 value={formData.place}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <br />
//               <Textarea
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <br />
//               <Input
//                 type="text"
//                 label="Experience"
//                 name="experience"
//                 value={formData.experience}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <br />
//               <Input
//                 type="text"
//                 label="Charge"
//                 name="charge"
//                 value={formData.charge}
//                 onChange={handleInputChange}
//                 color="lightBlue"
//                 size="regular"
//                 outline={false}
//                 fullWidth
//               />
//               <Button type="submit" color="blue" ripple="light" fullWidth>
//                 Save
//               </Button>
//             </form>
//           </CardBody>
//         </Card>
//       </Dialog>

      
//       <div>
//         {employeeList.map(employee => (
//           <div key={employee.id}>
//             <img src={employee.profilePhoto} alt={`Profile of ${employee.firstName} ${employee.lastName}`} />
//             <p>{`${employee.firstName} ${employee.lastName}`}</p>
//             <p>{`Phone Number: ${employee.phoneNumber}`}</p>
//             {/* Add more details as needed */}
//           </div>
//         ))}
//       </div>
//     </div>
      
    

    
//   );
  
// };

// export default EmployeeProfile;
