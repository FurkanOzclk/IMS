import { useSearchParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Box, ListItemText, Card, ListItemIcon, CardContent, ListItem, CardHeader, Divider } from '@mui/material';
import { InsertDriveFile, Timer, TimerOff, Person, Person2, Groups, Mail, Phone, Bookmark } from '@mui/icons-material/';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
import Page from '../components/Page';


const TAviewMember = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    // const location=useLocation();

    // const [projectName, setProjectName] = useState(location.state.name);
    // const [startDate, setStart] = useState(location.state.startDate);
    // const [endDate, setEnd] = useState(location.state.endDate);

    const [data, setData] = useState({});
    const [user, setUser] = useState([]);

    async function getData() {
        try {
            const { data } = await axiosInstance.get(`/teamadmin/member/${id}`);
            setData(data);
            setUser(data.user)
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

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
                            title="About Member"
                        />
                        <CardContent>
                            <Cardinfo text={`Full Name : ${user.fullname}`} icon={<Person />} />
                            <Cardinfo text={`Email : ${user.email}`} icon={<Mail />} />
                            <Cardinfo text={`Phone : ${user.Phone}`} icon={<Phone />} />
                            <Cardinfo text={`Role :  ${user.role}`} icon={<Bookmark />} />
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

export default TAviewMember;