import React, { useEffect, useState, } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
    Container, Box, ListItemText, Card, ListItemIcon, Modal,
    CardContent, ListItem, CardHeader, Stack, Typography, Button, TextField
} from '@mui/material';
import { Person2, Groups, Folder } from '@mui/icons-material/';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../axios/Axios";
import Page from '../components/Page';

import Iconify from '../components/Iconify';



const ViewEquipment = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const location = useLocation();
    const [type, setType] = useState(location.state.type);
    const [data, setData] = useState({
        equipmenttype: { name: "" },
        warehouse: { name: "" },
        equipment: { equipmenttype: { name: "" } },
        team: { name: "", project: { name: "" } }
    });

    const equipment = data.equipment;
    const team = data.team;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const [assignedDate, setAssignedDate] = useState("");

    const assignedDateChange = (event) => {
        setAssignedDate(event.target.value);
    }

    const [assignOpen, setAssignOpen] = React.useState(false);
    const assignModalOpen = () => {
        setAssignOpen(true);
    };
    const assignModalClose = () => {
        setAssignOpen(false);
    };


    const updateAssignDate = async () => {
        try {
            const formData = {
                equipment: equipment._id,
                team: team._id,
                assignedDate
            }
            const { data } = await axiosInstance.put(`/equipment/assign/${id}`, formData)

            assignModalClose();
            toast.success("Assign Date Saved");
        } catch (error) {
            toast.error("Edit Assign Date Failed");
            console.log(error);
        }
    }
    //  ---------------------------------------------------------------- //
    const [unassignedDate, setUnassignedDate] = useState("");

    const unassignedDateChange = (event) => {
        setUnassignedDate(event.target.value);
    }

    const [unassignOpen, setUnassignOpen] = React.useState(false);
    const unassignModalOpen = () => {
        setUnassignOpen(true);
    };
    const unassignModalClose = () => {
        setUnassignOpen(false);
    };



    async function getData() {
        let url = "eq";
        if (type === "eq") {
            url = `/equipment/${id}`
        } else if (type === "type") {
            url = `/equipment/type/${id}`
        } else if (type === "team") {
            url = `/equipment/team/${id}`
        }
        try {
            const { data } = await axiosInstance.get(url)

            setData(data);



        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }


    const updateUnassignDate = async () => {
        try {
            const formData = {

                unassignedDate
            }
            const { data } = await axiosInstance.put(`/equipment/unassign/${id}`, formData)
            unassignModalClose();

            toast.success("Unassign Date Saved");
        } catch (error) {
            toast.error("Edit Unassign Date Failed");
            console.log(error);
        }
    }



    useEffect(() => {
        getData()
    }, [])

    const CardContentReturner = () => {
        if (type === "eq") {
            if (data.equipmenttype === null) {
                data.equipmenttype = { name: "Deleted Item", brand: "Deleted Item", description: "Deleted Item" }
            }
            if (data.warehouse === null) {
                data.warehouse = { name: "Deleted Item" }
            }
            return (
                <Card sx={{ top: +10, width: 1, }}>
                    <CardHeader title="About Equipment" />
                    <CardContent>
                        <Cardinfo text={`Name: ${data.equipmenttype.name}`} icon={<Folder />} />
                        <Cardinfo text={`Brand: ${data.equipmenttype.brand}`} icon={<Folder />} />
                        <Cardinfo text={`Status: ${data.status}`} icon={<Folder />} />
                        <Cardinfo text={`Description: ${data.equipmenttype.description}`} icon={<Folder />} />
                        <Cardinfo text={`Serial Number: ${data.serialnumber}`} icon={<Folder />} />
                        <Cardinfo text={`Warehouse: ${data.warehouse.name}`} icon={<Folder />} />


                    </CardContent>
                </Card>
            );
        }
        if (type === "type") {
            return (
                <Card sx={{ top: +10, width: 1, }}>
                    <CardHeader title="About Equipment" />

                    <CardContent>
                        <Cardinfo text={`Name: ${data.name}`} icon={<Folder />} />
                        <Cardinfo text={`Brand: ${data.brand}`} icon={<Folder />} />
                        <Cardinfo text={`Description: ${data.description}`} icon={<Folder />} />


                    </CardContent>
                </Card>
            );
        }
        if (type === "team") {
            if (data.team === null) {
                data.team = { name: "Deleted Item" }
                data.team.project = { name: "Deleted Item" }
            }
            if (data.equipment.equipmenttype === null) {
                data.equipment.equipmenttype = { name: "Deleted Item", brand: "Deleted Item", description: "Deleted Item" }
            }
            return (
                <Card sx={{ top: +10, width: 1, }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                        <CardHeader title="About Equipment" />
                        <Stack direction="row" spacing={1}>
                            <Container>
                                <Stack direction="row" spacing={1}>

                                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={assignModalOpen} >
                                        Assign Date
                                    </Button>
                                    <Button variant="contained" color='warning' startIcon={<Iconify icon="eva:minus-fill" onClick={unassignModalOpen} />} >
                                        Unassign Date
                                    </Button>
                                </Stack>

                            </Container>
                        </Stack>

                    </Stack>


                    <CardContent>
                        <Cardinfo text={`Name: ${data.equipment.equipmenttype.name}`} icon={<Folder />} />
                        <Cardinfo text={`Brand: ${data.equipment.equipmenttype.brand}`} icon={<Folder />} />
                        <Cardinfo text={`Status: ${data.equipment.status}`} icon={<Folder />} />
                        <Cardinfo text={`Description: ${data.equipment.equipmenttype.description}`} icon={<Folder />} />
                        <Cardinfo text={`Serial Number: ${data.equipment.serialnumber}`} icon={<Folder />} />

                        <Cardinfo text={`Team Name: ${data.team.name}`} icon={<Folder />} />
                        <Cardinfo text={`Project Name: ${data.team.project.name}`} icon={<Folder />} />



                    </CardContent>
                </Card>



            );
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
                {/* <Box
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
                /> */}

                {/* <br/> */}
                <Container maxWidth="md" >
                    <CardContentReturner />

                </Container>
                <Modal
                    open={assignOpen}
                    onClose={assignModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                            New Assing Date ?
                        </Typography>
                        <TextField InputLabelProps={{ shrink: true }}
                            type="date" name="assignDate" label="Assign Date" onChange={assignedDateChange} value={assignedDate} />

                        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={2} >
                            <Button variant='text' color='inherit' onClick={assignModalClose}>Cancel</Button>
                            <Button variant='contained' color="error" onClick={updateAssignDate}>Edit Date</Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={unassignOpen}
                    onClose={unassignModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                            New Unssing Date ?
                        </Typography>
                        <TextField InputLabelProps={{ shrink: true }}
                            type="date" name="assignDate" label="Assign Date" onChange={unassignedDateChange} value={unassignedDate} />

                        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={2} >
                            <Button variant='text' color='inherit' onClick={unassignModalClose}>Cancel</Button>
                            <Button variant='contained' color="error" onClick={updateUnassignDate}>Edit Date</Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </Page>
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



export default ViewEquipment;