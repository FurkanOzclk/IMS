import React, { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
// @mui
import { Stack, Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
// components
import Iconify from "../components/Iconify"
import { FormProvider, RHFTextField } from "../components/hook-form"



const TAsetTeamMember = () => {

    // const location = useLocation();
    // const id = location.state.teamId
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    // const [checked, setChecked] = React.useState(false);

    const [data, setData] = useState({});

    const emailChange = event => {
        setEmail(event.target.value);
    };

    const fullnameChange = event => {
        setFullname(event.target.value);
    };

    const phoneChange = event => {
        setPhone(event.target.value);
    };

    // const handleChange = (event) => {
    //     setChecked(event.target.checked);
    // };


    const defaultValues = {
        fullname: '',
        email: '',
        phone: '',

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
                "fullname": fullname,
                "email": email,
                "phone": phone,
            }
            const { data } = await axiosInstance.post('/teamadmin/member/', formData)
            toast.success("Member Saved");
        } catch (error) {
            toast.error("Add Member Failed");
            console.log(error);
        }
        navigate(`/team/teamadmin/`);
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
                            Add Member
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="fullname" label="Full Name" onChange={fullnameChange} value={fullname} />
                    <RHFTextField name="email" label="Email address" onChange={emailChange} value={email} />
                    <RHFTextField name="phone" label="Phone" onChange={phoneChange} value={phone} />
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add Member
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default TAsetTeamMember;