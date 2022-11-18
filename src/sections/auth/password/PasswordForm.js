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

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [password, setPassword] = useState('');
  const [confimPassword, setConfirmPassword] = useState('');


  const changePassword = event => {
    setPassword(event.target.value)
  }

  const changeConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }

  // const PasswordSchema = Yup.object().shape({
  //   password: Yup.string() .min(8, "Password must contain at least 8 characters").required('Password is required'),
  //   confirmPassword: Yup.string().oneOf([Yup.ref("pass"), "Password does not match"]).required('Confirm your password')
  // });

const confirmPasswordF = () => {
  if (password === '') {
    toast.error("Please enter your password")
  } else if (password !== confimPassword || confimPassword === '') {
    toast.error("Please confirm your password")
  } else {
    toast.success("Password created successfully")
  }
} 

  const defaultValues = {
    password: '',
  };

  const methods = useForm({
    // resolver:yupResolver(PasswordSchema),
    confirmPasswordF,
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    confirmPasswordF()
    // try {
    //   const formData = {
    //     "password": password
    //   }
    //   const { data } = await axiosInstance.post('/user/login', formData)
    //   localStorage.setItem("access_token", data.token);
    //   localStorage.setItem("fullname", data.fullname);
    //   localStorage.setItem("role", data.role);

    //   if (data.role === "superadmin") {
    //     navigate('/dashboard/app', { replace: true });
    //   } else if (data.role === "warehouseuser") {
    //     navigate('/warehouse/equipment', { replace: true });
    //   } else if (data.role === "TeamAdmin") {
    //     navigate('/team/teamadmin', { replace: true });
    //   } else if (data.role === "TeamMember") {
    //     navigate('/team/teammember', { replace: true });
    //   }



    // } catch (error) {
    //   toast.error("Login Failed");
    //   console.log(error);
    // }


    // navigate('/dashboard', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Stack spacing={3}>

        <RHFTextField
          id="pass"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={changePassword}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword2 ? 'text' : 'password'}
          onChange={changeConfirmPassword}
          value={confimPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                  <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
