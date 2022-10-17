import { useState ,useEffect} from 'react';

import { useNavigate, useLocation,useSearchParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack,Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../../axios/Axios";
// components
import Iconify from "../../components/Iconify"
import { FormProvider, RHFTextField } from "../../components/hook-form"



const WarehouseUserSetEquipment = () => {
    const [data,setData]=useState([]);
    const [warehousedata,setWarehouseData]=useState([]);
    
    const navigate = useNavigate();
    async function getDataEq() {
        try {
            const { data } = await axiosInstance.get('/warehouseuser/equipmenttype')
            

            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    


    useEffect(() => {
        getDataEq()
        
    }, [])


    const [equipmenttype, setEquipmentType] = useState('');
    const [serialnumber, setSerialnumber] = useState('');
    const [picture, setPicture] = useState('');
    const [status, setStatus] = useState('');
    

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


    const defaultValues = {
        equipmenttype: '',
        picture: '',
        status: '',
        serialnumber: '',
        
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
                equipmenttype,
                serialnumber,
                picture,
                status,
                
            }
            const { data } = await axiosInstance.post('/warehouseuser/equipment/', formData)
            
            toast.success("Equipment Saved");
        } catch (error) {
            toast.error("Add Equipment Failed");
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
                    <RHFTextField name="picture" label="Picture" onChange={pictureChange} value={picture} />
                    <RHFTextField name="status" label="Status" onChange={statusChange} value={status} />
                    
                    {/* <RHFTextField name="warehouse" label="Warehouse" onChange={warehouseChange} value={warehouse} /> */}



                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default WarehouseUserSetEquipment;