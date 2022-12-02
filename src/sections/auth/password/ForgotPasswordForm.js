import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Select, MenuItem, FormHelperText } from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { axiosInstance } from '../../../axios/Axios';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('');


    const changeEmail = event => {
        setEmail(event.target.value)
    }

    
    const defaultValues = {
        password: '',
    };

    const methods = useForm({
        // resolver:yupResolver(PasswordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async () => {
        try {
          const formData = {
            "email": email
          }
          const { data } = await axiosInstance.post('/password/forgot', formData)
          
        } catch (error) {
          toast.error("Send Mail Failed");
          console.log(error);
        }


    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
            <Stack spacing={3}>

                <RHFTextField
                    id="pass"
                    name="email"
                    label="Email"
                    onChange={changeEmail}
                    value={email}
                />

            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ bgcolor: "#983838" }}>
                    Submit
                </LoadingButton>
            </Stack>

        </FormProvider>
    );
}
