import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack,Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
// components
import Iconify from "../components/Iconify"
import { FormProvider, RHFTextField } from "../components/hook-form"



const SetEquipmentType = () => {
    const navigate=useNavigate();
    
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const NameChange = event => {
        setName(event.target.value);
    };

    const brandChange = event => {
        setBrand(event.target.value);
    };

    const descriptionChange = event => {
        setDescription(event.target.value);
    };

    const defaultValues = {
        name: '',
        brand: '',
        description: '',
    };

    const methods = useForm({
        defaultValues
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async () => {
        try {
            const formData = {
                name,
                brand,
                description
            }
            const { data } = await axiosInstance.post('/equipment/type', formData)
            
            toast.success("Equipment Type Saved");
        } catch (error) {
            toast.error("Add Equipment Type Failed");
            console.log(error);
        }
        navigate('/dashboard/equipments/');
    };




    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer/>
            <Container>
                <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Grid item >
                        <Iconify icon="fa:user-plus" color="#983838" width={30} height={30} />
                    </Grid>
                    <Grid item >
                        <Typography variant='h3' color="#983838">
                            Add Equipment Type
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="name" label="Name" onChange={NameChange} value={name} />
                    <RHFTextField name="brand" label="Brand" onChange={brandChange} value={brand} />
                    <RHFTextField name="description" label="Description" onChange={descriptionChange} value={description} />

                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default SetEquipmentType;