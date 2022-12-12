import React, { useState ,useEffect} from 'react';
import { useNavigate, useLocation,useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Stack, Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from '../../axios/Axios';
import { FormProvider, RHFTextField } from "../../components/hook-form"
import Iconify from "../../components/Iconify"


const WarehouseUserEditEquipmentType = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [data,setData]=useState({});
    const [name,setName]=useState("");
    const [brand,setBrand]=useState("");
    const [description,setDescription]=useState("");

    const nameChange=event=>{
        setName(event.target.value);
    }

    const brandChange=event=>{
        setBrand(event.target.value);
    }

    const descriptionChange=event=>{
        setDescription(event.target.value);
    }

    async function getData() {
        try {
            const { data } = await axiosInstance.get(`warehouseuser/equipmenttype/${id}`)
            
            setData(data);
            setName(data.name);
            setBrand(data.brand);
            setDescription(data.description);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }
   
    

    useEffect(() => {
        getData()
    }, [])


    const defaultValues = {
        name:data.name,
        brand:data.brand,
        description:data.description,
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
            const formData ={
                name,
                brand,
                description
            };
            
            const { data } = await axiosInstance.put(`warehouseuser/equipmenttype/${id}`, formData)
            
            toast.success("Equipment Type Saved");
        } catch (error) {
            toast.error("Edit Equipment Type Failed");
            console.log(error);
        }
        navigate('/warehouse/equipment');
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
                            Edit Equipment Type
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>

                    <RHFTextField name="name" label="Equipment Name" onChange={nameChange} value={name} />
                    <RHFTextField name="brand" label="Brand"  onChange={brandChange} value={brand}/>
                    <RHFTextField name="description" label="Description"  onChange={descriptionChange} value={description}/>
                    






                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default WarehouseUserEditEquipmentType;