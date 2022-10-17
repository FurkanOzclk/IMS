import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Stack,Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from '../axios/Axios';
import { FormProvider, RHFTextField} from "../components/hook-form"
import Iconify from "../components/Iconify"


const EditUser = () => { 

    const location = useLocation();
    const navigate = useNavigate();
    const [fullname, setFullname] = useState(location.state.fullname);
    const [id, setId] = useState(location.state.id);
    const [role, setRole] = useState(location.state.role);
    const [email, setEmail] = useState(location.state.email);
    const [phone, setPhone] = useState('');

    const fullnameChange=event=>{
        setFullname(event.target.value)
    }

    const emailChange=event=>{
        setEmail(event.target.value)
    }

    const roleChange=event=>{
        setRole(event.target.value)
    }

    const phoneChange=event=>{
        setPhone(event.target.value)
    }
    
    const defaultValues = {
        projectName: location.state.name,
        team: '',
        startDate: location.state.startDate,
        endDate: location.state.endDate,
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
                fullname,
                email,
                Phone: phone,
                role
            }
            const { data } = await axiosInstance.put(`/user/${id}`, formData)
            
            toast.success("User Saved");
        } catch (error) {
            toast.error("Edit User Failed");
            console.log(error);
        }
        navigate('/dashboard/userconfig/');
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
                            Edit User
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="fullname" label="Full Name" onChange={fullnameChange} value={fullname} />
                    <RHFTextField name="email" label="Email address" onChange={emailChange} value={email} />
                    <RHFTextField name="phone" label="Phone" onChange={phoneChange} value={phone} />

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={roleChange}
                        >
                            <MenuItem value={"superadmin"}>Super Admin</MenuItem>
                            <MenuItem value={"warehouseuser"}>Warehouse User</MenuItem>
                        </Select>
                    </FormControl>




                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Edit
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default EditUser;