import { useState ,useEffect,} from 'react';
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



const SetEquipment = () => {
    const [data,setData]=useState([]);
    const [warehousedata,setWarehouseData]=useState([]);
    
    async function getDataEq() {
        try {
            const { data } = await axiosInstance.get('/equipment/type/all')
            

            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    async function getDataWarhouse() {
        try {
            const { data } = await axiosInstance.get('/warehouse/')
            

            setWarehouseData(data.warehouses);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }


    useEffect(() => {
        getDataEq()
        getDataWarhouse()
    }, [])


    const [equipmenttype, setEquipmentType] = useState('');
    const [serialnumber, setSerialnumber] = useState('');
    const [picture, setPicture] = useState('...');
    const [status, setStatus] = useState('');
    const [warehouse,setWarehouse]=useState("");

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

    const warehouseChange = event => {
        setWarehouse(event.target.value);
    };

    const defaultValues = {
        equipmenttype: '',
        picture: '',
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


    const names=data.map(eq=>eq.name)
    const navigate=useNavigate();

    const onSubmit = async () => {
        try {
            const formData = {
                equipmenttype,
                serialnumber,
                picture,
                status,
                warehouse
            }
            const { data } = await axiosInstance.post('/equipment/', formData)
            
            toast.success("Equipment Saved");
        } catch (error) {
            toast.error("Add Equipment Failed");
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
                            Add Equipment
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    {/* <RHFTextField name="equipmenttype" label="Equipment Type" onChange={equipmentTypeChange} value={equipmenttype} /> */}
                    


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
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={statusChange}
                        >
                                <MenuItem value={"Assigned"}>{"Assigned"}</MenuItem>
                                <MenuItem value={"Unassigned"}>{"Unssigned"}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
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
                    </FormControl>
                    {/* <RHFTextField name="warehouse" label="Warehouse" onChange={warehouseChange} value={warehouse} /> */}



                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default SetEquipment;