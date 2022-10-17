import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
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



const EditWarehouse = () => {

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [user, setUser] = useState(location.state.user.fullname);
    const [warehouseName, setWarehouseName] = useState(location.state.warehouseName);

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

    const userChange = event => {
        setUser(event.target.value);
    };

    const warehouseNameChange = event => {
        setWarehouseName(event.target.value);
    };


    const defaultValues = {
        user: location.state.user.fullname,
        warehouseName: location.state.warehouseName,
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
                "user": user,
            }
            const { data } = await axiosInstance.put(`/warehouse/${id}`, formData)
            toast.success("Warehouse Saved");
        } catch (error) {
            toast.error("Edit Warehouse Failed");
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
                            Edit Warehouse
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
                            value={user.fullname}
                            label="WarehouseUser"
                            onChange={userChange}
                        >
                            {data.map(({ _id, fullname }) =>
                                <MenuItem value={_id}>{fullname}</MenuItem>

                            )}
                        </Select>
                    </FormControl>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Edit Warehouse
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}


export default EditWarehouse;