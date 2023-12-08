import React, { useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";

export function ServiceModal() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const handleOpen = () => setOpen((cur) => !cur);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") setName(value);
        else if (name === "description") setDescription(value);
        else if (name === "category") setCategory(value);
        else if (name === "image"){

            setImage(e.target.files[0]);
            console.log(e.target.files[0],"imaaaaageweee");
        } 
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("Service_image", image); // Assuming "Service_image" is the field name for the image in your backend model

            // Loop through all entries in FormData
            // for (const entry of formData.entries()) {
            //     const [key, value] = entry;
            //     console.log(`Key: ${key}, Value: ${value}`);
            // }
                // Make an API call to create the servic
                // const csrfToken = getCSRFToken();  // Implement a function to get the CSRF token
                const response = await fetch("http://127.0.0.1:8000/auth/services/", {
                    method: "POST",
                    body: formData,
                    // headers: {
                    //     'Content-Type': 'multipart/form-data',
                    //     // 'X-CSRFToken': csrfToken,
                    //     // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' if needed
                    // },
                });
                console.log(response.formData, 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
                if (response.ok) {
                    // Handle successful service creation, e.g., show a success message
                    console.log("Service created successfully");
                } else {
                    // Handle error, e.g., show an error message
                    console.error("Failed to create service");
                }
            } catch (error) {
                console.error("Error creating service", error);
            } finally {
                // Close the modal after submission, whether successful or not
                handleOpen();
            }
        };

        return (
            <>
                <Button onClick={handleOpen}>Create Service</Button>
                <Dialog
                    size="xs"
                    open={open}
                    handler={handleOpen}
                    className="bg-transparent shadow-none"
                >
                    <Card className="mx-auto w-full max-w-[54rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Service
                            </Typography>
                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray"
                            >
                                Enter Service Details.
                            </Typography>
                            <Typography className="-mb-2" variant="h6">
                                Name
                            </Typography>
                            <Input
                                name="name"
                                label="Name"
                                size="lg"
                                value={name}
                                onChange={handleInputChange}
                            />

                            <Typography className="-mb-2" variant="h6">
                                Description
                            </Typography>
                            <Input
                                name="description"
                                label="Description"
                                size="lg"
                                value={description}
                                onChange={handleInputChange}
                            />

                            <Typography className="-mb-2" variant="h6">
                                Category
                            </Typography>
                            <Input
                                name="category"
                                label="Category"
                                size="lg"
                                value={category}
                                onChange={handleInputChange}
                            />

                            <Typography className="-mb-2" variant="h6">
                                Image
                            </Typography>
                            <Input
                                name="image"
                                type="file"
                                onChange={handleInputChange}
                            />
                            {/* <img src={image && URL.createObjectURL(image)} alt="profile-picture" /> */}
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button variant="gradient" onClick={handleSubmit} fullWidth>
                                Create Service
                            </Button>
                        </CardFooter>
                    </Card>
                </Dialog>
            </>
        );
    }
