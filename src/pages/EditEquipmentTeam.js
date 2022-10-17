import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Stack, Container, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { axiosInstance } from '../axios/Axios';
import { FormProvider, RHFTextField } from "../components/hook-form"
import Iconify from "../components/Iconify"


const EditEquipmentTeam = () => {

    

    return (
        
            <Container>
                <h1>TEAM</h1>
                
            </Container>

        
    )
}

export default EditEquipmentTeam;