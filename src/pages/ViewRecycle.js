import { useSearchParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Box, ListItemText, Card, ListItemIcon, CardContent, ListItem, CardHeader, Divider } from '@mui/material';
import { InsertDriveFile, Timer, TimerOff, Person } from '@mui/icons-material/';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
import Page from '../components/Page';


const ViewRecycle = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const location = useLocation();

    const [data, setData] = useState({});


    async function getData() {
        try {
            const { data } = await axiosInstance.get(`/recyclebin/find/${id}`);
            setData(data);
            
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, [])






    


    const TypeDetector = () => {

        if (data.type === "project") {
            return (
                <CardContent>
                    <Cardinfo text={`Project Name :  ${data.data.name} `} icon={<InsertDriveFile />} />
                    <Cardinfo text={`Start Date :  ${data.data.startDate}`} icon={<Timer />} />
                    <Cardinfo text={`End Date :  ${data.data.endDate}`} icon={<TimerOff />} />
                </CardContent>
            )
        }
        if (data.type === "team") {


            return (
                <div>
                    <CardContent>
                        <Cardinfo text={`Team Name :  ${data.data.team.name} `} icon={<InsertDriveFile />} />
                        
                    </CardContent>
                    <Divider/>
                    <Card >
                        <CardHeader
                            title="About Project"
                        />

                        <CardContent>
                            <Cardinfo text={`Project Name :  ${data.data.project.name} `} icon={<InsertDriveFile />} />
                            <Cardinfo text={`Start Date :  ${data.data.project.startDate}`} icon={<Timer />} />
                            <Cardinfo text={`End Date :  ${data.data.project.endDate}`} icon={<TimerOff />} />
                        </CardContent>
                    </Card>
                </div>
            )
        }
        if (data.type === "user") {
            return (
                <CardContent>
                    <Cardinfo text={`User Name :  ${data.data.fullname} `} icon={<InsertDriveFile />} />
                    <Cardinfo text={`Email :  ${data.data.email}`} icon={<Timer />} />
                    <Cardinfo text={`Phone :  ${data.data.Phone}`} icon={<Timer />} />
                    <Cardinfo text={`Role :  ${data.data.role}`} icon={<Timer />} />
                </CardContent>
            )
        }



    }



    const title = `About ${data.type}`
    return (
        <Page>
            <ToastContainer/>
            <Box

                sx={{
                    height: 300,
                    width: 1,
                }}>

                <Container maxWidth="md" >
                    <Card
                        sx={{ top: +10, width: 1, }}
                    >
                        <CardHeader
                            title={title}
                        />
                        <TypeDetector />
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



export default ViewRecycle;