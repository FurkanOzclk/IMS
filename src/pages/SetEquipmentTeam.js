import { useState, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
// components
import Iconify from "../components/Iconify"
import { FormProvider, RHFTextField } from "../components/hook-form"



const SetEquipmentTeam = () => {
    const navigate=useNavigate();
    const [eqData, setEqData] = useState([]);
    const [teamData, setTeamData] = useState([]);

    async function getDataEq() {
        try {
            const { data } = await axiosInstance.get('/equipment')
            
            setEqData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    async function getDataTeam() {
        try {
            const { data } = await axiosInstance.get('/team')
            

            setTeamData(data.teams);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    useEffect(() => {
        getDataEq()
        getDataTeam()
    }, [])





    const [equipment, setEquipment] = useState('');
    const [team, setTeam] = useState('');
    const [assignedDate, setAssignedDate] = useState('');

    const equipmentChange = event => {
        setEquipment(event.target.value);
    };

    const teamChange = event => {
        setTeam(event.target.value);
    };

    const assignedDateChange = event => {
        setAssignedDate(event.target.value);
    };

    const defaultValues = {
        equipment: '',
        team: '',
        assignedDate: '',
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
                equipment,
                team,
                assignedDate
            }
            const { data } = await axiosInstance.post('/equipment/assign', formData)
            
            toast.success("Equipment Saved");
        } catch (error) {
            toast.error("Add Equipment Failed");
            console.log(error);
        }
        navigate('/dashboard/equipments/');
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
                            Assign Equipment
                        </Typography>
                    </Grid>
                </Grid>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Equipment</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={equipment}
                            label="Equipment Type"
                            onChange={equipmentChange}
                        >
                            {eqData.map(eq =>
                                <MenuItem value={eq._id}>{`S.No: ${eq.serialnumber} - ${eq.equipmenttype.name}`}</MenuItem>
                            )}

                        </Select>
                    </FormControl>

                    <RHFTextField InputLabelProps={{ shrink: true }}
                        type="date" name="assignDate" label="Assign Date" onChange={assignedDateChange} value={assignedDate} />
                    
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Team</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={team}
                            label="Team"
                            onChange={teamChange}
                        >
                             {teamData.map(team=>
                                <MenuItem value={team._id}>{`${team.name}`}</MenuItem>
                                )} 
                            
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

export default SetEquipmentTeam;