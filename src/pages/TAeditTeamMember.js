import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Container, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
// components
import Iconify from "../components/Iconify"
import { FormProvider, RHFTextField } from "../components/hook-form"



const TAeditTeamMember = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const location = useLocation();
    const navigate = useNavigate();
    const teamId = location.state.teamId


    const [fullname, setFullname] = useState(location.state.fullname);
    const [email, setEmail] = useState(location.state.email);
    const [phone, setPhone] = useState(location.state.phone);


    const fullnameChange = event => {
        setFullname(event.target.value);
    };

    const emailChange = event => {
        setEmail(event.target.value);
    };

    const phoneChange = event => {
        setPhone(event.target.value)
    }



    const defaultValues = {
        fullname: location.state.fullname,
        email: location.state.email,
        phone: location.state.phone,
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
            }
            const { data } = await axiosInstance.put(`/teamadmin/member/${id}`, formData)
            
            toast.success("Member Saved");
        } catch (error) {
            toast.error("Edit Member Failed");
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
                        <Iconify icon="ant-design:file-add-filled" color="#983838" width={30} height={30} />
                    </Grid>
                    <Grid item >
                        <Typography variant='h3' color="#983838">
                            Edit Member
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="fullname" label="Full Name" onChange={fullnameChange} value={fullname} />
                    <RHFTextField name="email" label="Email" onChange={emailChange} value={email} />
                    <RHFTextField name="phone" label="Phone" onChange={phoneChange} value={phone} />
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Edit Member
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default TAeditTeamMember;