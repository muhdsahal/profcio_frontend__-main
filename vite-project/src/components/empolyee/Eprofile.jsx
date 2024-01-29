// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from 'react-toastify';
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardImage,
//   MDBInput,
//   MDBModal,
//   MDBModalDialog,
//   MDBModalContent,
//   MDBModalHeader,
//   MDBModalBody,
//   MDBModalFooter,
// } from "mdb-react-ui-kit";
// import { useParams } from "react-router-dom";
// export default function EProfilePage() {
//   const {userId} = useParams()
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [employee, setEmployee] = useState(null);
//   const [updatedEmployee, setUpdatedEmployee] = useState({});
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/auth/user_profile/${userId}/`
//         );
//         setEmployee(response.data);
//         setUpdatedEmployee(response.data);
//       } catch (error) {
//         console.error("An error occurred:", error);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const handleEditClick = () => {
//     setEditing(true);
//     setOpen(true);
//   };

//   const handleCancelEdit = () => {
//     setEditing(false);
//     setUpdatedEmployee(employee);
//     setImageFile(null);
//     setPassword("");
//     setOpen(false);
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       // Your update logic here...
//       const formData = new FormData();
    
//       // Append profile_photo if an imageFile is selected
//       if (imageFile) {
//         formData.append("profile_photo", imageFile, imageFile.name);
//       }
      
//       // Append other fields
//       formData.append("username", updatedEmployee.username);
//       formData.append("email", updatedEmployee.email);
//       formData.append("phone_number", updatedEmployee.phone_number);
//       formData.append("work", updatedEmployee.work);
//       formData.append("experience", updatedEmployee.experience);
//       formData.append("charge", updatedEmployee.charge);
//       formData.append("password", password);
  
//       const authToken = localStorage.getItem("token");
//       const tok = JSON.parse(authToken);
  
//       const response = await axios.put(
//         `http://127.0.0.1:8000/auth/user_profile/${userId}/`,  // Use PATCH instead of PUT
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${tok.access}`,
//           },
//         }
//       );
  
//       setEmployee(response.data);
//       setEditing(false);
//       setImageFile(null);
//       setPassword("");
  
//       setOpen(false);
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.error("An error occurred while updating profile:", error);
//       toast.error("An error occurred while updating profile");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedEmployee((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       {employee && (
//         <div className="container mx-auto px-4">
//           {/* ... Other JSX code ... */}

//           {/* Modal for Editing */}
//           <MDBModal open={open} handler={() => setOpen(!open)} tabIndex="-1">
//             <MDBModalDialog>
//               <MDBModalContent>
//                 <MDBModalHeader>Edit Profile</MDBModalHeader>
//                 <MDBModalBody>
//                 {editing && (
//                             <form>
//                             <div className='mb-3'>
//                                 <MDBInput
//                                     type="file"
//                                     name="image :"
//                                     labelClass='col-form-label'
//                                     onChange={(e)=> setImageFile(e.target.files[0])}
//                                     label='image'
//                                 />
                                
//                             </div>
//                             <div className='mb-3'>
                                
//                                 <MDBInput
//                                 value={updatedEmployee.username}
//                                 onChange={handleInputChange}
//                                 type="text"
//                                 name="username"
//                                     labelClass='col-form-label'
//                                     label='email:'
//                                 />
//                             </div>
//                             <div className='mb-3'>
                                
//                                 <MDBInput
//                                 type="text"
//                                 name="phone_number"
//                                 value={updatedEmployee.phone_number}
//                                 onChange={handleInputChange}
//                                     labelClass='col-form-label'
//                                     label='phone_number:'
//                                 />
//                             </div>
//                             <div className='mb-3'>
//                                 <MDBInput
//                                 type="text"
//                                 name="work"
//                                 value={updatedEmployee.work}
//                                 onChange={handleInputChange}
//                                     labelClass='col-form-label'
//                                     label='work:'
//                                 />
//                             </div>
//                             <div className='mb-3'>
                                
//                                 <MDBInput
//                                 value={updatedEmployee.experience}
//                                 onChange={handleInputChange}
//                                 type="text"
//                                 name="experience"
//                                     labelClass='col-form-label'
//                                     label='experience:'
//                                 />
//                             </div>
//                             <div className='mb-3'>
                                
//                                 <MDBInput
//                                 value={updatedEmployee.charge}
//                                 onChange={handleInputChange}
//                                 type="text"
//                                 name="charge"
//                                     labelClass='col-form-label'
//                                     label='charge:'
//                                 />
//                             </div>
//                             <div className='mb-3'>
                                
//                                 <MDBInput
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type="password"
//                                 name="password"
//                                     labelClass='col-form-label'
//                                     label='password:'
//                                 />
//                             </div>
//                             </form>
//                             )}
//                 </MDBModalBody>
//                 <MDBModalFooter>
//                   <MDBBtn color="secondary" onClick={handleCancelEdit}>
//                     Close
//                   </MDBBtn>
//                   <MDBBtn color="green" onClick={handleUpdateProfile}>
//                     Save changes
//                   </MDBBtn>
//                 </MDBModalFooter>
//               </MDBModalContent>
//             </MDBModalDialog>
//           </MDBModal>
//         </div>
//       )}
//     </div>
//   );
// }
