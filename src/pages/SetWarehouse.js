import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
// components
import Iconify from "../components/Iconify"
import { FormProvider, RHFTextField } from "../components/hook-form"




const SetWarehouse = () => {


    const [warehouseUser, setWarehouseUser] = useState('');
    const [warehouseName, setWarehouseName] = useState('');
    const [data, setData] = useState([]);

    async function getData() {
        try {
            const { data } = await axiosInstance.get('/warehouseuser/users/')
            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

    const warehouseUserChange = event => {
        setWarehouseUser(event.target.value);
    };

    const warehouseNameChange = event => {
        setWarehouseName(event.target.value);
    };


    const defaultValues = {
        warehouseUser: '',
        warehouseName: '',
    };

    const methods = useForm({
        defaultValues
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const navigate = useNavigate();
    
    const onSubmit = async () => {
        try {
            const formData = {
                "name": warehouseName,
                "user": warehouseUser,
            }
            const { data } = await axiosInstance.post('/warehouse/', formData)
            toast.success("Warehouse Saved");
        } catch (error) {
            toast.error("Add Warehouse Failed");
            console.log(error);
        }
        navigate('/dashboard/warehouse/');
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer/>
            <Container>
                <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Grid item >
                        <Iconify icon="ant-design:file-add-filled" color="#983838" width={30} height={30} />
                    </Grid>
                    <Grid item >
                        <Typography variant='h3' color="#983838">
                            Add Warehouse
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="warehouseName" label="Warehouse Name" onChange={warehouseNameChange} value={warehouseName} />
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Warehouse User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={warehouseUser}
                            label="Project"
                            onChange={warehouseUserChange}
                        >
                            {data.map(({ _id, fullname }) =>
                                <MenuItem value={_id}>{fullname}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add Warehouse
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}



export default SetWarehouse;