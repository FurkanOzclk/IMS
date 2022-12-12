import React, { useState, useEffect } from 'react';
import { Container, Box, ListItemText, Card, ListItemIcon, CardContent, ListItem, CardHeader, Avatar } from '@mui/material';
import { Email,  Person, Bookmark } from '@mui/icons-material/';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";

import Page from '../components/Page';




export default function Profile() {

    const [data, setData] = useState({});

    async function getData() {
        try {
            const { data } = await axiosInstance.get('/user/getme')
            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, [])

    return (
        <Page title="Profile">
            <ToastContainer/>
            <Box

                sx={{
                    height: 1,
                    width: 1,
                }}>
                <Box
                    component="img"
                    sx={{
                        height: 1,
                        width: 1,
                        maxWidth: { xs: 1, md: 1 },
                        maxHeight: { xs: 1, md: 1 },
                        borderRadius: 2,

                    }}
                    alt="Folder Photo"
                    src="https://gidatarim.edu.tr/uploads/2021/03/31/bf5f6308.jpg"
                />
                <Avatar
                    alt="Avatar"
                    src="https://yazilimlar.gidatarim.edu.tr/assets/img/logo_login.png"
                    sx={{ width: 150, height: 150, top: -82, border: 1, bgcolor: "#e6e6e6", ml: 4 }}
                    variant="circular"
                />
                {/* <br/> */}
                <Container maxWidth="md" >
                    <Card
                        sx={{ top: -70, width: 1, }}
                    >
                        <CardHeader
                            title="About Me"
                        />
                        <CardContent>
                            <Cardinfo text={data.fullname} icon={<Person />} />
                            <Cardinfo text={data.email} icon={<Email />} />
                            <Cardinfo text={data.role} icon={<Bookmark />} />
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Page >
    )
}

const Cardinfo = ({ icon, text }) => {
    return (
        <ListItem>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    )
}
