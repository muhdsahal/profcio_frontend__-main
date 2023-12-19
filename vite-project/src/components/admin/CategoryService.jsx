

import React from "react";
import { useState,useEffect} from "react";
import { Button, Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, } from "@material-tailwind/react";
import axios  from "axios";
import Modal from 'react-modal';
import { ServiceCatergoryURL } from "../../constants/constants";
Modal.setAppElement('#root')
function CategoryService(){
    const [open,setOpen] = useState(false)
    const [editOpen,setEditOpen] = useState(false)
    const handleOpenModal = () => setOpen((cur) => !cur);
    // const editOpenModal = () => setEditOpen((cur) => !cur);
    const [categoryName,setCategoryName] = useState('')
    const [category,setCategory] =useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [editCategoryId,setEditCategoryId] = useState('')
    const [errorOccurred, setErrorOccurred] = useState(false);


    useEffect(() => {
        

        axios
            .get(ServiceCatergoryURL)
            .then((response) => {
                const responseData = response.data;
                setCategory(responseData)

                
            })
            .catch((error) => {
                console.error("Error Fetching Data:", error);
                // setLaoding(false)
            })

    }, [])


    const CreateCategory = () => {
        const formData = new FormData();
        formData.append('name',categoryName)

        axios.post(ServiceCatergoryURL,formData)
        .then(resposnse => setCategory([...category,resposnse.data])),
        setCategoryName('')
        
        .catch(error => {
            console.log("error creating service",error);
        })
        handleOpenModal()
    }
    
    const editHandleCategory = (e) => {

      
        setEditCategoryId(e)
        console.log(editCategoryId,'idddddddddddddddddddddd');
        axios.get(`${ServiceCatergoryURL}${e}/`)
        .then(response => {
            setCategoryName(response.data.name)
            return response.data;
        })
        .catch(error => {
            console.error("error creating category",error);
        })
        editOpenModal()
    }


  const editOpenModal = () => {
    setEditOpen(!editOpen);
  };

  const fetchAndUpdateCategoryList = () => {
    axios.get(`${ServiceCatergoryURL}`)
      .then(response => {
        setCategoryList(response.data);
      })
      .catch(error => {
        console.error("Error fetching category list", error);
      });
  };

  const CategoryEdit = () => {
    const formData = new FormData();
    formData.append('name', categoryName);

    axios.patch(`${ServiceCatergoryURL}${editCategoryId}/`, formData)
      .then(response => {
        fetchAndUpdateCategoryList();
        setCategoryName('');
        console.log("Edit successful");
        editOpenModal();
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.error("Resource not found. Check the ID and URL.", error);
          setErrorOccurred(true);  // Set error state to true
        } else {
          console.error("Error editing category", error);
          setErrorOccurred(true);  // Set error state to true for other errors
        }
      });
  };
         
    // const classes = "p-4 b order-b border-blue-gray-50";

    // const CategoryEdit = () => {
    //     // Assuming ServiceCatergoryURL is the base URL for your category service
    //     // You may need to adjust the URL based on your API structure
    //     axios.put(`${ServiceCatergoryURL}${editCategoryId}/`, {
    //       name: categoryName,
    //       // Add other properties you want to update
    //     })
    //       .then(response => {
    //         // Handle successful category update
    //         console.log("Category updated successfully", response.data);
    //         // Close the edit modal or perform any other actions
    //       })
    //       .catch(error => {
    //         console.error("Error updating category", error);
    //         // Handle error, display an error message, or perform other actions
    //       });
    //   };
    
      const classes = "p-4 border-b border-blue-gray-50";


    return(
        <div className="flex flex-col min-h-screen items-center justify-center">
        <Card className="w-full max-w-screen-xl overflow-hidden">
          <div className="my-4 mx-4 overflow-x-auto">
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleOpenModal}
            >
              Create Category
            </Button>
          </div>
      
          <div className="my-4 mx-4 overflow-x-auto">
            
          </div>
        </Card>
        <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            
              <th
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Id
                </Typography>
              </th>
              <th
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Edit
                </Typography>
              </th>
        
          </tr>
        </thead>
        <tbody>
                  {category.map((category) => (
                    <tr key={category.id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category.id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category.name}
                        </Typography>
                      </td>
                      
                      
                      <td className={classes}>
                        <Button
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                          onClick={(e) => editHandleCategory(category.id)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
      
                  ))}
                </tbody>
      </table>
    </Card>
      
        <Dialog
          size="xs"
          open={open}
          handler={handleOpenModal}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-md">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Create Service
              </Typography>
              <label>
                Name:
                <Input
                  type="text"
                  name="name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full"
                />
              </label>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={CreateCategory} fullWidth>
                Create Service
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      
        <Dialog
          size="xs"
          open={editOpen}
          handler={editOpenModal}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-md">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Edit Service
              </Typography>
              <label>
                Name:
                <Input
                  type="text"
                  name="name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full"
                />
              </label>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={CategoryEdit} fullWidth>
                Edit Service
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </div>
      

    )
}
export default  CategoryService 




