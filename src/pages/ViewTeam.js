import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Box, ListItemText, Card, ListItemIcon, CardContent, ListItem, CardHeader, Stack, Typography, Button } from '@mui/material';
import { Person2, Groups, Folder } from '@mui/icons-material/';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
import Iconify from '../components/Iconify';
import MemberMoreMenu from '../sections/@dashboard/member/MemberMoreMenu';
import Page from '../components/Page';



const ViewTeam = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [data, setData] = useState([]);
    const [member, setMember] = useState([]);
    const [team, setTeam] = useState([]);
       


    async function getData() {
        try {
            const { data } = await axiosInstance.get(`/team/${id}`)
            setMember(data.members);
            if (data.team.project===null) {
                setData({name:"Deleted Item"});
            }else{
                setData(data.team.project);
            }   
            setTeam(data.team);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

   
    
    useEffect(() => {
        getData()
        
    }, [])

    const navigate = useNavigate();
    const setMemberPage = async () => { 
        navigate('/dashboard/team/member/setmember', { state: { id } });

    };

    

    const Cardinfo = ({ icon, text, memberId, fullname, email, phone }) => {
        return (
            <ListItem>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text}/>
                <MemberMoreMenu  id={memberId} fullname={fullname} email={email} phone={phone} teamId={id} />
            </ListItem>
        )
            
    }
    

    return (
        <Page>
            <ToastContainer/>
            <Box
                sx={{
                    height: 300,
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

                {/* <br/> */}
                <Container maxWidth="md" >
                    <Card sx={{ top: +10, width: 1, }}>
                        <CardHeader title="About Team" />
                        <CardContent>
                            <Cardinfo2 text={`Team Name: ${team.name}`} icon={<Groups />} />
                            <Cardinfo2 text={`Project Name: ${data.name}`} icon={<Folder />} />
                        </CardContent>
                    </Card>
                </Container>
                <Container maxWidth="md" >
                    <Card sx={{ top: +10, width: 1, mt: 5 }}>
                        <CardContent>
                            <Stack direction="row" alignItems="baseline" justifyContent="space-between" mb={3}>
                                <CardHeader title="Team Members" />
                                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={setMemberPage}>
                                    New Member
                                </Button>
                            </Stack>
                            {member.map(({ user, _id }) =>
                                <Cardinfo text={`${user.fullname} - ${user.role}`} icon={<Person2 />} memberId={_id} fullname={user.fullname} email={user.email} phone={user.Phone} />
                            )}                            
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Page>
    )


}
const Cardinfo2 = ({ icon, text }) => {
    return (
        <ListItem>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
            
        </ListItem>
    )
}




export default ViewTeam;