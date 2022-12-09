import * as Yup from 'yup';
import { useState, url } from 'react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mailext, setMailExt] = useState('@gidatarim.edu.tr')

  const changeEmail = event => {
    setEmail(event.target.value)
  }

  const changePassword = event => {
    setPassword(event.target.value)
  }

  const mailExtChange = event => {
    setMailExt(event.target.value);
  };

  const navigatePassword = () => {
    navigate('/forgotpassword');
  }

  
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    // resolver:yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      const formData = {
        "email": `${email + mailext}`,
        "password": password
      }
      const { data } = await axiosInstance.post('/user/login', formData)
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("fullname", data.fullname);
      localStorage.setItem("role", data.role);

      if (data.role === "superadmin") {
        navigate('/dashboard/app', { replace: true });
      } else if (data.role === "warehouseuser") {
        navigate('/warehouse/equipment', { replace: true });
      } else if (data.role === "TeamAdmin") {
        navigate('/team/teamadmin', { replace: true });
      } else if (data.role === "TeamMember") {
        navigate('/team/teammember', { replace: true });
      }

    } catch (error) {
      toast.error("Login Failed");
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-evenly">

          <RHFTextField name="email" label="User Email" onChange={changeEmail} value={email} placeholder="University Email" />
          {/* <Stack>

            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-helper"
              value={mailext}
              label="Age"
              onChange={mailExtChange}
            >
              <MenuItem value={""}>-</MenuItem>
              <MenuItem value={"@gidatarim.edu.tr"}>@gidatarim.edu.tr</MenuItem>
              <MenuItem value={"@ogr.gidatarim.edu.tr"}>@ogr.gidatarim.edu.tr</MenuItem>

            </Select>
          </Stack> */}
        </Stack>
        {/* <FormHelperText>* Students have to select "@ogr.gidatarim.edu.tr."</FormHelperText> */}

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={changePassword}
          value={password}
          placeholder="Password"
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" onClick={navigatePassword} sx={{ cursor: "pointer" }}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ bgcolor: "#983838" }}>
        Login
      </LoadingButton>

      
    </FormProvider>
  );
}
