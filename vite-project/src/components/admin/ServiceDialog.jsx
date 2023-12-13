// // ServiceDialog.js

// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
// } from "@material-tailwind/react";
// import axios from 'axios';
// import { ServiceCatergoryURL } from '../../constants/constants';
// export function ServiceDialog({ isOpen, onClose, onSave, title, initialFormData }) {
//   const [formData, setFormData] = useState(initialFormData);
//   const [categoryOptions, setCategoryOptions] = useState([]);

//   useEffect(() => {
//     // Fetch category options when the component mounts
//     axios.get(ServiceCatergoryURL)
//       .then(response => {
//         setCategoryOptions(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching category options:', error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       service_image: e.target.files[0],
//     });
//   };

//   const handleSave = () => {
//     // console.log(formData,'===============================<<<<<<<');
//     onSave(formData);
//     setFormData(initialFormData); 
//   };

//   return (
//     <Dialog
//       size="xs"
//       open={isOpen}
//       handler={onClose}
//       className="bg-transparent shadow-none"
//     >
//       <Card className="mx-auto w-full max-w-[24rem]">
//         <CardBody className="flex flex-col gap-4">
//           <Typography variant="h4" color="blue-gray">
//             {title}
//           </Typography>
//           <label>
//             Name:
//             <Input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Description:
//             <Input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Category:
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//             >
//               {categoryOptions.map((category) => (
//                 <option key={category[0]} value={category[0]}>
//                   {category[1]}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label>
//             Image:
//             <Input
//               type="file"
//               name="service_image"
//               onChange={handleImageChange}
//             />
//           </label>
//         </CardBody>
//         <CardFooter className="pt-0">
//           <Button variant="gradient" onClick={handleSave} fullWidth>
//             {title}
//           </Button>
//         </CardFooter>
//       </Card>
//     </Dialog>
//   );
// }
