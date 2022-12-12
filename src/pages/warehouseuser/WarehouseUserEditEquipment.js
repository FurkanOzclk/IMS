import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation,useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Stack, Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from '../../axios/Axios';
import { FormProvider, RHFTextField } from "../../components/hook-form"
import Iconify from "../../components/Iconify"


const WarehouseUserEditEquipment = () => {

    const location=useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [data,setData]=useState([]);
    const [warehousedata,setWarehouseData]=useState([]);
    
    async function getDataEq() {
        try {
            const { data } = await axiosInstance.get('warehouseuser/equipmenttype')
            

            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    

    useEffect(() => {
        getDataEq()
        // getDataWarhouse()
    }, [])

    const [equipmenttype, setEquipmentType] = useState(location.state.eq._id);
    const [serialnumber, setSerialnumber] = useState(location.state.data.serialnumber);
    const [picture, setPicture] = useState(location.state.data.picture);
    const [status, setStatus] = useState(location.state.data.status);
    // const [warehouse,setWarehouse]=useState(location.state.warehouse._id);

    const equipmentTypeChange = event => {
        setEquipmentType(event.target.value);
    };

    const serialnumberChange = event => {
        setSerialnumber(event.target.value);
    };

    const pictureChange = event => {
        setPicture(event.target.value);
    };

    const statusChange = event => {
        setStatus(event.target.value);
    };

    // const warehouseChange = event => {
    //     setWarehouse(event.target.value);
    // };

   
    
    
    const defaultValues = {
        equipmenttype: '',
        picture: 'none.png',
        status: '',
        serialnumber: '',
        warehouse:""
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
                equipmenttype,
                status,
                picture,
                // warehouse,
                serialnumber
            };
            
            const { data } = await axiosInstance.put(`warehouseuser/equipment/${id}`, formData)
            toast.success("Equipment Saved");
        } catch (error) {
            toast.error("Edit Equipment Failed");
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
                            Edit Equipment
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>

                <FormControl>
                        <InputLabel id="demo-simple-select-label">Equipment Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={equipmenttype}
                            label="Equipment Type"
                            onChange={equipmentTypeChange}
                        >
                            {data.map(eq=>
                                <MenuItem value={eq._id}>{`${eq.brand} - ${eq.name}`}</MenuItem>
                                )}
                            
                        </Select>
                    </FormControl>
                    <RHFTextField name="serialnumber" label="Serial number" onChange={serialnumberChange} value={serialnumber} />
                    {/* <RHFTextField name="picture" label="Picture" onChange={pictureChange} value={picture} /> */}
                    {/* <RHFTextField name="status" label="Status" onChange={statusChange} value={status} /> */}
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-helper"
                            value={status}
                            label="Status"
                            onChange={statusChange}
                        >
                            <MenuItem value={"Assigned"}>Assigned</MenuItem>
                            <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <FormControl>
                        <InputLabel id="demo-simple-select-label">Warehouse</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={warehouse}
                            label="Equipment Type"
                            onChange={warehouseChange}
                        >
                             {warehousedata.map(wa=>
                                <MenuItem value={wa._id}>{`${wa.name}`}</MenuItem>
                                )} 
                            
                        </Select>
                    </FormControl> */}






                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default WarehouseUserEditEquipment;