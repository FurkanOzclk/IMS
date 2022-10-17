import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
// components
import Iconify from "../components/Iconify"
import { FormProvider, RHFTextField } from "../components/hook-form"



const EditTeam = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [projectId, setProjectId] = useState(location.state.projectName);
    const [teamName, setTeamName] = useState(location.state.teamName);
    const [data, setData] = useState([]);

    console.log(location.state.teamId);
    async function getData() {
        try {
            const { data } = await axiosInstance.get('/project/')
            setData(data.projects);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }
    
    useEffect(() => {
        getData()
    }, [])


    const projectIdChange = event => {
        setProjectId(event.target.value);
    };

    const teamNameChange = event => {
        setTeamName(event.target.value);
    };


    const defaultValues = {
        projectId: location.state.projectName,
        teamName: location.state.teamName,
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
                "name": teamName,
                "projectid": projectId,
            }
            const { data } = await axiosInstance.put(`/team/${id}`, formData)
            toast.success("Team Saved");
        } catch (error) {
            toast.error("Edit Team Failed");
            console.log(error);
        }
        navigate('/dashboard/team')
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
                            Edit Team
                        </Typography>
                    </Grid> 
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="teamName" label="Team Name" onChange={teamNameChange} value={teamName} />
                    <Stack spacing={3} sx={{ my: 2 }}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Project</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projectId}
                            label="Project"
                            onChange={projectIdChange}
                        >
                            {data.map(({ _id, name }) =>
                                <MenuItem value={_id}>{name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Stack>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Edit Team
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}

export default EditTeam;