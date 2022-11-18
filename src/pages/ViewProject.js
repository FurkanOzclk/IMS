import { useSearchParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Box, ListItemText, Card, ListItemIcon, CardContent, ListItem, CardHeader, Divider, Link } from '@mui/material';
import { InsertDriveFile, Timer, TimerOff, Person, FileCopy } from '@mui/icons-material/';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
import Page from '../components/Page';


const ViewProject = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    // const location=useLocation();

    // const [projectName, setProjectName] = useState(location.state.name);
    // const [startDate, setStart] = useState(location.state.startDate);
    // const [endDate, setEnd] = useState(location.state.endDate);

    const [data, setData] = useState({});
    const [project, setProject] = useState({});
    const [team, setTeam] = useState([{ "name": "" }]);
    const [members, setMembers] = useState([{ "user": { "fullname": "" } }]);
    const [report, setReport] = useState([])


    async function getData() {
        try {
            const { data } = await axiosInstance.get(`/project/${id}`);
            setData(data);
            console.log(data);
            setProject(data.project);
            setTeam(data.teams);
            setMembers(data.members)
            setReport(data.project.reports)
            
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    let userData;
    useEffect(() => {
        getData()
    }, [])


    const TeamReturner = () => {

        if (team.length === 0) {
            return (
                <Card
                    sx={{ top: +30, width: 1, }}
                >
                    <CardHeader
                        sx={{ mb: 3 }}
                        title="Team Data Deleted"
                    />

                </Card>
            );
        }
        if (team.length !== 0) {
            const teamtitle = `${team[0].name}`;
            return (
                <Card
                    sx={{ top: +30, width: 1, }}
                >
                    <CardHeader
                        title={teamtitle}
                    />
                    <CardContent>

                        <ListItem>
                            <ListItemText primary="Team Members" />
                        </ListItem>
                        <Divider />
                        {members.map(member => {
                            const info = `${member.user.fullname} -${member.user.role}    `;
                            return (
                                <Cardinfo text={info} icon={<Person />} />
                            )
                        }

                        )}
                    </CardContent>
                </Card>
            )
        }
    }

    const ReportReturner = () => {
        if (report.length === 0) {
            return (
                <Card
                    sx={{ top: +60, width: 1, }}
                >
                    <CardHeader
                        sx={{ mb: 3 }}
                        title="Report Data Deleted"
                    />

                </Card>
            );
        }
        if (report.length !== 0) {
            return (
                <Card
                    sx={{ top: +60, width: 1, }}
                >
                    <CardHeader
                        title="Reports"
                    />
                    <CardContent>

                        {report.map(r => {
                            const info = `${r.name}`;
                            return (
                                <Cardinfo2   link={info} icon={<FileCopy />} href={r.location} />
                            )
                        }

                        )}
                    </CardContent>
                </Card>
            )
        }
    }

    return (
        <Page>
            <ToastContainer />
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
                            title="About Project"
                        />
                        <CardContent>
                            <Cardinfo text={`Project Name :  ${project.name} `} icon={<InsertDriveFile />} />
                            <Cardinfo text={`Start Date :  ${project.startDate}`} icon={<Timer />} />
                            <Cardinfo text={`End Date :  ${project.endDate}`} icon={<TimerOff />} />
                        </CardContent>
                    </Card>

                    <TeamReturner />
                    <ReportReturner />
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

const Cardinfo2 = ({ icon, text, link, href }) => {
    return (
        <ListItem>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <Link href={href} underline="hover">
                {link}
            </Link>
            <ListItemText primary={text} />
        </ListItem>
    )
}

export default ViewProject;