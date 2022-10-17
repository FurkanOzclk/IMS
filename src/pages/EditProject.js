import { useState } from 'react';
import { useNavigate,useLocation,useSearchParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import {Stack,Container, Grid, Typography,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from '../axios/Axios';
// components
import Iconify from "../components/Iconify"
import { FormProvider, RHFTextField,} from "../components/hook-form"



const EditProject = () => {
 
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const navigate = useNavigate();
    const location=useLocation();

    const [projectName, setProjectName] = useState(location.state.name);
    const [team, setTeam] = useState('');
    const [startDate, setStart] = useState(location.state.startDate);
    const [endDate, setEnd] = useState(location.state.endDate);

    const projectNameChange = event => {
        setProjectName(event.target.value);
    };

    const teamChange = event => {
        setTeam(event.target.value);
    };

    const startDateChange = event => {
        setStart(event.target.value);
    };

    const endDateChange = event => {
        setEnd(event.target.value);
    };

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
                "name": projectName,
                "startDate": startDate,
                "endDate": endDate
            }
            const { data } = await axiosInstance.put(`/project/${id}`, formData)
            
            toast.success("Member Saved");
        } catch (error) {
            toast.error("Edit Project Failed");
            console.log(error);
        }
        navigate('/dashboard/projects/');
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
                            Edit Project
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <TextField name="projectName" label="Project Name" onChange={projectNameChange} value={projectName} />
                    <RHFTextField InputLabelProps={{ shrink: true }}  type="date" name="startDate" label="Start Date" onChange={startDateChange} value={startDate} />
                    <RHFTextField InputLabelProps={{ shrink: true }} type="date" name="endDate" label="End Date" onChange={endDateChange} value={endDate} />

                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Edit Project
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default EditProject;