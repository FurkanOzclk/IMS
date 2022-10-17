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



const SetUser = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const emailChange = event => {
        setEmail(event.target.value);
    };

    const fullnameChange = event => {
        setFullname(event.target.value);
    };

    const phoneChange = event => {
        setPhone(event.target.value);
    };

    const roleChange = event => {
        setRole(event.target.value);
    };

    const defaultValues = {
        fullname: '',
        email: '',
        phone: '',
        role: '',
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
                "fullname": fullname,
                "email": email,
                "phone": phone,
                "role": role
            }
            const { data } = await axiosInstance.post('/user/', formData)
            
            toast.success("User Saved");
        } catch (error) {
            toast.error("Add User Failed");
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
                            Add User
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
                    Add
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default SetUser;