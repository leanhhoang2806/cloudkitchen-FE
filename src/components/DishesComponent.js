import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { postDish } from "apis/dish";
import { useAuth0 } from '@auth0/auth0-react';
import uploadFile from 'apis/mediaUpload';
import Spinner from "./SpinnerComponent";

const dropzoneStyles = {
    width: "100%",
    height: "100px",
    borderWidth: "2px",
    borderRadius: "4px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    margin: "16px 0",
};

export const DishesComponent = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [dishName, setDishName] = useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "dishName") {
            setDishName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "price") {
            setPrice(parseFloat(value));
        }
    };

    const onDrop = async (acceptedFiles) => {
        setImage(acceptedFiles[0]);
        setLoading(true); // Set loading to true when waiting for image upload
        try {
            await uploadFile(acceptedFiles[0], getAccessTokenSilently);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
        setLoading(false); // Set loading back to false after upload completes
    };

    const handleSubmit = async () => {
        setLoading(true); // Set loading to true when waiting for submission
        try {
            const formData = {
                name: dishName,
                description: description,
                price: price,
            };

            await postDish(formData, image, getAccessTokenSilently);
            setDishName("");
            setDescription("");
            setImage(null);
            setPrice(0)

        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false); // Set loading back to false after submission completes
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png",
        multiple: false,
    });

    return (
        <Box>
            <Spinner loading={loading} />
            <Grid container direction="column" alignItems="center">
                <Grid item>
                    <div {...getRootProps()} style={dropzoneStyles}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <Typography variant="subtitle1">Drop the image here</Typography> :
                                <Typography variant="subtitle1">Drag 'n' drop an image here, or click to select a file</Typography>
                        }
                    </div>
                </Grid>
                <Grid item>
                    <TextField
                        name="dishName"
                        label="Dish Name"
                        value={dishName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="description"
                        label="Description"
                        value={description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="price"
                        label="Price"
                        value={price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DishesComponent;
