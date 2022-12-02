import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from '@mui/material/CircularProgress';

import { Button, Typography, Container, Box } from '@mui/material';
import { axiosInstance } from "../axios/Axios";

// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Verify() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [data, setData] = useState('');

    async function postData() {
        try {
            const formData = {
                id
            }
            const { data } = await axiosInstance.post(`/verifyme`, formData)
            setData(data);
            if (data.id === undefined) {
                toast.error("User Undefined");
            } else {
                navigate('/password', { state: { id:data.id } })
            }
        } catch (error) {
            toast.error("Verify Error");
            console.log(error);
        }
    }
    useEffect(() => {
        postData()
    }, [])

    return (
        <Page title="Verify Page">
            <>
                <ToastContainer />
                <Container>
                    <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                        <Typography variant="h3" paragraph>
                            We're checking your information
                        </Typography>

                        <Typography sx={{ color: 'text.secondary' }}>
                            After checking your information you will directly send to the create password page.
                        </Typography>

                        <Box>
                            <CircularProgress sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }} />
                        </Box>
                    </ContentStyle>
                </Container>
            </>
        </Page>
    );
}
