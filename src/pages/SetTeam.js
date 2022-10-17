import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import {Stack,Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
// components
import Iconify from "../components/Iconify"
import { FormProvider, RHFTextField} from "../components/hook-form"



const SetTeam = () => {

    const navigate = useNavigate();

    const [teamName, setTeamName] = useState('');
    const [projectid, setProjectid] = useState('');
    const [data, setData] = useState([]);

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

    const projectidChange = event => {
        setProjectid(event.target.value);
    };

    const teamNameChange = event => {
        setTeamName(event.target.value);
    };


    const defaultValues = {
        projectName: '',
        teamName: '',
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
                "projectid": projectid,
            }
            const { data } = await axiosInstance.post('/team/', formData)
            toast.success("Team Saved");
        } catch (error) {
            toast.error("Add Team Failed");
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
                            Add Team
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="teamName" label="Team Name" onChange={teamNameChange} value={teamName} />
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Project</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projectid}
                            label="Project"
                            onChange={projectidChange}
                        >
                            {data.map(({ _id, name }) =>
                                <MenuItem value={_id}>{name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add Team
                </LoadingButton>
            </Container>

        </FormProvider>
    )
}



export default SetTeam;